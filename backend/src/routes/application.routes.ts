import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { requireEmployer } from '../middleware/role.middleware.js';

const router = Router();

// Get application details (for employer)
router.get('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const application = await prisma.jobApplication.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          include: {
            studentProfile: true,
          },
        },
        job: true,
      },
    });

    if (!application) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
});

// Update application status (employer)
router.patch('/:id/status', authenticate, requireEmployer, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { status, notes } = req.body;

    const application = await prisma.jobApplication.update({
      where: { id: req.params.id },
      data: {
        status,
        notes,
      },
    });

    res.json(application);
  } catch (error) {
    next(error);
  }
});

// Get applications for a job (employer)
router.get('/job/:jobId', authenticate, requireEmployer, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { status, page = '1', limit = '20' } = req.query as any;

    const where: any = { jobId: req.params.jobId };
    if (status) where.status = status;

    const [applications, total] = await Promise.all([
      prisma.jobApplication.findMany({
        where,
        include: {
          user: {
            include: {
              studentProfile: {
                select: {
                  fullName: true,
                  avatarUrl: true,
                  university: true,
                  major: true,
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

// Withdraw application (student)
router.delete('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const application = await prisma.jobApplication.findUnique({
      where: { id: req.params.id },
    });

    if (!application || application.userId !== req.user!.id) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    await prisma.jobApplication.update({
      where: { id: req.params.id },
      data: { status: 'WITHDRAWN' },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
