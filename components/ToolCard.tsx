import React from 'react';

type ToolType = 'cv' | 'job' | 'scholarship' | 'presentation' | 'plagiarism';

interface ToolCardProps {
  type: ToolType;
  title: string;
  subtitle: string;
  color: string;
}

export default function ToolCard({ type, title, subtitle, color }: ToolCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-4 w-64 h-auto transform transition-transform hover:scale-105">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} bg-opacity-10`}
        >
          {type === 'cv' && <span className="text-xl">📄</span>}
          {type === 'job' && <span className="text-xl">💼</span>}
          {type === 'scholarship' && <span className="text-xl">🎓</span>}
          {type === 'presentation' && <span className="text-xl">📊</span>}
          {type === 'plagiarism' && <span className="text-xl">🔍</span>}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      {/* Mock Content */}
      <div className="space-y-2">
        {type === 'cv' && (
          <div className="space-y-1.5 opacity-60">
            <div className="h-2 bg-slate-200 rounded w-3/4"></div>
            <div className="h-2 bg-slate-200 rounded w-full"></div>
            <div className="h-2 bg-slate-200 rounded w-5/6"></div>
            <div className="mt-2 flex gap-2">
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                ATS: 95%
              </span>
            </div>
          </div>
        )}

        {type === 'job' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full"></div>
              <div className="h-2 bg-slate-200 rounded w-20"></div>
            </div>
            <div className="h-16 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center">
              <span className="text-xs font-medium text-slate-400">Job Match</span>
            </div>
          </div>
        )}

        {type === 'scholarship' && (
          <div className="text-center py-2 bg-yellow-50 rounded-lg border border-yellow-100">
            <span className="text-2xl">🏆</span>
            <p className="text-sm font-bold text-yellow-700 mt-1">$5,000 Grant</p>
            <p className="text-[10px] text-yellow-600">Applied Successfully</p>
          </div>
        )}

        {type === 'presentation' && (
          <div className="grid grid-cols-2 gap-1.5">
            <div className="aspect-video bg-indigo-50 rounded border border-indigo-100"></div>
            <div className="aspect-video bg-slate-50 rounded border border-slate-100"></div>
            <div className="col-span-2 h-2 bg-slate-100 rounded w-1/2 mx-auto mt-1"></div>
          </div>
        )}

        {type === 'plagiarism' && (
          <div className="flex flex-col items-center py-1">
            <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center mb-1">
              <span className="text-xs font-bold text-green-600">100%</span>
            </div>
            <span className="text-[10px] text-slate-400">Original Content</span>
          </div>
        )}
      </div>
    </div>
  );
}
