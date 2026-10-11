import React from 'react';
import { useViewMode } from '../context/ViewModeContext';
import { Layers, BookOpen, FileText, Github, Linkedin, ExternalLink } from 'lucide-react';
import { profileData } from '../data';

export const Header: React.FC = () => {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-obsidian/85 border-b border-hairline/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Telemetry Indicator */}
        <div className="flex items-center space-x-3">
          <a href="#" className="group flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-lime-signal animate-pulse" />
            <span className="font-mono text-sm tracking-wider font-semibold text-slate-100 group-hover:text-amber-accent transition-colors">
              {profileData.name.toUpperCase()}
            </span>
          </a>
          <span className="hidden md:inline-block font-mono text-[11px] text-slate-500 border-l border-hairline pl-3">
            SYS://PORTFOLIO.26
          </span>
        </div>

        {/* Center Quick Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono">
          <a href="#work" className="text-slate-400 hover:text-slate-100 transition-colors">
            <span className="text-amber-accent/80 mr-1">01.</span>Work
          </a>
          <a href="#distributed" className="text-slate-400 hover:text-slate-100 transition-colors">
            <span className="text-cyan-telemetry/80 mr-1">02.</span>Distributed
          </a>
          <a href="#lab" className="text-slate-400 hover:text-slate-100 transition-colors">
            <span className="text-amber-accent/80 mr-1">03.</span>The Lab
          </a>
          <a href="#notes" className="text-slate-400 hover:text-slate-100 transition-colors">
            <span className="text-slate-500 mr-1">04.</span>Notes
          </a>
          <a href="#experience" className="text-slate-400 hover:text-slate-100 transition-colors">
            <span className="text-slate-500 mr-1">05.</span>Experience
          </a>
        </nav>

        {/* Right Controls: Mode Toggle, Resume & Socials */}
        <div className="flex items-center space-x-3">
          {/* Dual-Layer Mode Toggle Switch */}
          <button
            onClick={toggleViewMode}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 cursor-pointer ${
              viewMode === 'architecture'
                ? 'bg-cyan-glow border-cyan-telemetry/60 text-cyan-telemetry shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'bg-surface-card border-hairline hover:border-amber-accent/50 text-slate-300 hover:text-amber-accent'
            }`}
            title="Toggle between Editorial narrative and Deconstructed Architecture topologies (Press Space)"
          >
            {viewMode === 'architecture' ? (
              <>
                <Layers className="w-3.5 h-3.5 text-cyan-telemetry" />
                <span className="hidden sm:inline font-medium">Architecture</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-amber-accent" />
                <span className="hidden sm:inline font-medium">Editorial</span>
              </>
            )}
            <kbd className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded bg-surface border border-hairline text-slate-400">
              Space
            </kbd>
          </button>

          {/* Resume PDF Download */}
          <a
            href={profileData.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-hover border border-hairline text-xs font-mono text-slate-200 hover:text-slate-100 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* External Social Links */}
          <div className="flex items-center space-x-1 border-l border-hairline pl-2">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-surface transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-surface transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
