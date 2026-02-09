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
      <div className="hidden lg:block lg:w-[55%] relative overflow-hidden bg-slate-900">
        {/* Animated Background - Floating Cards */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 z-10" />

          {/* Floating Cards Animation */}
          <div className="absolute inset-0 animate-float-slow">
            <div className="grid grid-cols-3 gap-4 p-4 transform rotate-[-8deg] scale-110 origin-center">
              {/* Row 1 */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl h-48 shadow-2xl transform hover:scale-105 transition-transform" />
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl h-64 shadow-2xl" />
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl h-52 shadow-2xl" />
                <div className="bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl h-48 shadow-2xl" />
              </div>
              {/* Row 2 */}
              <div className="space-y-4 mt-8">
                <div className="bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl h-56 shadow-2xl" />
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl h-48 shadow-2xl" />
                <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl h-60 shadow-2xl" />
                <div className="bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl h-52 shadow-2xl" />
              </div>
              {/* Row 3 */}
              <div className="space-y-4 mt-4">
                <div className="bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-2xl h-52 shadow-2xl" />
                <div className="bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl h-48 shadow-2xl" />
                <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl h-64 shadow-2xl" />
                <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl h-48 shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 z-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
            <div
              className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400/40 rounded-full animate-bounce"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-4 h-4 bg-pink-400/30 rounded-full animate-bounce"
              style={{ animationDelay: '1.5s' }}
            />
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(-8deg);
          }
          50% {
            transform: translateY(-20px) rotate(-8deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
