import React from 'react';
import { Screen, NavigationProps } from '../types';

export default function AdminDashboard({ navigateTo }: NavigationProps) {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-hidden">
      <aside className="flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e2330] transition-colors duration-200">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => navigateTo(Screen.LANDING)}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-bold leading-tight text-slate-900 dark:text-white">StudentOS</h1>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Admin Console</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <button onClick={() => navigateTo(Screen.ADMIN_DASHBOARD)} className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-primary dark:text-white dark:bg-primary/20 transition-colors w-full text-left">
                <span className="material-symbols-outlined fill-1">dashboard</span>
                <span className="text-sm font-semibold">Dashboard</span>
              </button>
              <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors w-full text-left">
                <span className="material-symbols-outlined">work</span>
                <span className="text-sm font-medium">Employers</span>
              </button>
              <button onClick={() => navigateTo(Screen.ADMIN_PRICING)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors w-full text-left">
                <span className="material-symbols-outlined">payments</span>
                <span className="text-sm font-medium">Pricing</span>
              </button>
              <button onClick={() => navigateTo(Screen.ADMIN_ROLES)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors w-full text-left">
                <span className="material-symbols-outlined">manage_accounts</span>
                <span className="text-sm font-medium">User Management</span>
              </button>
              <button onClick={() => navigateTo(Screen.ADMIN_SCHOLARSHIPS)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors w-full text-left">
                <span className="material-symbols-outlined">school</span>
                <span className="text-sm font-medium">Scholarships</span>
              </button>
              <button onClick={() => navigateTo(Screen.ADMIN_ROLES)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors w-full text-left">
                <span className="material-symbols-outlined">admin_panel_settings</span>
                <span className="text-sm font-medium">Roles & Permissions</span>
              </button>
            </nav>
          </div>
          <div className="flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800 pt-4">
            <div className="flex items-center gap-3 px-2">
              <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuz7qhWBsQWRjQG1k4CGzFYXhvsFourXvcGFagkS8Ygc6l63kf_qKcXMNXo-XVoFmsea9D7RojO2v9OQMLgttwk1_1u0Sefnl9iGveWDk1yjDa_QNz60aKEgmugT98Txyt38TOYyQMofKNHNsNclFGBFIyOx-Pp3k9dCugBZvO2F-jiAog2elvqhTUfgxkZ76fxUGvaAwgKP6ELOG_Pjri33lWH4w8m1KEmJ6TIWTLY4NQXPNvKCff1WFCaRn_73oR3o1z2hQVLt4')" }}></div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Jane Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
              </div>
            </div>
            <button onClick={() => navigateTo(Screen.SIGN_IN)} className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-white/5 p-2 text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-lg">logout</span>
              Logout
            </button>
          </div>
        </div>
      </aside>
      <main className="flex flex-1 flex-col overflow-y-auto bg-[#f6f6f8] dark:bg-[#111421]">
        <div className="mx-auto w-full max-w-7xl px-6 py-8">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Admin Dashboard</h2>
              <p className="text-base text-slate-500 dark:text-slate-400">Real-time overview of platform analytics and user activity</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-4 py-2 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                <span>Oct 24 - Nov 24</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark transition-colors shadow-sm shadow-primary/30">
                <span className="material-symbols-outlined text-lg">download</span>
                <span>Export Report</span>
              </button>
            </div>
          </header>
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Users</p>
                <span className="material-symbols-outlined text-primary/60 dark:text-primary-dark/60 text-xl">group</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">12,450</p>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-base">trending_up</span>
                <span>+12%</span>
                <span className="font-normal text-slate-500 dark:text-slate-400 ml-1">vs last month</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Now</p>
                <span className="material-symbols-outlined text-emerald-500/80 text-xl">radio_button_checked</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">1,893</p>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <span>+54</span>
                <span className="font-normal text-slate-500 dark:text-slate-400 ml-1">in last hour</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Recent Transactions</p>
                <span className="material-symbols-outlined text-orange-500/80 text-xl">receipt_long</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">342</p>
              <div className="flex items-center gap-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span>Pending</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Revenue / User</p>
                <span className="material-symbols-outlined text-primary/60 dark:text-primary-dark/60 text-xl">attach_money</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$18.40</p>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-base">trending_up</span>
                <span>+2.4%</span>
                <span className="font-normal text-slate-500 dark:text-slate-400 ml-1">vs last month</span>
              </div>
            </div>
          </section>
          <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Growth & Active Trends</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Comparing new signups vs daily active users</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-white/5 p-1">
                  <button className="rounded-md bg-white dark:bg-white/10 px-3 py-1 text-xs font-bold shadow-sm text-slate-900 dark:text-white">Weekly</button>
                  <button className="rounded-md px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5">Monthly</button>
                </div>
              </div>
              <div className="h-[300px] w-full relative">
                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 800 300">
                  <defs>
                    <linearGradient id="growthGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2d4ee1" stopOpacity="0.15"></stop>
                      <stop offset="100%" stopColor="#2d4ee1" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <line className="dark:stroke-gray-700" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="250" y2="250"></line>
                  <line className="dark:stroke-gray-700" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="150" y2="150"></line>
                  <line className="dark:stroke-gray-700" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="50" y2="50"></line>
                  <path d="M0,250 C100,240 150,200 200,180 C250,160 300,190 350,150 C400,110 450,130 500,100 C550,70 600,90 650,60 C700,30 750,50 800,40 V300 H0 Z" fill="url(#growthGradient)"></path>
                  <path d="M0,250 C100,240 150,200 200,180 C250,160 300,190 350,150 C400,110 450,130 500,100 C550,70 600,90 650,60 C700,30 750,50 800,40" fill="none" stroke="#2d4ee1" strokeWidth="3"></path>
                  <path d="M0,280 C120,270 180,260 240,240 C300,220 360,230 420,200 C480,170 540,190 600,160 C660,130 720,150 800,120" fill="none" stroke="#f97316" strokeDasharray="5 5" strokeWidth="2"></path>
                  <circle className="dark:stroke-gray-800" cx="200" cy="180" fill="#2d4ee1" r="4" stroke="#fff" strokeWidth="2"></circle>
                  <circle className="dark:stroke-gray-800" cx="500" cy="100" fill="#2d4ee1" r="4" stroke="#fff" strokeWidth="2"></circle>
                  <circle className="dark:stroke-gray-800" cx="650" cy="60" fill="#2d4ee1" r="4" stroke="#fff" strokeWidth="2"></circle>
                </svg>
              </div>
              <div className="mt-4 flex justify-between px-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              <div className="mt-4 flex gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">New Signups</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Users</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] p-6 shadow-sm flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Demographics</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Distribution by Age & Role</p>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-5">
                <div className="group">
                  <div className="flex justify-between text-xs font-semibold mb-1 text-slate-900 dark:text-white">
                    <span>Students (18-24)</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className="bg-primary h-3 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex justify-between text-xs font-semibold mb-1 text-slate-900 dark:text-white">
                    <span>Graduates (25-30)</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className="bg-emerald-500 h-3 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex justify-between text-xs font-semibold mb-1 text-slate-900 dark:text-white">
                    <span>Employers / Recruiters</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex justify-between text-xs font-semibold mb-1 text-slate-900 dark:text-white">
                    <span>Administrators</span>
                    <span>5%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: "5%" }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Dominant Group</span>
                  <span className="font-bold text-primary">Students</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-slate-500 dark:text-slate-400">Fastest Growing</span>
                  <span className="font-bold text-emerald-500">Graduates</span>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <div className="border-b border-slate-200 dark:border-slate-700">
              <div className="flex gap-8">
                <button className="relative pb-4 text-sm font-bold text-primary dark:text-primary-dark">
                  Employer Approvals
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary dark:bg-primary-dark"></span>
                </button>
                <button className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Tool Pricing
                </button>
                <button className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  User Demographics Details
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-3 py-2 shadow-sm max-w-md">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">search</span>
                <input className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none" placeholder="Search companies or emails..." type="text"/>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-3 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined text-lg">filter_list</span>
                  Filter
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-3 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined text-lg">sort</span>
                  Sort
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-white/5">
                    <tr>
                      <th className="w-12 px-6 py-4">
                        <input className="h-4 w-4 rounded border-slate-200 text-primary focus:ring-primary dark:border-slate-700 dark:bg-white/10" type="checkbox"/>
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Company Name</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Industry</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date Applied</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <input className="h-4 w-4 rounded border-slate-200 text-primary focus:ring-primary dark:border-slate-700 dark:bg-white/10" type="checkbox"/>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold">TF</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">TechFlow Inc.</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">contact@techflow.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white">
                          <span className="material-symbols-outlined text-lg text-slate-500 dark:text-slate-400">code</span>
                          Software Development
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 24, 2023</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                          Pending Review
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20 transition-colors" title="Approve">
                            <span className="material-symbols-outlined">check_circle</span>
                          </button>
                          <button className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors" title="Reject">
                            <span className="material-symbols-outlined">cancel</span>
                          </button>
                          <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors" title="More Options">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <input className="h-4 w-4 rounded border-slate-200 text-primary focus:ring-primary dark:border-slate-700 dark:bg-white/10" type="checkbox"/>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgpCl8l0S9hceP4XWyZr3ckYiPPT0jnv-Jkh7E02HLQSd_o7ddFaftnc_8GBom4DK8xaBFaAkg3P5mMPJFm1SoGXF_aUlP6lGw9obItvgBPAsrl_DjUn_ETtYCf70TomtcCzDl14aBfsX0D7YWi4UqOa-WobZUvFae7748s-sI0Rja19Rau6rMsrL-E9s9g-aRHpKruXbuOD-UT3uCkAluvIo-GXeLsM0Paq_RQKxN60g9OXnV3NuEjiC16n1ayQAKwrnRL1BZhWw')" }}></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">EduLearn Systems</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">admin@edulearn.org</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white">
                          <span className="material-symbols-outlined text-lg text-slate-500 dark:text-slate-400">school</span>
                          Education Tech
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 23, 2023</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors" title="Edit">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors" title="More Options">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-6 py-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">Showing 1-2 of 14 pending approvals</p>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-900 dark:text-white disabled:opacity-50" disabled={true}>Previous</button>
                  <button className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-900 dark:text-white">Next</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}