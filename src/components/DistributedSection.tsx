import React from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { RateLimiterSim } from './simulations/RateLimiterSim';
import { Cpu, Terminal, Shield, Zap, Database } from 'lucide-react';

interface DistributedSectionProps {
  projects: Project[];
}

export const DistributedSection: React.FC<DistributedSectionProps> = ({ projects }) => {
  const rateLimiterProject = projects.find((p) => p.id === 'distributed-rate-limiter');
  const eventServiceProject = projects.find((p) => p.id === 'event-service-microservice');

  return (
    <section id="distributed" className="scroll-mt-20 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-4 mb-8 border-b border-hairline">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <span className="font-mono text-xs text-cyan-telemetry">02.</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 font-normal">
            Distributed Systems & Core Microservices
          </h2>
        </div>
        <span className="font-mono text-xs text-slate-400">
          Multi-service architectures, partitioned streams, and custom starters
        </span>
      </div>

      {/* Deep-Dive Callout: The Spring Boot Starter Architectural Pattern */}
      <div className="mb-10 p-6 rounded-2xl bg-surface/70 border border-hairline/90 backdrop-blur-sm">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-telemetry uppercase tracking-wider mb-2">
          <Cpu className="w-4 h-4" />
          <span>Core Infrastructure Insight: Custom Spring Boot Starters</span>
        </div>
        <h3 className="font-sans font-semibold text-xl text-slate-100 mb-2">
          Why build an in-process `@RateLimited` starter instead of relying solely on an API gateway?
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed max-w-4xl mb-6 font-sans">
          Centralized API Gateways (like Kong or Nginx) protect the perimeter from external ingress, but they add cross-datacenter network hops and cannot inspect method-level service arguments for internal east-west traffic. By building <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface border border-hairline text-amber-accent">rate-limiter-core</code> as a zero-configuration Spring Boot Starter, any downstream service (<code className="font-mono text-xs text-slate-300">ProductService</code>, <code className="font-mono text-xs text-slate-300">SearchService</code>) gains declarative method interception with atomic Redis counters and asynchronous Kafka audit logging.
        </p>

        {/* 4 Pipeline Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-surface-card border border-hairline">
            <div className="flex items-center space-x-1.5 text-amber-accent font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>@RateLimited AOP</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-snug">
              Declarative annotation intercepting controller & service methods without boilerplate code.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-card border border-hairline">
            <div className="flex items-center space-x-1.5 text-cyan-telemetry font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Redis Counter</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-snug">
              Atomic sliding-window Lua execution ensures thread-safe token decrement across cluster nodes.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-card border border-hairline">
            <div className="flex items-center space-x-1.5 text-lime-signal font-semibold mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Kafka Decoupling</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-snug">
              Writing HTTP 429 breach events to Kafka off-path prevents database connection starvation.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-card border border-hairline">
            <div className="flex items-center space-x-1.5 text-slate-300 font-semibold mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>Auto-Configuration</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-snug">
              Importing the dependency in pom.xml automatically wires repository and aspect beans.
            </p>
          </div>
        </div>
      </div>

      {/* Render Distributed Projects */}
      <div className="space-y-10">
        {rateLimiterProject && (
          <ProjectCard
            project={rateLimiterProject}
            renderInteractiveSlot={<RateLimiterSim />}
          />
        )}

        {eventServiceProject && (
          <ProjectCard project={eventServiceProject} />
        )}
      </div>
    </section>
  );
};
