import React, { useState } from 'react';
import { ArchitectureSpec, ArchitectureNode } from '../types';
import { ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface ArchitectureTopologyProps {
  spec: ArchitectureSpec;
  projectTitle: string;
}

export const ArchitectureTopology: React.FC<ArchitectureTopologyProps> = ({ spec, projectTitle }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(spec.nodes[0]?.id || null);

  const selectedNode = spec.nodes.find((n) => n.id === selectedNodeId) || spec.nodes[0];

  // Identify connected edges for selected node
  const incomingEdges = spec.edges.filter((e) => e.to === selectedNodeId);
  const outgoingEdges = spec.edges.filter((e) => e.from === selectedNodeId);

  return (
    <div className="rounded-xl bg-obsidian/90 border border-hairline p-5 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline/80">
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-telemetry animate-pulse" />
          <span className="font-semibold text-slate-200">System Topology & Data Pipeline</span>
        </div>
        <span className="text-[11px] text-slate-500">
          Click any node to inspect data flow
        </span>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        {spec.nodes.map((node, index) => {
          const isSelected = node.id === selectedNodeId;
          const isConnected =
            selectedNodeId !== null &&
            (spec.edges.some((e) => (e.from === selectedNodeId && e.to === node.id) || (e.to === selectedNodeId && e.from === node.id)));

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-surface-active border-cyan-telemetry text-slate-100 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-telemetry'
                  : isConnected
                  ? 'bg-surface-card border-hairline-bright text-slate-200'
                  : 'bg-surface-card/60 border-hairline hover:border-hairline-bright text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-slate-500">0{index + 1}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-hairline text-amber-accent">
                  {node.role}
                </span>
              </div>
              <div className="font-semibold text-slate-200 text-xs mb-1 truncate">{node.label}</div>
              <div className="text-[11px] text-cyan-telemetry/90 font-mono truncate">{node.tech}</div>
            </button>
          );
        })}
      </div>

      {/* Edge Data Flow Pipelines for Selected Node */}
      <div className="p-3.5 rounded-lg bg-surface-card border border-hairline mb-4">
        <div className="flex items-center space-x-1.5 text-slate-300 font-semibold mb-2 text-[11px]">
          <Info className="w-3.5 h-3.5 text-cyan-telemetry" />
          <span>Active Data Pathways for: {selectedNode.label}</span>
        </div>

        <div className="space-y-1.5">
          {incomingEdges.length === 0 && outgoingEdges.length === 0 && (
            <div className="text-slate-500 text-[11px]">Core domain state node.</div>
          )}

          {incomingEdges.map((edge, idx) => {
            const sourceNode = spec.nodes.find((n) => n.id === edge.from);
            return (
              <div key={`in-${idx}`} className="flex items-center space-x-2 text-[11px] text-slate-400">
                <span className="text-amber-accent font-semibold">IN:</span>
                <span className="text-slate-200">{sourceNode?.label}</span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <span className="px-1.5 py-0.2 rounded bg-surface border border-hairline text-cyan-telemetry text-[10px]">
                  {edge.protocol}
                </span>
                <span className="text-slate-400">— {edge.description}</span>
              </div>
            );
          })}

          {outgoingEdges.map((edge, idx) => {
            const destNode = spec.nodes.find((n) => n.id === edge.to);
            return (
              <div key={`out-${idx}`} className="flex items-center space-x-2 text-[11px] text-slate-400">
                <span className="text-cyan-telemetry font-semibold">OUT:</span>
                <span className="text-slate-200">{selectedNode.label}</span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <span className="text-slate-200">{destNode?.label}</span>
                <span className="px-1.5 py-0.2 rounded bg-surface border border-hairline text-amber-accent text-[10px]">
                  {edge.protocol}
                </span>
                <span className="text-slate-400">— {edge.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode.notes && (
        <div className="p-3 rounded-lg bg-surface/50 border border-hairline/60 text-slate-300 text-[11px] leading-relaxed">
          <span className="text-slate-500 font-semibold mr-1">Engineering Notes:</span>
          {selectedNode.notes}
        </div>
      )}
    </div>
  );
};
