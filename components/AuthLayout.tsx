import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkTo?: string;
}

/**
 * AuthLayout - Gamma App Split-Screen Style
 * Left panel: Form content
 * Right panel: Animated visual showcase
 */
export default function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[45%] min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-white">
        {/* Logo */}
        <div className="p-6 lg:p-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-slate-800">StudentOS</span>
          </Link>
        </div>

        {/* Form Content - Centered */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-16 py-8">
          <div className="w-full max-w-md">
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2">
              {title}
            </h1>
            {subtitle && <p className="text-slate-500 mb-8">{subtitle}</p>}

            {/* Form Content */}
            {children}

            {/* Footer Link */}
            {footerText && footerLinkText && footerLinkTo && (
              <p className="text-center text-sm text-slate-500 mt-8">
                {footerText}{' '}
                <Link
                  to={footerLinkTo}
                  className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
                >
                  {footerLinkText}
                </Link>
              </p>
            )}

            {/* Terms */}
            <p className="text-xs text-slate-400 mt-8 text-center">
              By continuing, you acknowledge that you agree to
              <br />
              StudentOS's{' '}
              <Link to="/terms" className="underline hover:text-slate-600">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline hover:text-slate-600">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Footer Branding */}
            <div className="mt-12 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 tracking-wide">
                  STUDENTOS
                </span>
              </div>
              <p className="text-xs text-slate-400">© 2026 StudentOS, Inc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Showcase */}
      <div className="hidden lg:block lg:w-[55%] relative overflow-hidden bg-white">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

        {/* Animated Icons Container */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Icon 1: Graduation Cap (Top Left) */}
          <div
            className="absolute top-[15%] left-[10%] opacity-20 text-indigo-300 animate-float-slow"
            style={{ animationDelay: '0s' }}
          >
            <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
            </svg>
          </div>

          {/* Icon 2: Open Book (Top Right) */}
          <div
            className="absolute top-[20%] right-[15%] opacity-20 text-blue-300 animate-float-medium"
            style={{ animationDelay: '1s' }}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 1L14 6V17L19 12V1Z" />
              <path d="M21 5C19.89 4.65 18.58 4.65 18 4.65C16.89 4.65 15.58 4.65 13.5 5.25V19.85C13.5 19.95 13.59 19.99 13.68 19.96C15.68 19.4 17.18 19.4 18 19.4C19.24 19.4 20.64 19.65 22.25 20.35C22.68 20.53 23 20.14 23 19.7V5.65C23 5.3 22.4 5 21 5Z" />
              <path d="M10.5 5.25C8.42 4.65 7.11 4.65 6 4.65C5.42 4.65 4.11 4.65 3 5C1.6 5 1 5.3 1 5.65V19.7C1 20.14 1.32 20.53 1.75 20.35C3.36 19.65 4.76 19.4 6 19.4C6.82 19.4 8.32 19.4 10.32 19.96C10.41 19.99 10.5 19.95 10.5 19.85V5.25Z" />
            </svg>
          </div>

          {/* Icon 3: Lightbulb (Bottom Left) */}
          <div
            className="absolute bottom-[20%] left-[12%] opacity-20 text-amber-200 animate-float-fast"
            style={{ animationDelay: '2s' }}
          >
            <svg width="130" height="130" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2ZM14.85 13.1L14.4 13.42L14 13.7V16H10V13.7L9.6 13.42C8.01 12.33 7 10.65 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 10.65 16 12.33 14.85 13.1Z" />
            </svg>
          </div>

          {/* Icon 4: Pencil/Ruler (Bottom Right) */}
          <div
            className="absolute bottom-[25%] right-[10%] opacity-20 text-emerald-200 animate-float-slow"
            style={{ animationDelay: '3s' }}
          >
            <svg width="110" height="110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
            </svg>
          </div>

          {/* Optional: Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-2deg); }
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-reverse 10s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
