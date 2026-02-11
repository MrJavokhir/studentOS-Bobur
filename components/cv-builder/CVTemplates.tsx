import React from 'react';
import { CVData } from '../../types/cv';

interface TemplateProps {
  data: CVData;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

const fullNameOf = (d: CVData) =>
  `${d.personalInfo.firstName} ${d.personalInfo.lastName}`.trim() || 'Your Name';

const descLines = (text: string) =>
  text
    .split('\n')
    .filter(Boolean)
    .map((l) => l.replace(/^[-•]\s*/, ''));

/* ═══════════════════════════════════════════════════════════════════════════
   1. MODERN TEMPLATE — Two-column, blue accents
   ═══════════════════════════════════════════════════════════════════════════ */

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    languages,
    projects,
    volunteering,
    awards,
    publications,
    customSections,
  } = data;
  const fullName = fullNameOf(data);

  return (
    <div className="w-full h-full bg-white text-black font-sans text-[11px] leading-relaxed">
      {/* Header */}
      <div className="flex gap-6 p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        {personalInfo.photoUrl && (
          <div className="shrink-0">
            <img
              src={personalInfo.photoUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-white/30"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>
          <p className="text-blue-100 font-medium mt-1">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10px] text-blue-100">
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-50 p-5 space-y-5">
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-[9px] font-medium rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">{l.name}</span>
                    <span className="text-[9px] text-slate-500 capitalize">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-800 text-[10px]">{edu.degree}</h3>
                    <p className="text-blue-600 text-[10px]">{edu.school}</p>
                    <p className="text-[9px] text-slate-400">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 pb-1 border-b border-blue-200">
                Awards
              </h2>
              <div className="space-y-2">
                {awards.map((a) => (
                  <div key={a.id}>
                    <h3 className="font-bold text-slate-800 text-[10px]">{a.title}</h3>
                    <p className="text-[9px] text-slate-500">
                      {a.issuer} · {a.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-5 space-y-5">
          {summary && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-2 pb-1 border-b border-slate-200">
                Profile
              </h2>
              <p className="text-slate-600 leading-relaxed">{summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 pb-1 border-b border-slate-200">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-slate-800">{exp.role}</h3>
                        <p className="text-blue-600 font-medium text-[10px]">{exp.company}</p>
                      </div>
                      <span className="text-[9px] text-slate-400 shrink-0">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[10px] leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 pb-1 border-b border-slate-200">
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id}>
                    <h3 className="font-bold text-slate-800">{p.title}</h3>
                    {p.technologies && <p className="text-[9px] text-blue-600">{p.technologies}</p>}
                    <p className="text-slate-600 text-[10px] leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {volunteering.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 pb-1 border-b border-slate-200">
                Volunteering
              </h2>
              <div className="space-y-3">
                {volunteering.map((v) => (
                  <div key={v.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-800">{v.role}</h3>
                        <p className="text-blue-600 text-[10px]">{v.organization}</p>
                      </div>
                      <span className="text-[9px] text-slate-400">
                        {v.startDate} - {v.endDate}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[10px]">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {publications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 pb-1 border-b border-slate-200">
                Publications
              </h2>
              <div className="space-y-2">
                {publications.map((pub) => (
                  <div key={pub.id}>
                    <h3 className="font-bold text-slate-800">{pub.title}</h3>
                    <p className="text-[9px] text-slate-500">
                      {pub.publisher} · {pub.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {customSections.map((cs) => (
            <div key={cs.id}>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 pb-1 border-b border-slate-200">
                {cs.sectionTitle}
              </h2>
              <div className="space-y-2">
                {cs.items.map((item) => (
                  <div key={item.id}>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    {item.subtitle && <p className="text-[9px] text-slate-500">{item.subtitle}</p>}
                    {item.description && (
                      <p className="text-slate-600 text-[10px]">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   2. MINIMALIST TEMPLATE — Single column, B&W
   ═══════════════════════════════════════════════════════════════════════════ */

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    languages,
    projects,
    awards,
    publications,
    volunteering,
    customSections,
  } = data;
  const fullName = fullNameOf(data);

  const SectionH = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-center mb-4">{children}</h2>
  );

  return (
    <div className="w-full h-full bg-white text-black font-serif p-8 text-[11px] leading-relaxed">
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase">{fullName}</h1>
        <p className="text-sm text-slate-600 mt-1 tracking-wide">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-1 mt-3 text-[10px] text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <p className="text-slate-700 text-center italic leading-relaxed max-w-xl mx-auto">
            "{summary}"
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <SectionH>Experience</SectionH>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-slate-200 pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.role}</h3>
                  <span className="text-[9px] text-slate-400">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-slate-600 text-[10px] mb-1">{exp.company}</p>
                <p className="text-slate-600 text-[10px] leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <SectionH>Education</SectionH>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.degree}</span>
                  <span className="text-slate-500">, {edu.school}</span>
                </div>
                <span className="text-[9px] text-slate-400">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <SectionH>Projects</SectionH>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-slate-200 pl-4">
                <h3 className="font-bold">{p.title}</h3>
                {p.technologies && (
                  <p className="text-[9px] text-slate-500 italic">{p.technologies}</p>
                )}
                <p className="text-slate-600 text-[10px]">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {awards.length > 0 && (
        <div className="mb-6">
          <SectionH>Awards</SectionH>
          <div className="space-y-2">
            {awards.map((a) => (
              <div key={a.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{a.title}</span>
                  <span className="text-slate-500"> — {a.issuer}</span>
                </div>
                <span className="text-[9px] text-slate-400">{a.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {publications.length > 0 && (
        <div className="mb-6">
          <SectionH>Publications</SectionH>
          <div className="space-y-2">
            {publications.map((pub) => (
              <div key={pub.id}>
                <span className="font-bold">{pub.title}</span>
                <span className="text-slate-500">
                  {' '}
                  · {pub.publisher} · {pub.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {volunteering.length > 0 && (
        <div className="mb-6">
          <SectionH>Volunteering</SectionH>
          <div className="space-y-3">
            {volunteering.map((v) => (
              <div key={v.id} className="border-l-2 border-slate-200 pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{v.role}</h3>
                  <span className="text-[9px] text-slate-400">
                    {v.startDate} — {v.endDate}
                  </span>
                </div>
                <p className="text-slate-600 text-[10px]">{v.organization}</p>
                <p className="text-slate-600 text-[10px]">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {customSections.map((cs) => (
        <div key={cs.id} className="mb-6">
          <SectionH>{cs.sectionTitle}</SectionH>
          <div className="space-y-2">
            {cs.items.map((item) => (
              <div key={item.id}>
                <span className="font-bold">{item.title}</span>
                {item.subtitle && <span className="text-slate-500"> — {item.subtitle}</span>}
                {item.description && (
                  <p className="text-slate-600 text-[10px]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-8">
        {skills.length > 0 && (
          <div className="flex-1">
            <SectionH>Skills</SectionH>
            <p className="text-center text-slate-600">{skills.join(' • ')}</p>
          </div>
        )}
        {languages.length > 0 && (
          <div className="flex-1">
            <SectionH>Languages</SectionH>
            <p className="text-center text-slate-600">
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   3. PROFESSIONAL TEMPLATE — Traditional layout
   ═══════════════════════════════════════════════════════════════════════════ */

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    languages,
    projects,
    awards,
    volunteering,
    publications,
    customSections,
  } = data;
  const fullName = fullNameOf(data);

  const SH = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-sm font-bold text-slate-800 uppercase mb-2 pb-1 border-b-2 border-slate-200">
      {children}
    </h2>
  );

  return (
    <div className="w-full h-full bg-white text-black font-sans p-6 text-[11px] leading-relaxed">
      <div className="border-b-4 border-slate-800 pb-4 mb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
          {fullName}
        </h1>
        <p className="text-lg text-indigo-600 font-semibold mt-0.5">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-slate-600">
          {personalInfo.email && (
            <span>
              <span className="font-bold">Email:</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span>
              <span className="font-bold">Phone:</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span>
              <span className="font-bold">Location:</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span>
              <span className="font-bold">LinkedIn:</span> {personalInfo.linkedin}
            </span>
          )}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <SH>Professional Summary</SH>
          <p className="text-slate-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <SH>Work Experience</SH>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-[9px] text-slate-500 font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-indigo-600 font-semibold text-[10px] mb-1">{exp.company}</p>
                <ul className="list-disc list-inside text-slate-600 text-[10px] space-y-0.5">
                  {descLines(exp.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <SH>Projects</SH>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id}>
                <h3 className="font-bold text-slate-900">{p.title}</h3>
                {p.technologies && (
                  <p className="text-indigo-600 text-[9px] font-medium">{p.technologies}</p>
                )}
                <p className="text-slate-600 text-[10px]">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {education.length > 0 && (
          <div>
            <SH>Education</SH>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-900 text-[10px]">{edu.degree}</h3>
                  <p className="text-indigo-600 text-[10px]">{edu.school}</p>
                  <p className="text-[9px] text-slate-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          {skills.length > 0 && (
            <div className="mb-4">
              <SH>Technical Skills</SH>
              <div className="flex flex-wrap gap-1">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-medium rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <SH>Languages</SH>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-[10px]">
                    <span className="font-medium text-slate-700">{l.name}</span>
                    <span className="text-slate-500 capitalize">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {awards.length > 0 && (
        <div className="mt-5">
          <SH>Awards & Grants</SH>
          <div className="space-y-2">
            {awards.map((a) => (
              <div key={a.id}>
                <h3 className="font-bold text-slate-900 text-[10px]">{a.title}</h3>
                <p className="text-[9px] text-slate-500">
                  {a.issuer} · {a.date}
                </p>
                {a.description && <p className="text-slate-600 text-[10px]">{a.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {volunteering.length > 0 && (
        <div className="mt-5">
          <SH>Volunteering</SH>
          <div className="space-y-3">
            {volunteering.map((v) => (
              <div key={v.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900">{v.role}</h3>
                  <span className="text-[9px] text-slate-500">
                    {v.startDate} - {v.endDate}
                  </span>
                </div>
                <p className="text-indigo-600 text-[10px]">{v.organization}</p>
                <p className="text-slate-600 text-[10px]">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {publications.length > 0 && (
        <div className="mt-5">
          <SH>Publications</SH>
          <div className="space-y-2">
            {publications.map((pub) => (
              <div key={pub.id}>
                <h3 className="font-bold text-slate-900 text-[10px]">{pub.title}</h3>
                <p className="text-[9px] text-slate-500">
                  {pub.publisher} · {pub.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {customSections.map((cs) => (
        <div key={cs.id} className="mt-5">
          <SH>{cs.sectionTitle}</SH>
          <div className="space-y-2">
            {cs.items.map((item) => (
              <div key={item.id}>
                <h3 className="font-bold text-slate-900 text-[10px]">{item.title}</h3>
                {item.subtitle && <p className="text-[9px] text-slate-500">{item.subtitle}</p>}
                {item.description && (
                  <p className="text-slate-600 text-[10px]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   4. EUROPASS TEMPLATE — EU standard two-column
   ═══════════════════════════════════════════════════════════════════════════ */

export const EuropassTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    languages,
    projects,
    awards,
    volunteering,
    publications,
    customSections,
  } = data;
  const fullName = fullNameOf(data);

  return (
    <div className="w-full h-full bg-white text-black font-sans text-[11px] leading-relaxed flex">
      {/* Left Sidebar — dark blue */}
      <div className="w-[35%] bg-[#1B3A5C] text-white p-5 space-y-5 shrink-0">
        {/* Photo placeholder & name */}
        <div className="text-center pb-4 border-b border-white/20">
          {personalInfo.photoUrl ? (
            <img
              src={personalInfo.photoUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover border-3 border-white/40 mb-3"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto bg-white/10 flex items-center justify-center mb-3">
              <span className="text-3xl text-white/40">👤</span>
            </div>
          )}
          <h1 className="text-lg font-bold">{fullName}</h1>
          <p className="text-blue-200 text-[10px] mt-1">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">
            Contact
          </h2>
          <div className="space-y-1.5 text-[10px]">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <span className="opacity-60">✉</span>
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <span className="opacity-60">☎</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <span className="opacity-60">📍</span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <span className="opacity-60">🔗</span>
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">
              Skills
            </h2>
            <div className="space-y-1.5">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`w-1.5 h-1.5 rounded-full ${dot <= 4 ? 'bg-blue-300' : 'bg-white/20'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px]">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">
              Languages
            </h2>
            <div className="space-y-1.5">
              {languages.map((l) => {
                const levelMap: Record<string, number> = {
                  native: 5,
                  fluent: 4,
                  advanced: 3,
                  intermediate: 2,
                  beginner: 1,
                };
                const level = levelMap[l.proficiency] || 2;
                return (
                  <div key={l.id}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span>{l.name}</span>
                      <span className="text-blue-200 capitalize text-[9px]">{l.proficiency}</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full">
                      <div
                        className="bg-blue-300 h-full rounded-full"
                        style={{ width: `${level * 20}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {awards.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">
              Awards
            </h2>
            <div className="space-y-2">
              {awards.map((a) => (
                <div key={a.id}>
                  <p className="font-semibold text-[10px]">{a.title}</p>
                  <p className="text-[9px] text-blue-200">
                    {a.issuer} · {a.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6 space-y-5">
        {summary && (
          <div>
            <h2 className="text-sm font-bold text-[#1B3A5C] uppercase tracking-wide mb-2 pb-1 border-b-2 border-[#1B3A5C]/20">
              Profile
            </h2>
            <p className="text-slate-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-[#1B3A5C] uppercase tracking-wide mb-3 pb-1 border-b-2 border-[#1B3A5C]/20">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="flex gap-3">
                  <div className="w-20 shrink-0 text-right">
                    <p className="text-[9px] text-slate-500 font-medium">{exp.startDate}</p>
                    <p className="text-[9px] text-slate-500 font-medium">
                      {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <div className="flex-1 border-l-2 border-[#1B3A5C]/20 pl-3">
                    <h3 className="font-bold text-slate-900">{exp.role}</h3>
                    <p className="text-[#1B3A5C] font-medium text-[10px]">{exp.company}</p>
                    <p className="text-slate-600 text-[10px] mt-1 whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-[#1B3A5C] uppercase tracking-wide mb-3 pb-1 border-b-2 border-[#1B3A5C]/20">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex gap-3">
                  <div className="w-20 shrink-0 text-right">
                    <p className="text-[9px] text-slate-500">{edu.startDate}</p>
                    <p className="text-[9px] text-slate-500">{edu.endDate}</p>
                  </div>
                  <div className="flex-1 border-l-2 border-[#1B3A5C]/20 pl-3">
                    <h3 className="font-bold text-slate-900 text-[10px]">{edu.degree}</h3>
                    <p className="text-[#1B3A5C] text-[10px]">{edu.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-[#1B3A5C] uppercase tracking-wide mb-3 pb-1 border-b-2 border-[#1B3A5C]/20">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id}>
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                  {p.technologies && <p className="text-[#1B3A5C] text-[9px]">{p.technologies}</p>}
                  <p className="text-slate-600 text-[10px]">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {volunteering.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-[#1B3A5C] uppercase tracking-wide mb-3 pb-1 border-b-2 border-[#1B3A5C]/20">
              Volunteering
            </h2>
            <div className="space-y-3">
              {volunteering.map((v) => (
                <div key={v.id}>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-slate-900">{v.role}</h3>
                    <span className="text-[9px] text-slate-400">
                      {v.startDate} - {v.endDate}
                    </span>
                  </div>
                  <p className="text-[#1B3A5C] text-[10px]">{v.organization}</p>
                  <p className="text-slate-600 text-[10px]">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {publications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-[#1B3A5C] uppercase tracking-wide mb-3 pb-1 border-b-2 border-[#1B3A5C]/20">
              Publications
            </h2>
            {publications.map((pub) => (
              <div key={pub.id}>
                <h3 className="font-bold text-slate-900 text-[10px]">{pub.title}</h3>
                <p className="text-[9px] text-slate-500">
                  {pub.publisher} · {pub.date}
                </p>
              </div>
            ))}
          </div>
        )}

        {customSections.map((cs) => (
          <div key={cs.id}>
            <h2 className="text-sm font-bold text-[#1B3A5C] uppercase tracking-wide mb-3 pb-1 border-b-2 border-[#1B3A5C]/20">
              {cs.sectionTitle}
            </h2>
            {cs.items.map((item) => (
              <div key={item.id}>
                <h3 className="font-bold text-slate-900 text-[10px]">{item.title}</h3>
                {item.subtitle && <p className="text-[9px] text-slate-500">{item.subtitle}</p>}
                {item.description && (
                  <p className="text-slate-600 text-[10px]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   5. GRANT / ACADEMIC TEMPLATE — Serif, B&W, research-focused
   ═══════════════════════════════════════════════════════════════════════════ */

export const GrantTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    languages,
    projects,
    awards,
    publications,
    volunteering,
    customSections,
  } = data;
  const fullName = fullNameOf(data);

  const SH = ({ children }: { children: React.ReactNode }) => (
    <h2
      className="text-[13px] font-bold text-black uppercase mb-2 pb-1 border-b border-black/30"
      style={{ fontFamily: '"Times New Roman", "Georgia", serif' }}
    >
      {children}
    </h2>
  );

  return (
    <div
      className="w-full h-full bg-white text-black p-8 text-[11px] leading-relaxed"
      style={{ fontFamily: '"Times New Roman", "Georgia", serif' }}
    >
      {/* Header */}
      <div className="text-center mb-5 pb-3 border-b-2 border-black">
        <h1 className="text-2xl font-bold tracking-wide">{fullName}</h1>
        {personalInfo.jobTitle && (
          <p className="text-sm text-slate-700 mt-1">{personalInfo.jobTitle}</p>
        )}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <SH>Research Interests</SH>
          <p className="text-slate-800">{summary}</p>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <SH>Education</SH>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.degree}</span>, {edu.school}
                  {edu.gpa && <span className="text-slate-500"> — GPA: {edu.gpa}</span>}
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {publications.length > 0 && (
        <div className="mb-5">
          <SH>Publications</SH>
          <ol className="list-decimal list-inside space-y-1.5 text-[10px]">
            {publications.map((pub) => (
              <li key={pub.id}>
                <span className="font-bold">{pub.title}</span>. {pub.publisher}, {pub.date}.
                {pub.url && <span className="text-slate-500 text-[9px]"> [{pub.url}]</span>}
              </li>
            ))}
          </ol>
        </div>
      )}

      {awards.length > 0 && (
        <div className="mb-5">
          <SH>Awards & Grants</SH>
          <div className="space-y-1.5">
            {awards.map((a) => (
              <div key={a.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{a.title}</span>
                  {a.issuer && <span>, {a.issuer}</span>}
                </div>
                <span className="text-[10px] text-slate-500">{a.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <SH>Research & Work Experience</SH>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold">{exp.role}</span>, {exp.company}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-slate-700 text-[10px] mt-0.5 whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <SH>Research Projects</SH>
          <div className="space-y-2">
            {projects.map((p) => (
              <div key={p.id}>
                <span className="font-bold">{p.title}</span>
                {p.technologies && <span className="text-slate-500"> ({p.technologies})</span>}
                <p className="text-slate-700 text-[10px]">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-5">
          <SH>Technical Skills</SH>
          <p className="text-slate-800">{skills.join(', ')}</p>
        </div>
      )}
      {languages.length > 0 && (
        <div className="mb-5">
          <SH>Languages</SH>
          <p className="text-slate-800">
            {languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}
          </p>
        </div>
      )}

      {volunteering.length > 0 && (
        <div className="mb-5">
          <SH>Service & Volunteering</SH>
          <div className="space-y-2">
            {volunteering.map((v) => (
              <div key={v.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{v.role}</span>, {v.organization}
                </div>
                <span className="text-[10px] text-slate-500">
                  {v.startDate} – {v.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {customSections.map((cs) => (
        <div key={cs.id} className="mb-5">
          <SH>{cs.sectionTitle}</SH>
          <div className="space-y-1.5">
            {cs.items.map((item) => (
              <div key={item.id}>
                <span className="font-bold">{item.title}</span>
                {item.subtitle && <span className="text-slate-500"> — {item.subtitle}</span>}
                {item.description && (
                  <p className="text-slate-700 text-[10px]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   6. TECH / SOFTWARE TEMPLATE — Modern, skills-first
   ═══════════════════════════════════════════════════════════════════════════ */

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    languages,
    projects,
    awards,
    volunteering,
    publications,
    customSections,
  } = data;
  const fullName = fullNameOf(data);

  return (
    <div className="w-full h-full bg-white text-black font-sans text-[11px] leading-relaxed">
      {/* Dark header */}
      <div className="bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold">{fullName}</h1>
        <p className="text-emerald-400 font-medium mt-1">
          {personalInfo.jobTitle || 'Software Engineer'}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10px] text-slate-300">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {summary && (
          <p className="text-slate-700 leading-relaxed border-l-4 border-emerald-400 pl-3">
            {summary}
          </p>
        )}

        {/* Skills first — highlighted */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-400" />
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] font-medium rounded-md border border-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects second */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-400" />
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{p.title}</h3>
                    {p.url && (
                      <span className="text-[9px] text-emerald-600 font-medium">{p.url}</span>
                    )}
                  </div>
                  {p.technologies && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.technologies.split(',').map((t, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-medium rounded"
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-slate-600 text-[10px] mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-400" />
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-[9px] text-slate-500 font-mono">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-emerald-600 font-medium text-[10px]">{exp.company}</p>
                  <ul className="list-disc list-inside text-slate-600 text-[10px] mt-1 space-y-0.5">
                    {descLines(exp.description).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-400" />
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-900 text-[10px]">{edu.degree}</h3>
                    <p className="text-emerald-600 text-[10px]">{edu.school}</p>
                    <p className="text-[9px] text-slate-500 font-mono">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            {languages.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-400" />
                  Languages
                </h2>
                <div className="space-y-1">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-[10px]">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-slate-500 capitalize">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {awards.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-400" />
                  Awards
                </h2>
                <div className="space-y-1">
                  {awards.map((a) => (
                    <div key={a.id} className="text-[10px]">
                      <span className="font-bold">{a.title}</span> —{' '}
                      <span className="text-slate-500">
                        {a.issuer}, {a.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {volunteering.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-400" />
              Volunteering
            </h2>
            <div className="space-y-2">
              {volunteering.map((v) => (
                <div key={v.id}>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-slate-900">{v.role}</h3>
                    <span className="text-[9px] text-slate-500 font-mono">
                      {v.startDate} — {v.endDate}
                    </span>
                  </div>
                  <p className="text-emerald-600 text-[10px]">{v.organization}</p>
                  <p className="text-slate-600 text-[10px]">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {publications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-400" />
              Publications
            </h2>
            <div className="space-y-1">
              {publications.map((pub) => (
                <div key={pub.id} className="text-[10px]">
                  <span className="font-bold">{pub.title}</span> ·{' '}
                  <span className="text-slate-500">
                    {pub.publisher}, {pub.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {customSections.map((cs) => (
          <div key={cs.id}>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-400" />
              {cs.sectionTitle}
            </h2>
            <div className="space-y-2">
              {cs.items.map((item) => (
                <div key={item.id}>
                  <h3 className="font-bold text-slate-900 text-[10px]">{item.title}</h3>
                  {item.subtitle && <p className="text-[9px] text-slate-500">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-slate-600 text-[10px]">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
