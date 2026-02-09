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
            <h1 className="text-4xl lg:text-5xl font-serif italic text-slate-900 mb-2">{title}</h1>
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
      <div className="hidden lg:block lg:w-[55%] relative overflow-hidden bg-slate-50">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-violet-100" />

        {/* Animated Icons Container */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Icon 1: Graduation Cap (Top Left) */}
          <div
            className="absolute top-[15%] left-[10%] opacity-10 text-indigo-900 animate-float-slow"
            style={{ animationDelay: '0s' }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>

          {/* Icon 2: Open Book (Top Right) */}
          <div
            className="absolute top-[20%] right-[15%] opacity-[0.08] text-blue-900 animate-float-medium"
            style={{ animationDelay: '1s' }}
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>

          {/* Icon 3: Code/Terminal (Center Left) */}
          <div
            className="absolute top-[50%] left-[8%] opacity-[0.12] text-violet-900 animate-float-fast"
            style={{ animationDelay: '2s' }}
          >
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          {/* Icon 4: Lightbulb (Bottom Right) */}
          <div
            className="absolute bottom-[20%] right-[10%] opacity-10 text-amber-900 animate-float-slow"
            style={{ animationDelay: '3s' }}
          >
            <svg
              width="110"
              height="110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.4 1.5-3.8 0-3.2-2.7-5.7-6-5.7s-6 2.5-6 5.7c0 1.4.5 2.8 1.5 3.8.8.8 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
            </svg>
          </div>

          {/* Icon 5: Globe/Atom (Bottom Left) */}
          <div
            className="absolute bottom-[10%] left-[20%] opacity-[0.08] text-teal-900 animate-float-medium"
            style={{ animationDelay: '4s' }}
          >
            <svg
              width="95"
              height="95"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>

          {/* Additional decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
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
