import React from 'react';
import { Screen, NavigationProps } from '../types';

export default function SignUpStep1({ navigateTo }: NavigationProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full border-b border-slate-200 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo(Screen.LANDING)}>
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">StudentOS</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary mb-4">
              Step 1 of 2
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Create your account</h1>
            <p className="mt-3 text-slate-600">
              Join thousands of high-achieving students optimizing their future.
            </p>
          </div>
          <div className="bg-white shadow-xl shadow-slate-200/40 border border-slate-200 rounded-2xl p-6 sm:p-10">
            <button type="button" className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Sign up with Google
            </button>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Or continue with email</span>
              </div>
            </div>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigateTo(Screen.SIGNUP_STEP_2); }}>
              <div>
                <label htmlFor="fullname" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input type="text" name="fullname" id="fullname" className="block w-full rounded-xl border-slate-300 py-3 px-4 shadow-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
                <input type="email" name="email" id="email" className="block w-full rounded-xl border-slate-300 py-3 px-4 shadow-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6" placeholder="you@university.edu" />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                  <input type="password" name="password" id="password" className="block w-full rounded-xl border-slate-300 py-3 px-4 shadow-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6" placeholder="••••••••" />
                </div>
                <div>
                  <label htmlFor="confirm_password" className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
                  <input type="password" name="confirm_password" id="confirm_password" className="block w-full rounded-xl border-slate-300 py-3 px-4 shadow-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm sm:leading-6" placeholder="••••••••" />
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="flex w-full justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Create Account
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>
            <p className="mt-8 text-center text-xs text-slate-500">
              By clicking "Create Account", you agree to our 
              <a href="#" className="font-medium text-slate-700 hover:text-primary underline decoration-slate-300 underline-offset-4 hover:decoration-primary transition-colors ml-1">Terms of Service</a>
              <span className="mx-1">and</span>
              <a href="#" className="font-medium text-slate-700 hover:text-primary underline decoration-slate-300 underline-offset-4 hover:decoration-primary transition-colors">Privacy Policy</a>.
            </p>
          </div>
          <p className="text-center text-sm font-medium text-slate-600">
            Already have an account? 
            <button onClick={() => navigateTo(Screen.SIGN_IN)} className="text-primary hover:text-primary-dark font-bold hover:underline ml-1">Sign in</button>
          </p>
        </div>
      </main>
      <footer className="py-8 text-center">
        <p className="text-sm text-slate-400">© 2023 StudentOS Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}