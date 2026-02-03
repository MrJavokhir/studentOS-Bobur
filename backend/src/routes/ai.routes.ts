import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.middleware.js';
import {
  analyzeCV,
  generateCoverLetter,
  generateLearningPlan,
  checkPlagiarism,
} from '../services/gemini.service.js';

const router = Router();

// All AI routes require authentication
router.use(authenticate);

// CV/ATS Analysis
router.post('/analyze-cv', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { cvText, jobDescription } = req.body;

    if (!cvText) {
      res.status(400).json({ error: 'CV text is required' });
      return;
    }

    const analysis = await analyzeCV(cvText, jobDescription);

    // Update user's ATS score
    await prisma.studentProfile.update({
      where: { userId: req.user!.id },
      data: { atsScore: analysis.score },
    });

    res.json(analysis);
  } catch (error) {
    next(error);
  }
});

// Cover Letter Generation
router.post('/cover-letter', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { jobTitle, company, jobDescription } = req.body;

    if (!jobTitle || !company || !jobDescription) {
      res.status(400).json({ error: 'Job title, company, and description are required' });
      return;
    }

    // Get user profile
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.id },
    });

    const coverLetter = await generateCoverLetter(
      jobTitle,
      company,
      jobDescription,
      {
        name: profile?.fullName || 'Applicant',
        skills: profile?.skills || [],
        experience: profile?.bio || undefined,
      }
    );

    res.json({ coverLetter });
  } catch (error) {
    next(error);
  }
});

// Learning Plan Generation
router.post('/learning-plan', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { goal, timeframe = '4 weeks' } = req.body;

    if (!goal) {
      res.status(400).json({ error: 'Learning goal is required' });
      return;
    }

    // Get user's current skills
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.id },
    });

    const plan = await generateLearningPlan(
      goal,
      profile?.skills || [],
      timeframe
    );

    res.json(plan);
  } catch (error) {
    next(error);
  }
});

// Plagiarism Check
router.post('/plagiarism-check', async (req: AuthenticatedRequest, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const result = await checkPlagiarism(text);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
