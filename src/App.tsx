import React from 'react';
import { Terminal, Cpu, ArrowUpRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-100 hairline-grid flex flex-col justify-center items-center p-6">
      <div className="max-w-xl w-full p-8 rounded-xl bg-surface/80 border border-hairline backdrop-blur-md shadow-2xl">
        <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Milestone 0: Online</span>
          </div>
          <span className="font-mono text-xs text-slate-500">v1.0.0-scaffold</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-slate-100 mb-3">
          Manish Sahu
        </h1>
        <p className="font-mono text-xs text-amber-accent mb-4 tracking-wide uppercase">
          Systems & Product Engineer
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
          Scaffolding and design system tokens initialized. Vite, React 19, TypeScript, and Tailwind CSS configured with precision hairline grids and custom typography.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 rounded-lg bg-surface-card border border-hairline flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan-telemetry" />
            <span className="text-slate-300">React 19 + Vite</span>
          </div>
          <div className="p-3 rounded-lg bg-surface-card border border-hairline flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-amber-accent" />
            <span className="text-slate-300">Zero Backend</span>
          </div>
        </div>

        <div className="pt-4 border-t border-hairline flex justify-between items-center text-xs font-mono text-slate-500">
          <span>D:\DEVLOPMENT\Projects\manish-portfolio</span>
          <span className="flex items-center space-x-1 text-slate-400">
            <span>Ready for Milestone 1</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
