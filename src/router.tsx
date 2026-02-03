import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './ui/RootLayout';
import { withNavigate } from './ui/withNavigate';

function Loader() {
  return <div style={{ padding: 24 }}>Loading…</div>;
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

function NotFound() {
  return <div style={{ padding: 24 }}>404 — Not Found</div>;
}

// Helper to retry lazy imports on chunk load errors (e.g., after deployment)
const lazyRetry = (importFn: () => Promise<any>) => {
  return lazy(async () => {
    try {
      return await importFn();
    } catch (error: any) {
      if (error.message?.includes('Failed to fetch dynamically imported module') || error.name === 'ChunkLoadError') {
         // Prevent infinite reload loop if the file is genuinely missing
         const storageKey = `retry-${error.message}`;
         const hasRetried = sessionStorage.getItem(storageKey);
         
         if (!hasRetried) {
            sessionStorage.setItem(storageKey, 'true');
            window.location.reload();
            // Return a never-resolving promise to wait for reload
            return new Promise(() => {});
         }
      }
      throw error;
    }
  });
};

// Public
const LandingPage = withNavigate(lazyRetry(() => import('../components/LandingPage')));
const SignIn = withNavigate(lazyRetry(() => import('../components/SignIn')));
const SignUpStep1 = withNavigate(lazyRetry(() => import('../components/SignUpStep1')));
const SignUpStep2 = withNavigate(lazyRetry(() => import('../components/SignUpStep2')));
const AboutUs = withNavigate(lazyRetry(() => import('../components/AboutUs')));
const Blog = withNavigate(lazyRetry(() => import('../components/Blog')));
const ContactSupport = withNavigate(lazyRetry(() => import('../components/ContactSupport')));

// App
const Dashboard = withNavigate(lazyRetry(() => import('../components/Dashboard')));
const ScholarshipFinder = withNavigate(lazyRetry(() => import('../components/ScholarshipFinder')));
const JobFinder = withNavigate(lazyRetry(() => import('../components/JobFinder')));
const CVChecker = withNavigate(lazyRetry(() => import('../components/CVChecker')));
const CoverLetterGenerator = withNavigate(lazyRetry(() => import('../components/CoverLetterGenerator')));
const PresentationMaker = withNavigate(lazyRetry(() => import('../components/PresentationMaker')));
const FinanceTracker = withNavigate(lazyRetry(() => import('../components/FinanceTracker')));
const LearningPlan = withNavigate(lazyRetry(() => import('../components/LearningPlan')));
const PlagiarismChecker = withNavigate(lazyRetry(() => import('../components/PlagiarismChecker')));
const HabitTracker = withNavigate(lazyRetry(() => import('../components/HabitTracker')));
const CommunityFeed = withNavigate(lazyRetry(() => import('../components/CommunityFeed')));
const ProfileSettings = withNavigate(lazyRetry(() => import('../components/ProfileSettings')));

// Admin
const AdminDashboard = withNavigate(lazyRetry(() => import('../components/AdminDashboard')));
const AdminEmployers = withNavigate(lazyRetry(() => import('../components/AdminEmployers')));
const AdminPricing = withNavigate(lazyRetry(() => import('../components/AdminPricing')));
const AdminUsers = withNavigate(lazyRetry(() => import('../components/AdminUsers')));
const AdminScholarships = withNavigate(lazyRetry(() => import('../components/AdminScholarships')));
const AdminRoles = withNavigate(lazyRetry(() => import('../components/AdminRoles')));
const AdminBlog = withNavigate(lazyRetry(() => import('../components/AdminBlog')));

// Employer
const EmployerDashboard = withNavigate(lazyRetry(() => import('../components/EmployerDashboard')));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <Wrap>
            <LandingPage />
          </Wrap>
        ),
      },
      {
        path: '/signin',
        element: (
          <Wrap>
            <SignIn />
          </Wrap>
        ),
      },
      {
        path: '/signup/step-1',
        element: (
          <Wrap>
            <SignUpStep1 />
          </Wrap>
        ),
      },
      {
        path: '/signup/step-2',
        element: (
          <Wrap>
            <SignUpStep2 />
          </Wrap>
        ),
      },
      {
        path: '/about',
        element: (
          <Wrap>
            <AboutUs />
          </Wrap>
        ),
      },
      {
        path: '/blog',
        element: (
          <Wrap>
            <Blog />
          </Wrap>
        ),
      },
      {
        path: '/contact',
        element: (
          <Wrap>
            <ContactSupport />
          </Wrap>
        ),
      },

      {
        path: '/app',
        element: (
          <Wrap>
            <Dashboard />
          </Wrap>
        ),
      },
      {
        path: '/app/scholarships',
        element: (
          <Wrap>
            <ScholarshipFinder />
          </Wrap>
        ),
      },
      {
        path: '/app/jobs',
        element: (
          <Wrap>
            <JobFinder />
          </Wrap>
        ),
      },
      {
        path: '/app/cv-ats',
        element: (
          <Wrap>
            <CVChecker />
          </Wrap>
        ),
      },
      {
        path: '/app/cover-letter',
        element: (
          <Wrap>
            <CoverLetterGenerator />
          </Wrap>
        ),
      },
      {
        path: '/app/presentation',
        element: (
          <Wrap>
            <PresentationMaker />
          </Wrap>
        ),
      },
      {
        path: '/app/learning-plan',
        element: (
          <Wrap>
            <LearningPlan />
          </Wrap>
        ),
      },
      {
        path: '/app/finance',
        element: (
          <Wrap>
            <FinanceTracker />
          </Wrap>
        ),
      },
      {
        path: '/app/plagiarism',
        element: (
          <Wrap>
            <PlagiarismChecker />
          </Wrap>
        ),
      },
      {
        path: '/app/habit-tracker',
        element: (
          <Wrap>
            <HabitTracker />
          </Wrap>
        ),
      },
      {
        path: '/app/community',
        element: (
          <Wrap>
            <CommunityFeed />
          </Wrap>
        ),
      },
      {
        path: '/app/profile',
        element: (
          <Wrap>
            <ProfileSettings />
          </Wrap>
        ),
      },

      {
        path: '/admin',
        element: (
          <Wrap>
            <AdminDashboard />
          </Wrap>
        ),
      },
      {
        path: '/admin/employers',
        element: (
          <Wrap>
            <AdminEmployers />
          </Wrap>
        ),
      },
      {
        path: '/admin/pricing',
        element: (
          <Wrap>
            <AdminPricing />
          </Wrap>
        ),
      },
      {
        path: '/admin/users',
        element: (
          <Wrap>
            <AdminUsers />
          </Wrap>
        ),
      },
      {
        path: '/admin/scholarships',
        element: (
          <Wrap>
            <AdminScholarships />
          </Wrap>
        ),
      },
      {
        path: '/admin/roles',
        element: (
          <Wrap>
            <AdminRoles />
          </Wrap>
        ),
      },
      {
        path: '/admin/blog',
        element: (
          <Wrap>
            <AdminBlog />
          </Wrap>
        ),
      },

      {
        path: '/employer',
        element: (
          <Wrap>
            <EmployerDashboard />
          </Wrap>
        ),
      },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
