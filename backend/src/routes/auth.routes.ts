import { Router } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.middleware.js';
import {
  hashPassword,
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
} from '../services/auth.service.js';
import { AppError } from '../middleware/error.middleware.js';
import rateLimit from 'express-rate-limit';

const router = Router();

// Strict login rate limiter - 5 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation schemas
const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string()
      .min(10, 'Password must be at least 10 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const onboardingSchema = z.object({
  body: z.object({
    educationLevel: z.string().optional(),
    university: z.string().optional(),
    graduationYear: z.number().optional(),
    major: z.string().optional(),
    country: z.string().optional(),
    goals: z.array(z.string()).optional(),
  }),
});

// Register
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(409, 'User already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user with student profile
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'STUDENT',
        studentProfile: {
          create: {
            fullName,
          },
        },
      },
      include: {
        studentProfile: true,
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await generateRefreshToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.studentProfile,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

// Login - with brute force protection
router.post('/login', loginLimiter, validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        employerProfile: true,
      },
    });

    if (!user || !user.passwordHash) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError(403, 'Your account has been deactivated. Please contact support.');
    }

    // Check email verification (optional enforcement - uncomment to enforce)
    // if (!user.emailVerified) {
    //   throw new AppError(401, 'Please verify your email before logging in.');
    // }

    // Verify password
    const isValid = await comparePasswords(password, user.passwordHash);
    if (!isValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await generateRefreshToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.studentProfile || user.employerProfile,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

// Refresh token
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError(400, 'Refresh token required');
    }

    const userId = await verifyRefreshToken(refreshToken);
    if (!userId) {
      throw new AppError(401, 'Invalid or expired refresh token');
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(401, 'User not found');
    }

    // Revoke old token
    await revokeRefreshToken(refreshToken);

    // Generate new tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const newRefreshToken = await generateRefreshToken(user.id);

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
});

// Logout
router.post('/logout', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
});

// Logout all devices
router.post('/logout-all', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    await revokeAllUserTokens(req.user!.id);
    res.json({ message: 'Logged out from all devices' });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        studentProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.studentProfile || user.employerProfile,
    });
  } catch (error) {
    next(error);
  }
});

// Complete onboarding (Step 2)
router.post('/onboarding', authenticate, validate(onboardingSchema), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { educationLevel, university, graduationYear, major, country, goals } = req.body;

    const profile = await prisma.studentProfile.update({
      where: { userId: req.user!.id },
      data: {
        educationLevel: educationLevel?.toUpperCase(),
        university,
        graduationYear,
        major,
        country,
        goals: goals || [],
      },
    });

    res.json({ profile });
  } catch (error) {
    next(error);
  }
});

export default router;
