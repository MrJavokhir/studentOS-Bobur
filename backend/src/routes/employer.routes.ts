import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { requireEmployer } from '../middleware/role.middleware.js';

const router = Router();

// Middleware: All routes require authentication and EMPLOYER role
router.use(authenticate, requireEmployer);

// Get employer profile
router.get('/me', async (req: AuthenticatedRequest, res, next) => {
  try {
    const profile = await prisma.employerProfile.findUnique({
      where: { userId: req.user!.id },
      include: {
        _count: {
          select: { jobs: true },
        },
      },
    });

    if (!profile) {
      // Auto-create if not exists (onboarding flow might have been skipped)
      // Or return 404? Better to return null or strict 404. 
      // User model exists, so if they are EMPLOYER, they should have a profile.
      // But let's return null if not found for frontend to handle "Create Profile" UI.
      res.json(null);
      return;
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// Update employer profile
router.patch('/me', async (req: AuthenticatedRequest, res, next) => {
  try {
    const profile = await prisma.employerProfile.upsert({
      where: { userId: req.user!.id },
      update: req.body,
      create: {
        userId: req.user!.id,
        ...req.body,
        companyName: req.body.companyName || 'My Company', // Fallback
      },
    });

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// Get dashboard stats
router.get('/stats', async (req: AuthenticatedRequest, res, next) => {
  try {
    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: req.user!.id },
    });

    if (!employerProfile) {
      res.json({
        activeJobs: 0,
        totalApplicants: 0,
        newApplications: 0,
        shortlisted: 0,
      });
      return;
    }

    const [activeJobs, totalApplicants, newApplications, shortlisted] = await Promise.all([
      // Active Jobs
      prisma.job.count({
        where: { employerId: employerProfile.id, status: 'ACTIVE' },
      }),
      // Total Applicants across all my jobs
      prisma.jobApplication.count({
        where: { job: { employerId: employerProfile.id } },
      }),
      // New Applications (e.g. status NEW)
      prisma.jobApplication.count({
        where: { job: { employerId: employerProfile.id }, status: 'NEW' },
      }),
      // Shortlisted (e.g. status SCREENING or INTERVIEW)
      prisma.jobApplication.count({
        where: { 
          job: { employerId: employerProfile.id }, 
          status: { in: ['SCREENING', 'INTERVIEW'] } 
        },
      }),
    ]);

    res.json({
      activeJobs,
      totalApplicants,
      newApplications,
      shortlisted,
    });
  } catch (error) {
    next(error);
  }
});

// Get all applications for this employer (aggregated)
router.get('/applications', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { page = '1', limit = '10', status, search } = req.query as any;

    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: req.user!.id },
    });

    if (!employerProfile) {
      res.json({ applications: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } });
      return;
    }

    const where: any = {
      job: { employerId: employerProfile.id },
    };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { user: { studentProfile: { fullName: { contains: search, mode: 'insensitive' } } } },
        { job: { title: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [applications, total] = await Promise.all([
      prisma.jobApplication.findMany({
        where,
        include: {
          job: {
            select: { title: true, id: true },
          },
          user: {
            select: {
              email: true,
              studentProfile: {
                select: {
                  fullName: true,
                  avatarUrl: true,
                  university: true,
                  major: true,
                  educationLevel: true, 
                  country: true,
                  graduationYear: true,
                  skills: true,
                },
              },
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.jobApplication.count({ where }),
    ]);

    res.json({
      applications,
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

export default router;
