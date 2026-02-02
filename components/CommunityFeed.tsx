import React from 'react';
import { Screen, NavigationProps } from '../types';

export default function CommunityFeed({ navigateTo }: NavigationProps) {
  return (
    <div className="font-display bg-[#F3F4F6] dark:bg-[#111827] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
      <nav className="bg-white dark:bg-[#1F2937] border-b border-[#E5E7EB] dark:border-[#374151] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo(Screen.LANDING)}>
                <div className="text-primary text-3xl">
                  <i className="ph-fill ph-asterisk-simple"></i>
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">StudentOS</span>
              </div>
              <div className="hidden md:block relative w-64">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <i className="ph ph-magnifying-glass text-lg"></i>
                </span>
                <input className="block w-full pl-10 pr-3 py-2 border border-transparent bg-gray-100 dark:bg-gray-800 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-colors dark:text-gray-200" placeholder="Search topics..." type="text" />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigateTo(Screen.LANDING)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium">Home</button>
              <button className="text-gray-900 dark:text-white font-semibold border-b-2 border-gray-900 dark:border-white py-5">Community</button>
              <button onClick={() => navigateTo(Screen.JOBS)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium">Jobs</button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium">Messaging</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <i className="ph-fill ph-bell text-xl"></i>
              </button>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <i className="ph-fill ph-chat-text text-xl"></i>
              </button>
              <img alt="User Avatar" className="h-9 w-9 rounded-full border border-gray-200 dark:border-gray-700 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSZcGJn_R-Fp0-6SpiTSu1FM3gg1xRCjvXYFRsjypcU_qje9i4hnpQYZXb-ngbs15glq9Cb168EQ6XxlXqQ8GOc89LKn23KE3k4HllPn4_ockY8WTdbVq5DHUL6i4BAbCbs3RrE_O7H4LfsU8lm0D6_BTkAa-cBGE2zAaKkM_WhakY0gCeJ99qZbsyBJsNjRdBkWmKZr5gKjYo8u1RUmDMAhiRNXmXfYF4krY9qUh1VWfWeR_Vj5U85CCn47TzLOFEoewLr5IHpjs" />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-sm border border-[#E5E7EB] dark:border-[#374151] text-center">
              <div className="flex justify-center mb-3">
                <div className="relative">
                  <img alt="Alex Chen" className="h-20 w-20 rounded-full object-cover ring-4 ring-gray-50 dark:ring-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDncyXKvJOYub-RlH3HtEZCLXN5vpMNYbO5SerQB6J7HkoF1LPOu1HssuiHJqZLdoM7J8ENHt_5zQK-2wpjvKZKR98WltElGHsE4qPU6s9iHuxbqfXT_4CnMjsNGJ1jD6wVDi2jQ_X3itsAYcNBMwHTDGtocRyQoED1BDGpaDkMdyJtTbDO3679QfS_cyHna66_xjuJBj9yHV8_DiqDZeYu0JPU0fSN4oT9k-zK9GYeKojCNkyZxLmAlR925OHYIa3WfiamuesEtV8" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Alex Chen</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Computer Science, Year 3</p>
              <div className="flex justify-center gap-2 mb-2">
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-primary font-bold text-xl">42</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wide">Posts</div>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-primary font-bold text-xl">1.2k</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wide">Karma</div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <a className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-primary font-medium rounded-lg" href="#">
                <i className="ph-fill ph-house text-xl"></i>
                My Feed
              </a>
              <a className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" href="#">
                <i className="ph-fill ph-fire text-xl"></i>
                Popular
              </a>
              <a className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" href="#">
                <i className="ph-fill ph-bookmark-simple text-xl"></i>
                Bookmarks
              </a>
              <a className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" href="#">
                <i className="ph-fill ph-calendar-blank text-xl"></i>
                Upcoming Events
              </a>
              <a className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" href="#">
                <i className="ph-fill ph-users-three text-xl"></i>
                Study Groups
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <div className="flex gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                  <img alt="Me" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJi38MiHZgB2Fi9c0anDbH2MJZZT9oM1NSfiHT0hpn5LwmN3xdZ4uaTDgSB6aQVJrwhLH0kjlcPn__6XeKdDPqJjmrKHaO0PNplSa8gnQJYSNdjtQd5H3j0zw0SnkZ7o-aVtv7Kh5c3EHtUy6PFdhiglSNY0TFa2Yol9b-GOXrd95YjQ7-B0r5om6m9WXCBkNbudlzgbAb8gWdMxbvT-rywz-_hI_YC046X7oA99Rj0uikXJoERqAsSOpVNZVGoVROxauqgUasXzY" />
                </div>
                <input className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-lg px-4 focus:ring-1 focus:ring-primary dark:text-white placeholder-gray-500" placeholder="Start a post or discussion..." type="text" />
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <i className="ph-fill ph-image text-blue-500"></i> Media
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <i className="ph-fill ph-chart-bar text-indigo-500"></i> Poll
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <i className="ph-fill ph-link text-gray-500"></i> Link
                  </button>
                </div>
                <button className="bg-primary hover:bg-blue-700 text-white px-6 py-1.5 rounded-lg font-medium text-sm transition-colors">Post</button>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 sm:p-5 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3">
                  <img alt="Sarah Miller" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdegsR36m5RmVnKENAmXk7j-YTJDgJ26p4vRBjNldEm_uk63djIRXpp114upv484vdYerJ-9EOJgO_EW5ND_UqNvltU8zmaodZJPM9OvzwShwPEn6HXqA_5vUMCceEwzuMNza3rJNSTaBvslTWjJIVpy35euMJV0pEwPtr-q-GIWAeii4MYf05w1Cwv0Zq0JGzUO05WK9IFHpcpMqBAWv9IkOm-JLe9zpzhIUbOp7QTRGQya63n-_mDOfH4v3yLc0_hBOPDhcIank" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">Sarah Miller</h3>
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Alumni</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Product Designer @ Stripe • 2h ago</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <i className="ph-bold ph-dots-three text-2xl"></i>
                </button>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Resume Review for FAANG Internships?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                  Looking for critical feedback on my resume before applying to summer roles. Specifically targeting Product Design roles. Be as harsh as possible! 😅
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">#CareerAdvice</span>
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">#Design</span>
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">#ResumeReview</span>
                </div>
                <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden group bg-gray-200 dark:bg-gray-700">
                  <img alt="Resume Preview" className="w-full h-full object-cover blur-[2px] opacity-80 group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuYIKLgE9O8mKmCGoiQyivabMawvyEHPi6qRcyc5IVdAm7QLwhKznmajJzUbkuXE14K3wW8Gy5LPbGAAjos2PpjqgoxZiSHBDspL7YZ13ldITQ44tC6QlP7a_uozeRYU4pjE8XWd8xZceX08mmj_dwuUw9m22P27rkHdKAZMQgsIoU7VtJ1jKlfqMOzqgMIMKa9MnJbKyf0hYc8qBgaY8dbMYSakg5rtBfVmmeK35DdEPaiC4vWH5jjYJg84AIzn_6FxuPB2rFSvw" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                    <div className="flex items-center gap-3 w-full">
                      <div className="h-10 w-10 bg-red-500 rounded flex items-center justify-center text-white shrink-0">
                        <i className="ph-fill ph-file-pdf text-xl"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">Sarah_Miller_Resume_2024.pdf</p>
                        <p className="text-gray-300 text-xs">2.4 MB</p>
                      </div>
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="flex gap-6">
                  <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1">
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                      <i className="ph-bold ph-arrow-up"></i>
                    </button>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">142</span>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors">
                      <i className="ph-bold ph-arrow-down"></i>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium">
                    <i className="ph-fill ph-chat-circle text-lg"></i> 28
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium">
                  <i className="ph-fill ph-share-network text-lg"></i> Share
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 sm:p-5 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3">
                  <img alt="James Kim" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJixCUgz9sJGzmvxk1Fct-b7cQGeSIyEDexXXM8Q2FeedYDn-OiPRePZSPb7UqrfrergtsWMFPW4TYgjSUbXjfO1ahv0Aa99JcOSME3Y5EgsvSrI_bVP69n7d954SD3FNOz1THf5LiiP8ISSRNuS390RKpJm9vWVb7ZFsDjY8NkJQrMIN3IdwM0ism6KJspSlykA17AWY-1VEMdOko91nM9Wimfjx0xWNJ84o5X_QIQJ-BJbtqbUD-Y4T9CC1QQSfr0_jgo8v0Plk" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">James Kim</h3>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Student</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Research Assistant • 4h ago</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <i className="ph-bold ph-dots-three text-2xl"></i>
                </button>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Best citation manager for thesis?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Starting my final year project and need to get organized. What's the industry standard right now?
                </p>
                <div className="space-y-3">
                  <div className="relative h-10 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group border border-gray-100 dark:border-gray-700">
                    <div className="absolute top-0 left-0 bottom-0 bg-blue-100 dark:bg-blue-900/40 w-[62%] transition-all duration-1000"></div>
                    <div className="absolute inset-0 flex justify-between items-center px-4">
                      <span className="font-medium text-sm text-gray-900 dark:text-white z-10">Zotero</span>
                      <span className="font-bold text-sm text-primary z-10">62%</span>
                    </div>
                  </div>
                  <div className="relative h-10 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group border border-gray-100 dark:border-gray-700">
                    <div className="absolute top-0 left-0 bottom-0 bg-indigo-100 dark:bg-indigo-900/40 w-[28%] transition-all duration-1000"></div>
                    <div className="absolute inset-0 flex justify-between items-center px-4">
                      <span className="font-medium text-sm text-gray-900 dark:text-white z-10">Mendeley</span>
                      <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400 z-10">28%</span>
                    </div>
                  </div>
                  <div className="relative h-10 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group border border-gray-100 dark:border-gray-700">
                    <div className="absolute top-0 left-0 bottom-0 bg-gray-200 dark:bg-gray-700 w-[10%] transition-all duration-1000"></div>
                    <div className="absolute inset-0 flex justify-between items-center px-4">
                      <span className="font-medium text-sm text-gray-900 dark:text-white z-10">EndNote</span>
                      <span className="font-bold text-sm text-gray-600 dark:text-gray-400 z-10">10%</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">342 votes • 1 day left</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="flex gap-6">
                  <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1">
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"><i className="ph-bold ph-arrow-up"></i></button>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">86</span>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"><i className="ph-bold ph-arrow-down"></i></button>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium">
                    <i className="ph-fill ph-chat-circle text-lg"></i> 54
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium">
                  <i className="ph-fill ph-share-network text-lg"></i> Share
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 sm:p-5 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3">
                  <img alt="Mike Thomas" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqSQjZxwsYHGFjjcvGV1vwQsWydU6_QejgytEcA_hPOXIb3JAXiYsGvk19-3nwISatYZRdjpMCjlo6Sn0m_wTcXVXMKNM5fr-uA9zdeaNAeGaxQkp8Te5tt98tBZEr5ZfDqUZeua7l7-E0cwIWr3p881ZRin1XSddNxcBRadqhNRlcw6K0zfXWdFR0T677JaV-O-6w8uMtVrt1qq1A87zOyxfHAb-FnPNX50cGg4-4kSKj2q-UusFYSL6O3HkJz9hYCQ3ewckewNE" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">Mike Thomas</h3>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Recruiter</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Talent Acquisition @ Google • 6h ago</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <i className="ph-bold ph-dots-three text-2xl"></i>
                </button>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Productivity Hack: The Pomodoro Technique 🍅</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                  Struggling to focus? I've been using this simple timer method to power through my candidate reviews. Work 25 mins, break 5 mins. Repeat. It's life changing for deep work.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">#Productivity</span>
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">#StudyTips</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="flex gap-6">
                  <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1">
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"><i className="ph-bold ph-arrow-up"></i></button>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">412</span>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"><i className="ph-bold ph-arrow-down"></i></button>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium">
                    <i className="ph-fill ph-chat-circle text-lg"></i> 12
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium">
                  <i className="ph-fill ph-share-network text-lg"></i> Share
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-5 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Trending Today</h3>
                <a className="text-primary text-xs font-bold hover:underline" href="#">View all</a>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1 mb-0.5">
                    <span>Technology</span>
                    <span>•</span>
                    <span>Trending</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors">#SummerInternships</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">12.5k posts</p>
                </div>
                <div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1 mb-0.5">
                    <span>Academic</span>
                    <span>•</span>
                    <span>Trending</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors">#CS101</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">4.2k posts</p>
                </div>
                <div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1 mb-0.5">
                    <span>Wellness</span>
                    <span>•</span>
                    <span>Trending</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white hover:text-primary cursor-pointer transition-colors">#MentalHealth</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">8.1k posts</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-5 shadow-sm border border-[#E5E7EB] dark:border-[#374151]">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-4">Who to follow</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img alt="Alice" className="h-9 w-9 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOXkjng64JWyXaXILcw1a9grKKmidK1hUb4S1xqt8Tt0Jaj1xXct0Kd_amvOHM9ewBz4vBFrBd0taAcKmcb7drCL6kDPEbPYTpCjAVgeo0sdVYfNVqnrdmtQiCQld43Nwa6UOTz9krNqN1ssKMJGrjy-B_zg9xo18I5qDRVukhdZIgu6OPjZ3lxZp95oE7FpLxbvXjXGsBzyxqbbU-PUktzc4AjsiFUUPgbwaFgP9feSfRF2H8Yyp5GBuLhLtmddE-W9b0luAncqo" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">Alice Wang</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-24">Data Science @ MIT</p>
                    </div>
                  </div>
                  <button className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <i className="ph-bold ph-plus"></i>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img alt="David" className="h-9 w-9 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVlcBR05jXJz8oSDcK2dzyca8sXIFLrFRuGMb0CHxZBFsTYHs6Vqp1ZmM1qkjdd798vnOktkfh9a-GnMC9cbL6oxqLuKxjTu1C4sUcNeQPCBCLPPRtkoU7gSTH8bFdZkqrWPGBcbvf-kOj0dLRCKZ1R5aJIMqSycUbtz9ACqSrEYNa7_mMiGWGEIduPMPT_9ensu8iMhLuiSxaWzH9lZNXn9daIco5e5DpRkRApVZYOkI7mGwZgQBe2STKokqOZ7O3KGPJhS9htaI" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">David Chen</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-24">SWE Intern @ Meta</p>
                    </div>
                  </div>
                  <button className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <i className="ph-bold ph-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center gap-2 mb-3 text-primary dark:text-blue-400">
                <i className="ph-fill ph-shield-check text-xl"></i>
                <h3 className="font-bold text-sm">Community Rules</h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <span className="text-blue-400">•</span>
                  Be respectful and constructive.
                </li>
                <li className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <span className="text-blue-400">•</span>
                  No spam or self-promotion.
                </li>
                <li className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <span className="text-blue-400">•</span>
                  Keep it professional.
                </li>
              </ul>
              <a className="text-primary text-xs font-bold hover:underline" href="#">Read full guidelines</a>
            </div>
            <div className="px-2">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 dark:text-gray-500">
                <button onClick={() => navigateTo(Screen.ABOUT)} className="hover:underline">About</button>
                <a className="hover:underline" href="#">Accessibility</a>
                <a className="hover:underline" href="#">Help Center</a>
                <a className="hover:underline" href="#">Privacy & Terms</a>
                <span>StudentOS © 2024</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}