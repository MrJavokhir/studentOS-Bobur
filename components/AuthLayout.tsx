import React from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from './ParticlesBackground';

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
        {/* Background Gradient - Deep Space / Cyber */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e1b4b]" />

        {/* Abstract Network Visualization */}
        <div className="absolute inset-0 z-0">
          <ParticlesBackground />
        </div>

        {/* Overlay Content (Optional Text/Logo) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-16 pointer-events-none">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">
              Your Future, <span className="text-blue-400">Connected.</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join the network where students, opportunities, and AI intelligence converge to build
              your career.
            </p>
          </div>
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
