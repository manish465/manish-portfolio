import React, { useState } from 'react';
import { Project } from '../types';
import { useViewMode } from '../context/ViewModeContext';
import { ArchitectureTopology } from './ArchitectureTopology';
import { Github, ExternalLink, Layers, BookOpen, CheckCircle2, Split, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  renderInteractiveSlot?: React.ReactNode;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, renderInteractiveSlot }) => {
  const { viewMode } = useViewMode();
  // Local card override allows toggling individual cards regardless of global mode
  const [localModeOverride, setLocalModeOverride] = useState<'editorial' | 'architecture' | null>(null);

  const activeMode = localModeOverride !== null ? localModeOverride : viewMode;

  const toggleLocalMode = () => {
    setLocalModeOverride(activeMode === 'editorial' ? 'architecture' : 'editorial');
  };

  return (
    <div className="rounded-2xl bg-surface-card/80 border border-hairline hover:border-hairline-bright transition-all duration-300 overflow-hidden shadow-xl">
      {/* Card Header Bar */}
      <div className="px-6 py-4 border-b border-hairline/80 flex flex-wrap items-center justify-between gap-3 bg-surface/50">
        <div className="flex items-center space-x-2.5">
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-surface border border-hairline text-amber-accent font-medium">
            {project.category}
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-surface border border-hairline text-slate-400">
            {project.status}
          </span>
        </div>

        {/* Local Card Layer Toggle & External Links */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={toggleLocalMode}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
              activeMode === 'architecture'
                ? 'bg-cyan-glow border-cyan-telemetry/50 text-cyan-telemetry'
                : 'bg-surface border-hairline hover:border-amber-accent/50 text-slate-300 hover:text-amber-accent'
            }`}
            title="Toggle between narrative and architecture view for this project"
          >
            {activeMode === 'architecture' ? (
              <>
                <BookOpen className="w-3.5 h-3.5 text-amber-accent" />
                <span className="text-[11px]">View Prose</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-cyan-telemetry" />
                <span className="text-[11px]">Inspect Architecture</span>
              </>
            )}
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-hover border border-hairline text-xs font-mono text-slate-300 hover:text-slate-100 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px]">Source</span>
          </a>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 md:p-8">
        {/* Title & Tagline */}
        <div className="mb-6">
          <h3 className="font-serif text-2xl sm:text-3xl text-slate-100 font-normal tracking-tight mb-2">
            {project.title}
          </h3>
          <p className="font-mono text-xs sm:text-sm text-amber-accent tracking-wide">
            {project.tagline}
          </p>
        </div>

        {/* Dynamic Layer Switch: Editorial vs Architecture */}
        {activeMode === 'editorial' ? (
          /* Editorial Narrative View */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-5 rounded-xl bg-surface/50 border border-hairline/80">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-accent block mb-2">
                  The Problem & Motivation
                </span>
                <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface/50 border border-hairline/80">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-telemetry block mb-2">
                  Engineered Solution
                </span>
                <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Technical Metrics Grid (if defined) */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-3.5 rounded-lg bg-surface/60 border border-hairline"
                  >
                    <div className="font-mono text-base sm:text-lg font-semibold text-slate-100 mb-0.5">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[11px] text-slate-400 truncate">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-surface border border-hairline text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Deconstructed Architecture View */
          <div className="space-y-6">
            {/* Embedded Topology Diagram */}
            <ArchitectureTopology spec={project.architecture} projectTitle={project.title} />

            {/* System Invariants Checklist */}
            <div className="p-5 rounded-xl bg-surface/60 border border-hairline">
              <div className="font-mono text-xs font-semibold text-amber-accent uppercase tracking-wider mb-3 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-accent" />
                <span>System Invariants & Non-Negotiable Guarantees</span>
              </div>
              <ul className="space-y-2 font-mono text-xs text-slate-300">
                {project.architecture.invariants.map((inv, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="text-amber-accent font-bold">↳</span>
                    <span className="leading-relaxed">{inv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architectural Trade-Offs Matrix */}
            {project.architecture.tradeOffs && project.architecture.tradeOffs.length > 0 && (
              <div className="p-5 rounded-xl bg-surface/60 border border-hairline">
                <div className="font-mono text-xs font-semibold text-cyan-telemetry uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <Split className="w-4 h-4 text-cyan-telemetry" />
                  <span>Key Architectural Trade-Offs & Decisions</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  {project.architecture.tradeOffs.map((trade, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-surface border border-hairline/80">
                      <div className="font-semibold text-slate-100 mb-1.5">{trade.decision}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mb-2">
                        <div className="text-slate-300">
                          <span className="text-cyan-telemetry font-semibold">Chosen: </span>
                          {trade.chosen}
                        </div>
                        <div className="text-slate-400">
                          <span className="text-slate-500 font-semibold">Alternative: </span>
                          {trade.alternative}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 leading-relaxed border-t border-hairline/60 pt-2">
                        <span className="text-amber-accent font-medium">Rationale: </span>
                        {trade.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Embedded Interactive Simulation Slot (when passed) */}
        {renderInteractiveSlot && (
          <div className="mt-6 pt-6 border-t border-hairline/80">
            {renderInteractiveSlot}
          </div>
        )}
      </div>
    </div>
  );
};
