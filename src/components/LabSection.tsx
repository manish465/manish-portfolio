import React from 'react';
import { LabExperiment } from '../types';
import { HashRingSim } from './simulations/HashRingSim';
import { FlaskConical, Beaker, GitPullRequest, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';

interface LabSectionProps {
  experiments: LabExperiment[];
}

export const LabSection: React.FC<LabSectionProps> = ({ experiments }) => {
  return (
    <section id="lab" className="scroll-mt-20 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-4 mb-8 border-b border-hairline">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <span className="font-mono text-xs text-amber-accent">03.</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 font-normal">
            The Engineering Lab
          </h2>
        </div>
        <span className="font-mono text-xs text-slate-400">
          Unfinished systems, low-level algorithms & first-principles inquiries
        </span>
      </div>

      {/* Lab Manifesto Banner */}
      <div className="mb-10 p-5 rounded-2xl bg-surface/60 border border-hairline/80 backdrop-blur-sm flex items-start space-x-3.5">
        <FlaskConical className="w-5 h-5 text-amber-accent shrink-0 mt-0.5" />
        <div className="text-xs font-sans text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-100 font-mono uppercase text-[11px] block mb-1">
            Laboratory Policy: Radical Transparency
          </span>
          I build these projects because I want to understand how complex systems operate under the hood—not to present them as finished enterprise software. Each prototype below lists its core hypothesis, current completion status, and what was learned from testing it.
        </div>
      </div>

      {/* Lab Experiments List */}
      <div className="space-y-8">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className="rounded-2xl bg-surface-card/80 border border-hairline hover:border-hairline-bright transition-all p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center space-x-2">
                <Beaker className="w-4 h-4 text-amber-accent" />
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-surface border border-hairline text-amber-accent font-medium">
                  {exp.status}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {exp.completionPct}% Complete
                </span>
              </div>

              <a
                href={exp.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs font-mono text-slate-400 hover:text-slate-100 transition-colors"
              >
                <span>View Lab Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Title & Progress Bar */}
            <div className="mb-4">
              <h3 className="font-serif text-2xl text-slate-100 font-normal mb-2">
                {exp.title}
              </h3>
              <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-accent transition-all duration-500"
                  style={{ width: `${exp.completionPct}%` }}
                />
              </div>
            </div>

            {/* Hypothesis & Key Takeaway */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-xs font-sans">
              <div className="p-4 rounded-xl bg-surface/50 border border-hairline/80">
                <span className="font-mono text-[11px] font-semibold text-cyan-telemetry uppercase tracking-wider block mb-1.5">
                  The Core Hypothesis
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {exp.hypothesis}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface/50 border border-hairline/80">
                <span className="font-mono text-[11px] font-semibold text-amber-accent uppercase tracking-wider block mb-1.5">
                  Engineering Takeaway
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {exp.keyTakeaway}
                </p>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-surface border border-hairline text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Embedded Hash Ring Sim for Adaptive Shard Manager */}
            {exp.hasInteractiveSim === 'hash-ring' && (
              <div className="mt-6 pt-6 border-t border-hairline">
                <HashRingSim />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
