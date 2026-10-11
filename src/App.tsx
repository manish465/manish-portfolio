import React from 'react';
import { ViewModeProvider } from './context/ViewModeContext';
import { useKeyCommand } from './hooks/useKeyCommand';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

const PortfolioShell: React.FC = () => {
  // Activate global keyboard command listener (Space for mode toggle, 1-5 for jumps)
  useKeyCommand();

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 hairline-grid flex flex-col antialiased">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Section Anchors for Navigation Verification */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <section id="work" className="scroll-mt-20">
            <div className="flex items-center space-x-3 pb-4 border-b border-hairline">
              <span className="font-mono text-xs text-amber-accent">01.</span>
              <h2 className="font-serif text-2xl text-slate-100">Featured Systems & Products</h2>
            </div>
            <div className="mt-6 p-8 rounded-xl bg-surface-card/40 border border-hairline/60 text-center font-mono text-xs text-slate-500">
              [Flagship project cards incoming in Milestone 3]
            </div>
          </section>

          <section id="distributed" className="scroll-mt-20">
            <div className="flex items-center space-x-3 pb-4 border-b border-hairline">
              <span className="font-mono text-xs text-cyan-telemetry">02.</span>
              <h2 className="font-serif text-2xl text-slate-100">Distributed Systems & Core Microservices</h2>
            </div>
            <div className="mt-6 p-8 rounded-xl bg-surface-card/40 border border-hairline/60 text-center font-mono text-xs text-slate-500">
              [Distributed Rate Limiter & Starter architecture incoming in Milestone 3]
            </div>
          </section>

          <section id="lab" className="scroll-mt-20">
            <div className="flex items-center space-x-3 pb-4 border-b border-hairline">
              <span className="font-mono text-xs text-amber-accent">03.</span>
              <h2 className="font-serif text-2xl text-slate-100">The Engineering Lab</h2>
            </div>
            <div className="mt-6 p-8 rounded-xl bg-surface-card/40 border border-hairline/60 text-center font-mono text-xs text-slate-500">
              [Lab prototypes & Consistent Hash Ring simulator incoming in Milestone 4 & 5]
            </div>
          </section>

          <section id="notes" className="scroll-mt-20">
            <div className="flex items-center space-x-3 pb-4 border-b border-hairline">
              <span className="font-mono text-xs text-slate-500">04.</span>
              <h2 className="font-serif text-2xl text-slate-100">Engineering Field Notes & Invariants</h2>
            </div>
            <div className="mt-6 p-8 rounded-xl bg-surface-card/40 border border-hairline/60 text-center font-mono text-xs text-slate-500">
              [Obsidian field notes incoming in Milestone 5]
            </div>
          </section>

          <section id="experience" className="scroll-mt-20">
            <div className="flex items-center space-x-3 pb-4 border-b border-hairline">
              <span className="font-mono text-xs text-slate-500">05.</span>
              <h2 className="font-serif text-2xl text-slate-100">Production Experience Dossier</h2>
            </div>
            <div className="mt-6 p-8 rounded-xl bg-surface-card/40 border border-hairline/60 text-center font-mono text-xs text-slate-500">
              [Production career track record incoming in Milestone 6]
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-hairline/80 py-8 text-center text-xs font-mono text-slate-500">
        MANISH SAHU © {new Date().getFullYear()} — ZERO BACKEND / 100% CLIENT-SIDE
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ViewModeProvider>
      <PortfolioShell />
    </ViewModeProvider>
  );
}
