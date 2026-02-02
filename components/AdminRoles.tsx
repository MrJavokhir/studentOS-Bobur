import React from 'react';
import { Screen, NavigationProps } from '../types';

export default function AdminRoles({ navigateTo }: NavigationProps) {
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
              <button onClick={() => navigateTo(Screen.ADMIN_DASHBOARD)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors w-full text-left">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
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
                <span className="material-symbols-outlined">group</span>
                <span className="text-sm font-medium">Users</span>
              </button>
              <button onClick={() => navigateTo(Screen.ADMIN_ROLES)} className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-primary dark:text-white dark:bg-primary/20 transition-colors w-full text-left">
                <span className="material-symbols-outlined fill-1">admin_panel_settings</span>
                <span className="text-sm font-semibold">Roles & Permissions</span>
              </button>
              <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors w-full text-left">
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm font-medium">Settings</span>
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
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Roles & Permissions</h2>
              <p className="text-base text-slate-500 dark:text-slate-400">Manage team access and Role-Based Access Control (RBAC)</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-4 py-2 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-lg">security</span>
                <span>Audit Log</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark transition-colors shadow-sm shadow-primary/30">
                <span className="material-symbols-outlined text-lg">add_moderator</span>
                <span>Create New Role</span>
              </button>
            </div>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Admin Users</h3>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-3 py-2 shadow-sm flex-1 max-w-xs">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">search</span>
                  <input className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none" placeholder="Search admins..." type="text"/>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-white/5">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">User</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Login</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuz7qhWBsQWRjQG1k4CGzFYXhvsFourXvcGFagkS8Ygc6l63kf_qKcXMNXo-XVoFmsea9D7RojO2v9OQMLgttwk1_1u0Sefnl9iGveWDk1yjDa_QNz60aKEgmugT98Txyt38TOYyQMofKNHNsNclFGBFIyOx-Pp3k9dCugBZvO2F-jiAog2elvqhTUfgxkZ76fxUGvaAwgKP6ELOG_Pjri33lWH4w8m1KEmJ6TIWTLY4NQXPNvKCff1WFCaRn_73oR3o1z2hQVLt4')" }}></div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">Jane Doe</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">jane@studentos.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            <span className="material-symbols-outlined text-[14px]">shield</span>
                            Super Admin
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          Just now
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                        </td>
                      </tr>
                      <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-bold text-xs">AS</div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">Alex Smith</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">alex@studentos.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            <span className="material-symbols-outlined text-[14px]">work</span>
                            Employer Admin
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          2 hours ago
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-6 py-3">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Showing 4 of 12 admins</p>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-900 dark:text-white disabled:opacity-50" disabled={true}>Previous</button>
                    <button className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-900 dark:text-white">Next</button>
                  </div>
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Role Configuration</h3>
                <div className="flex gap-2">
                  <select className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] px-3 py-2 text-sm font-medium text-slate-900 dark:text-white focus:ring-primary focus:border-primary">
                    <option>Employer Admin</option>
                    <option>Super Admin</option>
                    <option>Support Lead</option>
                    <option>Viewer</option>
                  </select>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e2330] p-6 shadow-sm h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">work</span>
                      Employer Admin
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Can manage employer accounts and job posts.</p>
                  </div>
                  <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">Edit Name</button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                  <div>
                    <h5 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider">User Management</h5>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input defaultChecked={true} className="mt-0.5 h-4 w-4 rounded border-slate-200 text-primary focus:ring-primary dark:border-slate-700 dark:bg-white/10" disabled={true} type="checkbox"/>
                        <div className="text-sm">
                          <p className="font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">View Employer List</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Access to read employer data.</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input defaultChecked={true} className="mt-0.5 h-4 w-4 rounded border-slate-200 text-primary focus:ring-primary dark:border-slate-700 dark:bg-white/10" type="checkbox"/>
                        <div className="text-sm">
                          <p className="font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">Approve/Reject Employers</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Perform verification actions.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <h5 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider">Content Management</h5>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input defaultChecked={true} className="mt-0.5 h-4 w-4 rounded border-slate-200 text-primary focus:ring-primary dark:border-slate-700 dark:bg-white/10" type="checkbox"/>
                        <div className="text-sm">
                          <p className="font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">Post Jobs</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Create listings on behalf of employers.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                  <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Reset</button>
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark transition-colors shadow-sm">Save Changes</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}