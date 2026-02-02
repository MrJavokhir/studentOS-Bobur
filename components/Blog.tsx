import React, { useState } from 'react';
import { Screen, NavigationProps } from '../types';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How to Land Your First Internship with Zero Experience",
    excerpt: "Breaking into the industry can be tough. Here are the actionable steps to build a portfolio that gets noticed by recruiters.",
    category: "Career Advice",
    date: "Oct 24, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvz7dRUWxnBfrgID2fjflQzX8j5oeK3RVxV8iyCrm3nekMcQlW6vfAoVYEzU7OFDPgvk1GQPNxBBzpu1GLefMY-BoG1glNmLG7TO1QU8QJesMjU84qfNb91ILUCGzWtUkUbBhsLFaLhscn21l8MjFBpNdICjQE5SrjHM07k9fOJ57WhI4qcOKUTfhDbsinGEf4dx_ZFmFXTtfTF3GjoHhlyeY1jGWm5lotvPv95LDO7MwS_bcc6BoOdC1UF_lG-4OOjrcz9v3G2Yo",
    author: "Sarah Jenkins"
  },
  {
    id: 2,
    title: "Top 5 Notion Templates for Organizing Your Semester",
    excerpt: "Get your assignments, readings, and extracurriculars in order with these free, student-tested templates.",
    category: "Tools",
    date: "Oct 22, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgV3hYolWRZ1xr5fFLIMmJG2woS_W4XsQccYThCQcV1HyMeJGN6TRIFQ9q9ZkCqyQPvKgBN9LfPpX1SWxH7Wjr8klGVht4hKhvkmRmGulC2hUbkLfrvdY0YYHhh_8R8Sv_Q280CbaKLQz3uOdm7RcB_lJ8xTR4WDvZt-5Z7gf0CIEdNBQOgkn0X7XneMIla45HsNC2R7MRH90zpOsCUrMU-OCjFeAsBkXg4WZjlvxRMVw4xpldrxvMJMyf7lU1WX_PUVfL0kYrTKU",
    author: "David Chen"
  },
  {
    id: 3,
    title: "From Average to A+: The Feynman Technique Explained",
    excerpt: "The secret to learning anything faster is to teach it. Here is how to apply Richard Feynman's mental model.",
    category: "Study Tips",
    date: "Oct 18, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANIW3VSnZK6pivlrgcJQ9FU7G42_wE3JhBEDKAo7igNxQXTLcJae5XQpkG0rAZHFXx0X37SeO2OXOohlVdDXkJRhHrRuw4TnHe26Opln2KZaGlVKx0ZKTCiZ3apkEVcxGEqUzCNJgEb-2zSKboKnhfinT1zOhDqFhJ1mkcOYsWD46UxImCjudW7AURFaH4G7rzKIbR7b02iV5ifDyEQFT5ldiLlfc-CkzAIEtS3EOgJejCJqt89LQEtZ-JkYLwndhJAVI5nMRq-9Q",
    author: "Alex Morgan"
  },
  {
    id: 4,
    title: "Interview with a Google PM: Advice for New Grads",
    excerpt: "We sat down with Sarah Jenkins to discuss her journey from a state college to leading product at Google.",
    category: "Success Stories",
    date: "Oct 15, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEPByJMRKS7p9YweEWHCgE35HsrhlT8SUv6GU3bA5cwtpVTCdxn2wec0s3vpEUXe8fRphANHV8EgT05Za4usH8Dn0WvGWoJPdvREB47737N2hErBM8FBuvGL9HwYnsshXQJXa3B8GUCrU5Ah-R4K5lNtyFxYIjN5IfQlcBMYMzejLN42kgxy3i9wxeFlyx6h_Ht91cot4MVe2Fp4JQquKzyXlbWFtClx7Dbm4vNCZ15bOLYvpxAoTphZS-5d9uu8GRBCTb9EIPHl4",
    author: "Maya Ross"
  },
  {
    id: 5,
    title: "Why Multitasking is Killing Your Grades",
    excerpt: "Think you can watch Netflix and study calculus? Science says otherwise. Here is what to do instead.",
    category: "Productivity",
    date: "Oct 10, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqrt6SJ3YXKr1iLdmg306htN_3jJ0SkUw_y8wkE2v5qBfvKDagkh6wJWZRSVJzGDTmE3s1RarLqlv6k8nxWp1xoA0Lh0Sv4Pf29IcgkOpZXGT5653yNYDVgVXtt4NCgTltPqEWGlFarKMPBWocD7zo61a9OFx_fmmDNY92_cy_VosofbG6qEsg6WjU7qS7Y77Pd1Soy4foXaJYVts0EEMt3D1LuUD5v01ttEmX2Xc3qBssyDVdH-eynzCLuYtaykwkLBReVNGrPrY",
    author: "James Wilson"
  },
  {
    id: 6,
    title: "Balancing Social Life and Academics: A Realistic Guide",
    excerpt: "You don't have to sacrifice your weekends to get a 4.0 GPA. It's about scheduling priorities.",
    category: "Student Life",
    date: "Oct 05, 2023",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVMIlINqiC_UZEaHEAn0Oux5Xt3LVszgp-1OgIG3r6pVAzS3dgpOWwo26JWMHOe0JHZRDvamzEVTwBDrj9s-gcGRJqkTFdCeQDFwehqtvwh5Wl80X-MWlz8E80wjCT3EuetlZBvvPDcL-gEiSK2bs1yoXucO-lg_AA2EDNrwQaEG4TbWMKAuynyIfTq8irosdp2KuolSvY5qeXDRMHNqY08XLgGevUak0_aQl-9VNiH6lPiWKNUscziqGDenWRFleU6QJFDt_-ZUs",
    author: "Emily Zhang"
  }
];

export default function Blog({ navigateTo }: NavigationProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Career Advice", "Study Tips", "Productivity", "Success Stories", "Tools", "Student Life"];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.date.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white transition-colors duration-200 pt-20">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Navigation */}
        <header className="fixed top-0 z-50 w-full bg-white/80 dark:bg-[#111421]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20 transition-all duration-200">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
            <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => navigateTo(Screen.LANDING)}>
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">StudentOS</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => navigateTo(Screen.LANDING)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Home</button>
              <button onClick={() => navigateTo(Screen.LANDING)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">About</button>
              <div className="group relative h-full flex items-center">
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-6 focus:outline-none">
                  Tools
                  <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:-rotate-180">keyboard_arrow_down</span>
                </button>
                <div className="mega-menu absolute left-1/2 top-[80%] z-50 w-[640px] -translate-x-1/2 translate-y-2 rounded-2xl border border-white/50 bg-white/90 backdrop-blur-xl p-5 shadow-2xl ring-1 ring-black/5 transition-all duration-300 ease-out invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 dark:bg-[#1e2130]/95 dark:border-slate-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <button onClick={() => navigateTo(Screen.CV_ATS)} className="w-full text-left flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item">
                        <span className="material-symbols-outlined text-primary mt-1 group-hover/item:scale-110 transition-transform">fact_check</span>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">CV & ATS Checker</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Optimize for recruitment algorithms</div>
                        </div>
                      </button>
                      <button onClick={() => navigateTo(Screen.JOBS)} className="w-full text-left flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item">
                        <span className="material-symbols-outlined text-primary mt-1 group-hover/item:scale-110 transition-transform">work_outline</span>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">Job Finder</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Internships & graduate roles</div>
                        </div>
                      </button>
                      <button onClick={() => navigateTo(Screen.PLAGIARISM)} className="w-full text-left flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item">
                        <span className="material-symbols-outlined text-primary mt-1 group-hover/item:scale-110 transition-transform">gavel</span>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">Plagiarism & AI Checker</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Ensure academic integrity</div>
                        </div>
                      </button>
                      <button onClick={() => navigateTo(Screen.PRESENTATION)} className="w-full text-left flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item">
                        <span className="material-symbols-outlined text-primary mt-1 group-hover/item:scale-110 transition-transform">co_present</span>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">Presentation Maker</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Create slides in minutes</div>
                        </div>
                      </button>
                    </div>
                    <div className="space-y-2">
                      <button onClick={() => navigateTo(Screen.SCHOLARSHIPS)} className="w-full text-left flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item">
                        <span className="material-symbols-outlined text-primary mt-1 group-hover/item:scale-110 transition-transform">school</span>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">Scholarship Finder</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Find funding opportunities</div>
                        </div>
                      </button>
                      <button onClick={() => navigateTo(Screen.HABIT_TRACKER)} className="w-full text-left flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item">
                        <span className="material-symbols-outlined text-primary mt-1 group-hover/item:scale-110 transition-transform">check_circle</span>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">Habit Tracker</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Build study routines</div>
                        </div>
                      </button>
                      <button onClick={() => navigateTo(Screen.LEARNING_PLAN)} className="w-full text-left flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item">
                        <span className="material-symbols-outlined text-primary mt-1 group-hover/item:scale-110 transition-transform">route</span>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">Learning Plan Builder</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Customized curriculum paths</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => navigateTo(Screen.COMMUNITY)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Community</button>
              <button onClick={() => navigateTo(Screen.BLOG)} className="text-sm font-bold text-primary">Blog</button>
              <button onClick={() => navigateTo(Screen.CONTACT)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Contact</button>
            </nav>
            <div className="flex items-center justify-end gap-4">
              <button onClick={() => navigateTo(Screen.SIGN_IN)} className="hidden sm:flex text-sm font-medium hover:text-primary transition-colors text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary">Sign In</button>
              <button onClick={() => navigateTo(Screen.SIGNUP_STEP_1)} className="flex items-center justify-center overflow-hidden rounded-xl h-10 px-5 bg-primary dark:bg-primary hover:bg-blue-700 dark:hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95">
                <span className="truncate">Get Started</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center py-8 px-4 md:px-10">
          <div className="w-full max-w-[1024px] flex flex-col gap-10">
            {/* Hero Section: Featured Post */}
            <section className="@container">
              <div className="flex flex-col gap-6 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 p-1 md:flex-row md:items-stretch">
                <div className="w-full md:w-1/2 overflow-hidden rounded-xl relative group min-h-[300px] md:min-h-auto">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAav9q5LsRscRGC0ZO9SOj1e8zqUU1fK6gcRUH4eFEMzVS58hyWABU5NvCVCqPUSq9G56F5yCWkMVa1tqq4uM0CeaLcFV7GBzwTGYdMxkYlpburpgCydW0fwd-mjyJp524TXO3cJ8RXCJ7DppcZl_B7VBfZR2JZmefICcWF33X1UQESaInxPyw48CJyrtI5GDYwMB34siXC8yc4xYH2oovSyvvnGuClH1Y8bWuLe39mQXDub1P80PL7mdhPzVOF3nzqkfPyiCctHes')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                </div>
                <div className="flex flex-col justify-center gap-4 p-5 md:w-1/2 md:p-8">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wide">Study Tips</span>
                    <span className="text-xs text-slate-400 font-medium">5 min read</span>
                  </div>
                  <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-4xl">
                    Mastering the Art of Deep Work: A Student's Guide
                  </h1>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                    Unlock your full academic potential by learning how to focus without distraction in an increasingly noisy world. Learn the techniques used by top performers.
                  </p>
                  <div className="pt-2">
                    <button className="flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-600 transition-colors">
                      Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Search and Filters Bar */}
            <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between sticky top-24 z-40 bg-background-light/95 dark:bg-background-dark/95 py-2 backdrop-blur-sm">
              {/* Chips */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar items-center">
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors border ${
                      activeCategory === category 
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div className="relative w-full md:w-72 shrink-0">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</span>
                <input 
                  className="h-10 w-full rounded-full border-0 bg-white dark:bg-slate-800 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary shadow-sm" 
                  placeholder="Search by title, author, category..." 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </section>

            {/* Blog Grid */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Latest Articles</h2>
                <a className="hidden text-sm font-medium text-primary hover:underline sm:block" href="#">View all posts</a>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map(post => (
                    <article key={post.id} className="group flex flex-col gap-3 cursor-pointer">
                      <div className="overflow-hidden rounded-xl bg-slate-200 aspect-[16/10] relative">
                        <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${post.image}')` }}></div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">{post.category}</span>
                          <span className="text-xs font-medium text-slate-400">{post.date}</span>
                        </div>
                        <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">By {post.author}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <span className="material-symbols-outlined text-3xl text-slate-400">search_off</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    We couldn't find any articles matching your search. Try adjusting your filters or search terms.
                  </p>
                  <button 
                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                    className="mt-6 text-primary font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
              
              {filteredPosts.length > 0 && (
                <div className="flex justify-center mt-6">
                  <button className="px-6 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                    Load More Articles
                  </button>
                </div>
              )}
            </section>

            {/* Newsletter Section */}
            <section className="rounded-2xl bg-slate-900 dark:bg-primary/20 overflow-hidden relative isolate">
              {/* Background Pattern Abstract */}
              <div className="absolute inset-0 -z-10 opacity-20" style={{ backgroundImage: "radial-gradient(#2b7cee 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
              <div className="px-6 py-12 md:px-12 md:py-16 flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="flex flex-col gap-3 max-w-lg text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Join 50,000+ students leveling up their careers.
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base">
                    Get the latest study hacks, career advice, and StudentOS updates delivered straight to your inbox every week.
                  </p>
                </div>
                <div className="w-full max-w-md">
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input className="flex-1 rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary backdrop-blur-sm" placeholder="Enter your email" type="email" />
                    <button className="rounded-lg bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90 transition-colors whitespace-nowrap" type="button">
                      Subscribe
                    </button>
                  </form>
                  <p className="mt-3 text-xs text-slate-500 text-center md:text-left">No spam, unsubscribe anytime.</p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pt-16 pb-8">
          <div className="max-w-[1024px] mx-auto px-4 md:px-10 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="flex flex-col gap-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">StudentOS</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  The all-in-one operating system for your academic life. Organize, study, and succeed with StudentOS.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Platform</h4>
                  <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Features</a>
                  <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Pricing</a>
                  <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Download</a>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Resources</h4>
                  <button onClick={() => navigateTo(Screen.BLOG)} className="text-sm text-slate-500 hover:text-primary transition-colors text-left">Blog</button>
                  <button onClick={() => navigateTo(Screen.COMMUNITY)} className="text-sm text-slate-500 hover:text-primary transition-colors text-left">Community</button>
                  <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Help Center</a>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Company</h4>
                  <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">About Us</a>
                  <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Careers</a>
                  <button onClick={() => navigateTo(Screen.CONTACT)} className="text-sm text-slate-500 hover:text-primary transition-colors text-left">Contact</button>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400">© 2024 StudentOS Inc. All rights reserved.</p>
              <div className="flex gap-4 text-slate-400">
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}