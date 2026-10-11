import React from 'react';
import { ProductionExperience } from '../types';
import { Briefcase, CheckCircle2, Gauge, Split, ShieldCheck } from 'lucide-react';

interface ExperienceDossierProps {
  experience: ProductionExperience[];
}

export const ExperienceDossier: React.FC<ExperienceDossierProps> = ({ experience }) => {
  return (
    <section id="experience" className="scroll-mt-20 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-4 mb-8 border-b border-hairline">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <span className="font-mono text-xs text-slate-500">05.</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 font-normal">
            Production Experience Dossier
          </h2>
        </div>
        <span className="font-mono text-xs text-slate-400">
          Enterprise career track record, scale handled & reliability invariants
        </span>
      </div>

      <div className="space-y-8">
        {experience.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-surface-card/80 border border-hairline hover:border-hairline-bright transition-all p-6 sm:p-8"
          >
            {/* Header / Role & Tenure */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="font-mono text-xs text-amber-accent font-semibold uppercase tracking-wider block mb-1">
                  {exp.organization}
                </span>
                <h3 className="font-serif text-2xl text-slate-100 font-normal">
                  {exp.role}
                </h3>
              </div>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-surface border border-hairline text-slate-300 self-start sm:self-auto">
                {exp.period}
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-6">
              {exp.summary}
            </p>

            {/* Scale Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {exp.scaleMetrics.map((sm, smIdx) => (
                <div key={smIdx} className="p-3.5 rounded-lg bg-surface/60 border border-hairline">
                  <div className="flex items-center space-x-1.5 font-mono text-xs font-semibold text-cyan-telemetry mb-1">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>{sm.metric}</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400 leading-snug">
                    {sm.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Systems Owned & Key Decisions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-hairline/60 text-xs font-sans">
              <div>
                <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider block mb-2.5 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-signal" />
                  <span>Production Systems Owned</span>
                </span>
                <ul className="space-y-2">
                  {exp.systemsOwned.map((system, sIdx) => (
                    <li key={sIdx} className="flex items-start space-x-2 text-slate-300">
                      <span className="text-amber-accent font-mono font-bold">↳</span>
                      <span className="leading-relaxed">{system}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider block mb-2.5 flex items-center space-x-1.5">
                  <Split className="w-3.5 h-3.5 text-amber-accent" />
                  <span>Key Decisions Made Under Constraints</span>
                </span>
                <ul className="space-y-2">
                  {exp.keyDecisions.map((decision, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2 text-slate-400">
                      <span className="text-cyan-telemetry font-mono font-bold">↳</span>
                      <span className="leading-relaxed">{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
