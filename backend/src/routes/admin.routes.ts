import { Router, Request } from 'express';
import { z } from 'zod';
import prisma from '../config/database.js';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { hashPassword } from '../services/auth.service.js';
import { AppError } from '../middleware/error.middleware.js';

const router = Router();

// Helper function to log admin actions
const logAdminAction = async (
  req: AuthenticatedRequest,
  action: string,
  targetType: string,
  targetId: string | null,
  details?: Record<string, any>
) => {
  try {
    await prisma.auditLog.create({
      data: {
        adminId: req.user!.id,
        action,
        targetType,
        targetId,
        details: details ? JSON.stringify(details) : null,
        ipAddress: req.ip || req.socket.remoteAddress || null,
        userAgent: req.get('User-Agent') || null,
      },
    });
  } catch (error) {
    console.error('Failed to log admin action:', error);
  }
};

// Validation schemas
const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['STUDENT', 'EMPLOYER', 'ADMIN']),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
  }),
});

// All admin routes require authentication and admin role
router.use(authenticate, requireAdmin);

// Dashboard stats
router.get('/stats', async (req: AuthenticatedRequest, res, next) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalScholarships,
      totalJobs,
      totalApplications,
      recentTransactions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          lastLoginAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      }),
      prisma.scholarship.count({ where: { isActive: true } }),
      prisma.job.count({ where: { status: 'ACTIVE' } }),
      prisma.jobApplication.count(),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
    ]);

    // User growth over last 7 days
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newUsersThisWeek = await prisma.user.count({
      where: { createdAt: { gte: weekAgo } },
    });

    res.json({
      totalUsers,
      activeUsers,
      totalScholarships,
      totalJobs,
      totalApplications,
      recentTransactions,
      newUsersThisWeek,
    });
  } catch (error) {
    next(error);
  }
});

// Enhanced analytics for charts
router.get('/analytics', async (req: AuthenticatedRequest, res, next) => {
  try {
    // Get daily user signups for the last 7 days
    const userGrowth: any[] = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date();
      dayStart.setDate(dayStart.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const count = await prisma.user.count({
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
      });

      userGrowth.push({
        date: dayStart.toISOString().split('T')[0],
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayStart.getDay()],
        count,
      });
    }

    // User distribution by role
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: true,
    });

    // Get totals for trend comparison
    const totalApplications = await prisma.jobApplication.count();
    const totalScholarshipSaves = await prisma.savedScholarship.count();
    const totalHabitsLogged = await prisma.habitLog.count();
    const totalCommunityPosts = await prisma.communityPost.count();

    // Get top 5 scholarships (most recently added)
    const recentScholarships = await prisma.scholarship.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        institution: true,
        country: true,
      },
    });

    // Get top 5 jobs (most recently added)
    const recentJobs = await prisma.job.findMany({
      take: 5,
      orderBy: { id: 'desc' },
      select: {
        id: true,
        title: true,
        department: true,
        locationType: true,
      },
    });

    res.json({
      userGrowth,
      usersByRole: usersByRole.map((r) => ({
        role: r.role,
        count: r._count,
      })),
      engagement: {
        applications: totalApplications,
        scholarshipSaves: totalScholarshipSaves,
        habitsLogged: totalHabitsLogged,
        communityPosts: totalCommunityPosts,
      },
      recentScholarships,
      recentJobs,
    });
  } catch (error) {
    next(error);
  }
});

// User management
router.get('/users', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { role, search, page = '1', limit = '20' } = req.query as any;

    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { studentProfile: { fullName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          lastLoginAt: true,
          studentProfile: { select: { fullName: true, avatarUrl: true } },
          employerProfile: { select: { companyName: true, logoUrl: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Create user with validation
router.post('/users', validate(createUserSchema), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { email, password, role, fullName } = req.body;

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        studentProfile: role === 'STUDENT' ? { create: { fullName } } : undefined,
        employerProfile: role === 'EMPLOYER' ? { create: { companyName: fullName } } : undefined,
      },
    });

    // Audit log
    await logAdminAction(req, 'CREATE_USER', 'USER', user.id, { email, role });

    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
});

// Update user - with self-escalation prevention
router.patch('/users/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { isActive, role } = req.body;
    const targetUserId = req.params.id as string;

    // Prevent admins from modifying their own role or deactivating themselves
    if (targetUserId === req.user!.id) {
      if (role !== undefined) {
        throw new AppError(403, 'You cannot modify your own role');
      }
      if (isActive === false) {
        throw new AppError(403, 'You cannot deactivate your own account');
      }
    }

    const user = await prisma.user.update({
      where: { id: targetUserId },
      data: { isActive, role },
    });

    // Audit log
    await logAdminAction(req, 'UPDATE_USER', 'USER', targetUserId, { isActive, role });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Delete user - prevent self-deletion
router.delete('/users/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const targetUserId = req.params.id as string;

    // Prevent admins from deleting themselves
    if (targetUserId === req.user!.id) {
      throw new AppError(403, 'You cannot delete your own account');
    }

    // Get user info for audit before deletion
    const userToDelete = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { email: true, role: true },
    });

    await prisma.user.delete({ where: { id: targetUserId } });

    // Audit log
    await logAdminAction(req, 'DELETE_USER', 'USER', targetUserId, userToDelete ?? undefined);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Employer management
router.get('/employers', async (req: AuthenticatedRequest, res, next) => {
  try {
    const employers = await prisma.employerProfile.findMany({
      include: {
        user: { select: { email: true, isActive: true, createdAt: true } },
        _count: { select: { jobs: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(employers);
  } catch (error) {
    next(error);
  }
});

// Pricing plans
router.get('/pricing', async (req: AuthenticatedRequest, res, next) => {
  try {
    const plans = await prisma.pricingPlan.findMany({
      include: { _count: { select: { subscriptions: true } } },
      orderBy: { price: 'asc' },
    });
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.post('/pricing', async (req: AuthenticatedRequest, res, next) => {
  try {
    const plan = await prisma.pricingPlan.create({ data: req.body });
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
});

router.patch('/pricing/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const plan = await prisma.pricingPlan.update({
      where: { id: req.params.id as string },
      data: req.body,
    });
    res.json(plan);
  } catch (error) {
    next(error);
  }
});

router.delete('/pricing/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    await prisma.pricingPlan.delete({ where: { id: req.params.id as string } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Contact messages - with pagination
router.get('/messages', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { page = '1', limit = '50' } = req.query as any;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 per page

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.contactMessage.count(),
    ]);

    res.json({
      messages,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/messages/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const message = await prisma.contactMessage.update({
      where: { id: req.params.id as string },
      data: { isRead: true },
    });
    res.json(message);
  } catch (error) {
    next(error);
  }
});

// Audit logs - view admin actions for accountability
router.get('/audit-logs', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { page = '1', limit = '50', action, adminId } = req.query as any;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

    const where: any = {};
    if (action) where.action = action;
    if (adminId) where.adminId = adminId;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      logs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
