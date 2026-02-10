import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('STUDENT' | 'EMPLOYER' | 'ADMIN')[];
}

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f8] dark:bg-[#111421]">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}

function getRoleDefaultRoute(role: string): string {
  switch (role) {
    case 'ADMIN':
      return '/admin';
    case 'EMPLOYER':
      return '/employer';
    case 'STUDENT':
    default:
      return '/app';
  }
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loader while checking auth status
  if (isLoading) {
    return <Loader />;
  }

  // Not authenticated → redirect to signin with return URL
  if (!isAuthenticated || !user) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signin?redirect=${returnUrl}`} replace />;
  }

  // Onboarding guard: if user role is still default STUDENT and profile has no university/major,
  // they likely haven't completed onboarding. Force them to /signup/step-2.
  const onboardingPaths = ['/signup/step-2', '/verification-pending'];
  const isOnOnboarding = onboardingPaths.some((p) => location.pathname.startsWith(p));

  if (!isOnOnboarding && user.role === 'STUDENT') {
    const profile = user.profile;
    const hasCompletedOnboarding = profile && (profile.university || profile.major);
    if (!hasCompletedOnboarding) {
      return <Navigate to="/signup/step-2" replace />;
    }
  }

  // If user already completed onboarding and tries to access /signup/step-2, redirect to dashboard
  if (isOnOnboarding && location.pathname === '/signup/step-2') {
    const profile = user.profile;
    const hasCompletedOnboarding =
      user.role !== 'STUDENT' || (profile && (profile.university || profile.major));
    if (hasCompletedOnboarding) {
      return <Navigate to={getRoleDefaultRoute(user.role)} replace />;
    }
  }

  // Check role-based access if roles are specified
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // User is logged in but doesn't have permission for this route
      // Redirect to their appropriate dashboard
      return <Navigate to={getRoleDefaultRoute(user.role)} replace />;
    }
  }

  // All checks passed, render children
  return <>{children}</>;
}

export default ProtectedRoute;
