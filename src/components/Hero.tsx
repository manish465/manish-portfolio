import React from 'react';
import { useViewMode } from '../context/ViewModeContext';
import { profileData } from '../data';
import { Terminal, Cpu, ShieldCheck, ArrowRight, Layers, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-hairline/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Active Focus Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-card border border-hairline text-xs font-mono text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-accent animate-pulse" />
          <span className="text-slate-400">Current Focus:</span>
          <span className="text-amber-accent font-medium">Autonomous Browser Substrates & Distributed Sharding</span>
        </div>

        {/* Editorial Headline */}
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-100 font-normal leading-[1.15] tracking-tight mb-6">
            Software engineer who builds systems, browser tooling, and experiments from first principles.
          </h1>

          <p className="text-slate-400 text-base sm:text-lg lg:text-xl font-sans leading-relaxed max-w-3xl mb-8">
            {profileData.thesis}
          </p>

          {/* Mode Switch Affordance Banner */}
          <div className="inline-flex flex-wrap items-center gap-3 p-3 rounded-xl bg-surface/70 border border-hairline/90 backdrop-blur-sm text-xs font-mono mb-12">
            <div className="flex items-center space-x-2 text-slate-300">
              <Layers className="w-4 h-4 text-cyan-telemetry" />
              <span>Current Layer:</span>
              <span className={`font-semibold uppercase tracking-wider ${viewMode === 'architecture' ? 'text-cyan-telemetry' : 'text-amber-accent'}`}>
                {viewMode}
              </span>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-slate-400">
              {viewMode === 'editorial'
                ? 'Narrative & impact overview. Switch to Architecture mode to unpack service topologies.'
                : 'Deconstructed mode active: viewing service topologies, invariants, and trade-offs.'}
            </span>
            <button
              onClick={toggleViewMode}
              className="ml-auto flex items-center space-x-1 text-slate-200 hover:text-amber-accent underline underline-offset-2 transition-colors cursor-pointer"
            >
              <span>Toggle (Space)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 3 Core Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-hairline/60">
          {profileData.corePillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-6 rounded-xl bg-surface-card/60 border border-hairline hover:border-hairline-bright transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-accent">0{idx + 1}.</span>
                {idx === 0 && <Cpu className="w-4 h-4 text-cyan-telemetry group-hover:scale-110 transition-transform" />}
                {idx === 1 && <Terminal className="w-4 h-4 text-amber-accent group-hover:scale-110 transition-transform" />}
                {idx === 2 && <ShieldCheck className="w-4 h-4 text-lime-signal group-hover:scale-110 transition-transform" />}
              </div>
              <h3 className="font-sans font-semibold text-base text-slate-100 mb-1">
                {pillar.title}
              </h3>
              <p className="font-mono text-xs text-slate-400 mb-3">
                {pillar.subtitle}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Current Bets Drawer */}
        <div className="mt-8 p-4 rounded-xl bg-surface/40 border border-hairline/60">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5 uppercase tracking-wider text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-accent" />
              <span>Active Research & Builds</span>
            </span>
            <span className="text-slate-500">Live Status</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {profileData.currentBets.map((bet) => (
              <div
                key={bet.title}
                className="p-3 rounded-lg bg-surface-card border border-hairline/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-medium text-slate-200">{bet.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-hairline text-amber-accent">
                      {bet.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{bet.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
