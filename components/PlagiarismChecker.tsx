import React, { useState } from 'react';
import { Screen, NavigationProps } from '../types';

export default function PlagiarismChecker({ navigateTo }: NavigationProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-hidden">
      <aside className={`${isSidebarExpanded ? 'w-64' : 'w-20'} bg-card-light dark:bg-card-dark border-r border-gray-200 dark:border-gray-800 flex-shrink-0 flex flex-col justify-between transition-all duration-300 ease-in-out hidden md:flex items-center py-6 relative z-20`}>
        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className="absolute -right-3 top-10 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-text-sub hover:text-primary rounded-full p-1 shadow-md transition-colors z-50 flex items-center justify-center size-6"
        >
          <span className="material-symbols-outlined text-[14px]">{isSidebarExpanded ? 'chevron_left' : 'chevron_right'}</span>
        </button>

        <div className={`flex flex-col ${isSidebarExpanded ? 'items-start px-4' : 'items-center'} gap-8 w-full transition-all duration-300`}>
          <div className={`flex items-center gap-3 w-full ${isSidebarExpanded ? 'justify-start' : 'justify-center'}`} onClick={() => navigateTo(Screen.LANDING)}>
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 cursor-pointer group hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>school</span>
            </div>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isSidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <h1 className="text-lg font-bold leading-none tracking-tight whitespace-nowrap">StudentOS</h1>
              <p className="text-xs text-text-sub font-medium mt-1 whitespace-nowrap">Pro Plan</p>
            </div>
          </div>
          
          <nav className={`flex flex-col ${isSidebarExpanded ? 'items-stretch' : 'items-center'} space-y-2 w-full`}>
             {[
               { screen: Screen.DASHBOARD, icon: 'dashboard', label: 'Dashboard' },
               { screen: Screen.CV_ATS, icon: 'description', label: 'CV and ATS' },
               { screen: Screen.JOBS, icon: 'work', label: 'Job Finder' },
               { screen: Screen.LEARNING_PLAN, icon: 'book_2', label: 'Learning Plan' },
               { screen: Screen.HABIT_TRACKER, icon: 'track_changes', label: 'Habit Tracker' },
               { screen: Screen.SCHOLARSHIPS, icon: 'emoji_events', label: 'Scholarships' },
               { screen: Screen.PRESENTATION, icon: 'co_present', label: 'Presentation Maker' },
               { screen: Screen.PLAGIARISM, icon: 'plagiarism', label: 'Plagiarism Checker' },
             ].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => item.screen && navigateTo(item.screen)}
                  className={`flex items-center ${isSidebarExpanded ? 'gap-3 px-3 py-2.5 w-full' : 'justify-center p-3 size-10'} rounded-lg transition-colors group relative ${item.screen === Screen.PLAGIARISM ? 'bg-primary/10 text-primary' : 'text-text-sub hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-text-main'}`}
                  title={!isSidebarExpanded ? item.label : ''}
                >
                  <span className={`material-symbols-outlined ${item.screen === Screen.PLAGIARISM ? 'icon-filled' : 'group-hover:text-primary'} ${!isSidebarExpanded ? 'text-2xl' : 'text-[20px]'}`}>
                    {item.icon}
                  </span>
                  {isSidebarExpanded && (
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  )}
                  {!isSidebarExpanded && (
                    <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                      {item.label}
                    </span>
                  )}
                </button>
             ))}
          </nav>
        </div>

        <div className={`flex flex-col ${isSidebarExpanded ? 'items-stretch px-4' : 'items-center px-2'} space-y-2 w-full mt-auto`}>
          <button className={`flex items-center ${isSidebarExpanded ? 'gap-3 px-3 py-2.5 w-full' : 'justify-center p-3 size-10'} rounded-lg text-text-sub hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-text-main transition-colors group relative`} title="Settings">
            <span className="material-symbols-outlined group-hover:text-gray-600 dark:group-hover:text-gray-300 text-[20px]">settings</span>
            {isSidebarExpanded && <span className="text-sm font-medium">Settings</span>}
          </button>
          
          <div className={`flex items-center ${isSidebarExpanded ? 'gap-3 px-3 py-2 w-full' : 'justify-center size-10'} rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer`}>
            <div className="size-8 rounded-full bg-gray-200 bg-cover bg-center ring-2 ring-white dark:ring-gray-700 flex-shrink-0" data-alt="User profile picture placeholder" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhG4np0VVE22WojP2CGz7Ch6oi2UbBGvY215GNeJl-qbqiIkvVO0e4VJCR48HYD7zcjJ60KfnEAbHOCeMGlVJwochpZSwqE5sh6rBSYgIsX8LQz5UE6yBSk2CJMQ8HXNzUxgZG2yHaebJYk7QmIl7Z2KUZH1fL8p4S0iaspKV4wNVdgBRvRv1lXYD-NeEM5GHeF11YqbTWAvllHQzT4AqVhoA_CKzfcl5nPMHa4BOHNacdhm-S2FFPGfH8ZhQF4TdbUdOb1vS8lg0')" }}></div>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isSidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                <span className="text-sm font-bold text-text-main dark:text-white truncate">Alex Morgan</span>
                <span className="text-xs text-text-sub truncate">alex@student.edu</span>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-20 px-8 flex items-center justify-between flex-shrink-0 bg-background-light dark:bg-background-dark z-10 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-text-main dark:text-white">Plagiarism & AI Checker</h2>
            <p className="text-sm text-text-sub">Scan documents for originality and AI content.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
              <input className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all shadow-sm" placeholder="Search saved reports..." type="text" />
            </div>
            <button className="relative p-2 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-text-sub hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white dark:border-card-dark"></span>
            </button>
            <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <div className="size-8 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhG4np0VVE22WojP2CGz7Ch6oi2UbBGvY215GNeJl-qbqiIkvVO0e4VJCR48HYD7zcjJ60KfnEAbHOCeMGlVJwochpZSwqE5sh6rBSYgIsX8LQz5UE6yBSk2CJMQ8HXNzUxgZG2yHaebJYk7QmIl7Z2KUZH1fL8p4S0iaspKV4wNVdgBRvRv1lXYD-NeEM5GHeF11YqbTWAvllHQzT4AqVhoA_CKzfcl5nPMHa4BOHNacdhm-S2FFPGfH8ZhQF4TdbUdOb1vS8lg0')" }}></div>
              <span className="material-symbols-outlined text-gray-400">expand_more</span>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[600px]">
              <div className="lg:col-span-2 flex flex-col bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-gray-50/50 dark:bg-gray-800/30">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-gray-200 dark:border-gray-600 text-xs font-medium text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600">
                      <span className="material-symbols-outlined text-[16px]">upload_file</span>
                      Upload File
                    </button>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
                    <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-[18px]">format_bold</span>
                    </button>
                    <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-[18px]">format_italic</span>
                    </button>
                    <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                    </button>
                  </div>
                  <button className="text-xs text-text-sub hover:text-red-500 transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">delete</span> Clear
                  </button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto relative bg-card-light dark:bg-card-dark font-display text-base leading-relaxed text-text-main dark:text-gray-300">
                  <p className="mb-4">
                    The rapid advancement of artificial intelligence has sparked a global debate concerning its implications for the workforce. <span className="bg-red-100 dark:bg-red-900/30 border-b-2 border-red-500/50 pb-0.5" title="84% AI Probability">While proponents argue that AI will automate mundane tasks and free up humans for more creative endeavors, critics worry about widespread job displacement.</span>
                  </p>
                  <p className="mb-4">
                    Historically, technological revolutions have created more jobs than they destroyed. However, the pace of AI development is unprecedented. <span className="bg-yellow-100 dark:bg-yellow-900/30 border-b-2 border-yellow-500/50 pb-0.5" title="Potential Plagiarism Match">According to a recent study by the Future of Work Institute, nearly 40% of current jobs could be affected by automation within the next decade.</span> This statistic highlights the urgent need for educational reform and reskilling programs.
                  </p>
                  <p>
                    Governments and private sectors must collaborate to ensure a smooth transition. <span className="bg-red-100 dark:bg-red-900/30 border-b-2 border-red-500/50 pb-0.5">Implementing policies that support lifelong learning and provide safety nets for displaced workers will be crucial in mitigating the negative social impacts of this technological shift.</span>
                  </p>
                </div>
                <div className="h-16 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 bg-white dark:bg-card-dark">
                  <div className="flex gap-4 text-xs text-text-sub">
                    <span>148 Words</span>
                    <span>982 Characters</span>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[18px]">search_check</span>
                    Rescan Text
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-text-main dark:text-white mb-6">Analysis Results</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30">
                      <div className="flex items-center gap-4">
                        <div className="relative size-12 flex items-center justify-center">
                          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-red-200 dark:text-red-900/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <path className="text-red-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="84, 100" strokeLinecap="round" strokeWidth="3"></path>
                          </svg>
                          <span className="material-symbols-outlined text-red-500 absolute text-lg">smart_toy</span>
                        </div>
                        <div>
                          <p className="text-xs text-red-600 dark:text-red-400 font-medium uppercase tracking-wider">AI Probability</p>
                          <h4 className="text-2xl font-bold text-red-700 dark:text-red-300">84%</h4>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800/30">
                      <div className="flex items-center gap-4">
                        <div className="relative size-12 flex items-center justify-center">
                          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-yellow-200 dark:text-yellow-900/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <path className="text-yellow-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="12, 100" strokeLinecap="round" strokeWidth="3"></path>
                          </svg>
                          <span className="material-symbols-outlined text-yellow-600 absolute text-lg">warning</span>
                        </div>
                        <div>
                          <p className="text-xs text-yellow-700 dark:text-yellow-500 font-medium uppercase tracking-wider">Plagiarism</p>
                          <h4 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">12%</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
                    <h4 className="text-sm font-semibold text-text-main dark:text-white">Detected Issues</h4>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer">
                      <span className="size-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></span>
                      <div>
                        <p className="text-sm font-medium text-text-main dark:text-gray-200">2 Sentences likely AI generated</p>
                        <p className="text-xs text-text-sub mt-0.5">High confidence match with GPT-4 patterns.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer">
                      <span className="size-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0"></span>
                      <div>
                        <p className="text-sm font-medium text-text-main dark:text-gray-200">1 Direct match found</p>
                        <p className="text-xs text-text-sub mt-0.5">Source: Future of Work Institute Report 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-card-dark dark:to-black rounded-xl p-6 text-white relative overflow-hidden group border border-gray-800">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-[100px]">auto_fix_high</span>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-black uppercase tracking-wide">Premium</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">AI Correction & Rewrite</h3>
                    <p className="text-sm text-gray-400 mb-6">Automatically paraphrase AI-detected content and fix plagiarism issues while maintaining your unique voice.</p>
                    <button className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2 font-medium">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      Unlock Rewriter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}