import React, { useState } from 'react';
import { Screen, NavigationProps } from '../types';

export default function CVChecker({ navigateTo }: NavigationProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal Info');

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
               { screen: Screen.CV_ATS, icon: 'description', label: 'CV and ATS', active: true },
               { screen: Screen.COVER_LETTER, icon: 'edit_document', label: 'Cover Letter' },
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
                  className={`flex items-center ${isSidebarExpanded ? 'gap-3 px-3 py-2.5 w-full' : 'justify-center p-3 size-10'} rounded-lg transition-colors group relative ${item.active ? 'bg-primary/10 text-primary' : 'text-text-sub hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-text-main'}`}
                  title={!isSidebarExpanded ? item.label : ''}
                >
                  <span className={`material-symbols-outlined ${item.active ? 'icon-filled' : 'group-hover:text-primary'} ${!isSidebarExpanded ? 'text-2xl' : 'text-[20px]'}`}>
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
        <header className="h-16 px-6 border-b border-gray-200 dark:border-gray-800 bg-card-light dark:bg-card-dark flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
              <span className="text-primary material-symbols-outlined">fact_check</span>
              CV Maker & ATS Checker
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">PRO TOOL</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] group-focus-within:text-primary transition-colors">search</span>
              <input className="pl-9 pr-4 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all" placeholder="Search templates..." type="text" />
            </div>
            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>
            <button className="relative p-2 rounded-lg text-text-sub hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white dark:border-card-dark"></span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="text-sm font-medium text-text-main dark:text-white">Export PDF</span>
              <span className="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="w-full lg:w-5/12 xl:w-4/12 bg-card-light dark:bg-card-dark border-r border-gray-200 dark:border-gray-800 flex flex-col z-0">
            <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setActiveTab('Personal Info')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'Personal Info' ? 'text-primary border-primary bg-primary/5' : 'text-text-sub border-transparent hover:text-text-main hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                Personal Info
              </button>
              <button 
                onClick={() => setActiveTab('Experience')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'Experience' ? 'text-primary border-primary bg-primary/5' : 'text-text-sub border-transparent hover:text-text-main hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                Experience
              </button>
              <button 
                onClick={() => setActiveTab('Education')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'Education' ? 'text-primary border-primary bg-primary/5' : 'text-text-sub border-transparent hover:text-text-main hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                Education
              </button>
              <button 
                onClick={() => setActiveTab('Skills')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'Skills' ? 'text-primary border-primary bg-primary/5' : 'text-text-sub border-transparent hover:text-text-main hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                Skills
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-text-main dark:text-white">Contact Details</h2>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">Auto-saved</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-xs font-semibold text-text-sub uppercase">First Name</label>
                    <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-primary focus:ring-primary/20 transition-shadow" type="text" defaultValue="Alex" />
                  </div>
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-xs font-semibold text-text-sub uppercase">Last Name</label>
                    <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-primary focus:ring-primary/20 transition-shadow" type="text" defaultValue="Morgan" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-sub uppercase">Job Title</label>
                  <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-primary focus:ring-primary/20 transition-shadow" type="text" defaultValue="Product Designer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-xs font-semibold text-text-sub uppercase">Email</label>
                    <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-primary focus:ring-primary/20 transition-shadow" type="email" defaultValue="alex.morgan@example.com" />
                  </div>
                  <div className="col-span-1 space-y-1.5">
                    <label className="text-xs font-semibold text-text-sub uppercase">Phone</label>
                    <input className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-primary focus:ring-primary/20 transition-shadow" type="tel" defaultValue="+1 (555) 000-1234" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-sub uppercase flex justify-between">
                    <span>Professional Summary</span>
                    <button className="text-primary hover:text-primary-dark flex items-center gap-1 text-[10px]">
                      <span className="material-symbols-outlined text-[12px]">auto_awesome</span> Generate with AI
                    </button>
                  </label>
                  <textarea className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-primary focus:ring-primary/20 transition-shadow resize-none" rows={4} defaultValue="Product Designer with 4 years of experience in building user-centric digital products. Skilled in Figma, prototyping, and design systems. Proven track record of improving user engagement through data-driven design decisions."></textarea>
                  <p className="text-[10px] text-text-sub text-right">240/500 characters</p>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-text-main dark:text-white">Social Links</h2>
                  <button className="text-primary hover:bg-primary/10 p-1 rounded transition-colors">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-text-sub">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                    </div>
                    <input className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-primary focus:ring-primary/20 transition-shadow" type="text" defaultValue="linkedin.com/in/alexmorgan" />
                    <button className="text-red-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-text-sub">
                      <span className="material-symbols-outlined text-[18px]">language</span>
                    </div>
                    <input className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:border-primary focus:ring-primary/20 transition-shadow" type="text" defaultValue="alex.design" />
                    <button className="text-red-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <span className="text-xs text-text-sub">Last saved: Just now</span>
              <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                Save & Continue
              </button>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-[#0B0D15] relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white dark:bg-card-dark p-1.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-sub hover:text-primary transition-colors" title="Zoom Out">
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="px-2 py-1.5 text-xs font-semibold text-text-main dark:text-white min-w-[3rem] text-center">100%</span>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-sub hover:text-primary transition-colors" title="Zoom In">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 flex justify-center items-start">
              <div className="resume-paper bg-white text-black shadow-xl shrink-0 origin-top transform scale-90 lg:scale-100 transition-transform duration-300">
                <div className="p-12 h-full flex flex-col">
                  <header className="border-b-2 border-gray-800 pb-6 mb-6">
                    <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">Alex Morgan</h1>
                    <p className="text-xl text-gray-600 font-light mt-1">Product Designer</p>
                    <div className="flex gap-4 mt-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">mail</span> alex.morgan@example.com</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">call</span> +1 (555) 000-1234</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> San Francisco, CA</span>
                    </div>
                  </header>
                  <div className="grid grid-cols-3 gap-8 flex-1">
                    <div className="col-span-2 space-y-6">
                      <section>
                        <h3 className="font-bold uppercase tracking-wider text-sm border-b border-gray-300 pb-1 mb-3">Professional Summary</h3>
                        <p className="text-sm leading-relaxed text-gray-700">Product Designer with 4 years of experience in building user-centric digital products. Skilled in Figma, prototyping, and design systems. Proven track record of improving user engagement through data-driven design decisions.</p>
                      </section>
                      <section>
                        <h3 className="font-bold uppercase tracking-wider text-sm border-b border-gray-300 pb-1 mb-3">Experience</h3>
                        <div className="mb-4">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-gray-800">Senior UI Designer</h4>
                            <span className="text-xs text-gray-500">2021 - Present</span>
                          </div>
                          <p className="text-xs font-semibold text-gray-600 mb-2">TechFlow Inc.</p>
                          <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                            <li>Led the redesign of the core mobile application, resulting in a 25% increase in daily active users.</li>
                            <li>Established a comprehensive design system used across 4 different product lines.</li>
                            <li>Mentored junior designers and conducted weekly design critiques.</li>
                          </ul>
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-gray-800">UX Designer</h4>
                            <span className="text-xs text-gray-500">2019 - 2021</span>
                          </div>
                          <p className="text-xs font-semibold text-gray-600 mb-2">Creative Studio</p>
                          <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                            <li>Collaborated with product managers to define user requirements and user flows.</li>
                            <li>Conducted usability testing sessions with over 50 participants.</li>
                          </ul>
                        </div>
                      </section>
                    </div>
                    <div className="col-span-1 space-y-6">
                      <section>
                        <h3 className="font-bold uppercase tracking-wider text-sm border-b border-gray-300 pb-1 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">Figma</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">Adobe XD</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">Prototyping</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">HTML/CSS</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">User Research</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">Wireframing</span>
                        </div>
                      </section>
                      <section>
                        <h3 className="font-bold uppercase tracking-wider text-sm border-b border-gray-300 pb-1 mb-3">Education</h3>
                        <div className="mb-3">
                          <h4 className="font-bold text-gray-800 text-sm">BFA Interaction Design</h4>
                          <p className="text-xs text-gray-600">California College of the Arts</p>
                          <p className="text-xs text-gray-500">2015 - 2019</p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-6 top-6 bottom-6 w-80 bg-white/95 dark:bg-card-dark/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col z-20 transition-transform transform translate-x-0">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  <h3 className="font-bold text-text-main dark:text-white">ATS Score</h3>
                </div>
                <span className="text-xs font-medium text-text-sub bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Job: Product Designer</span>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="relative size-32">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                      <path className="text-primary drop-shadow-[0_0_4px_rgba(45,77,224,0.5)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="87, 100" strokeLinecap="round" strokeWidth="3"></path>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-text-main dark:text-white">87%</span>
                      <span className="text-[10px] text-text-sub font-medium uppercase tracking-wide">Match</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-text-sub mt-3 px-2">Great job! Your resume is highly optimized for this role.</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
                    Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-xs font-medium rounded border border-red-100 dark:border-red-800/30 flex items-center gap-1 group cursor-pointer hover:bg-red-100 transition-colors">
                      Agile <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100">add</span>
                    </span>
                    <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-xs font-medium rounded border border-red-100 dark:border-red-800/30 flex items-center gap-1 group cursor-pointer hover:bg-red-100 transition-colors">
                      Jira <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100">add</span>
                    </span>
                    <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-xs font-medium rounded border border-red-100 dark:border-red-800/30 flex items-center gap-1 group cursor-pointer hover:bg-red-100 transition-colors">
                      Typography <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100">add</span>
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                    Top Matched
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 text-xs font-medium rounded border border-green-100 dark:border-green-800/30">Figma</span>
                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 text-xs font-medium rounded border border-green-100 dark:border-green-800/30">Prototyping</span>
                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 text-xs font-medium rounded border border-green-100 dark:border-green-800/30">Design Systems</span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      AI Suggestions
                    </h4>
                    <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded">PRO</span>
                  </div>
                  <div className="space-y-3 filter blur-[2px] select-none opacity-60">
                    <div className="bg-white dark:bg-card-dark p-2 rounded border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-text-main dark:text-white">Rewrite summary to include "Leadership".</p>
                    </div>
                    <div className="bg-white dark:bg-card-dark p-2 rounded border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-text-main dark:text-white">Quantify results in Experience section.</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-[1px]">
                    <span className="material-symbols-outlined text-primary text-3xl mb-1">lock</span>
                    <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-lg hover:bg-primary-dark transition-colors">
                      Unlock Premium
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg">
                  <span className="material-symbols-outlined text-[20px]">refresh</span> Re-scan Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}