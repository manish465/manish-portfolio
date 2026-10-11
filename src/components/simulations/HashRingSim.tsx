import React, { useState } from 'react';
import { PlusCircle, MinusCircle, RotateCcw, Database, ShieldAlert, Cpu } from 'lucide-react';

interface ShardNode {
  id: string;
  name: string;
  angle: number; // 0 - 360 degrees
  color: string;
}

interface CacheKey {
  id: string;
  label: string;
  angle: number;
}

const INITIAL_NODES: ShardNode[] = [
  { id: 'node-a', name: 'Shard Alpha (8001)', angle: 45, color: '#06B6D4' },
  { id: 'node-b', name: 'Shard Beta (8002)', angle: 165, color: '#F59E0B' },
  { id: 'node-c', name: 'Shard Gamma (8003)', angle: 285, color: '#84CC16' },
];

const SAMPLE_KEYS: CacheKey[] = [
  { id: 'k1', label: 'user:101', angle: 20 },
  { id: 'k2', label: 'order:902', angle: 70 },
  { id: 'k3', label: 'cart:441', angle: 110 },
  { id: 'k4', label: 'session:33', angle: 150 },
  { id: 'k5', label: 'product:88', angle: 200 },
  { id: 'k6', label: 'user:409', angle: 240 },
  { id: 'k7', label: 'payment:12', angle: 270 },
  { id: 'k8', label: 'order:303', angle: 310 },
  { id: 'k9', label: 'inventory:5', angle: 345 },
];

export const HashRingSim: React.FC = () => {
  const [nodes, setNodes] = useState<ShardNode[]>(INITIAL_NODES);
  const [hasNodeD, setHasNodeD] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string>('Cluster initialized with 3 shards.');

  // Find the target node for a given key on the clockwise ring
  const getAssignedNode = (keyAngle: number): ShardNode => {
    // Sort nodes by angle
    const sorted = [...nodes].sort((a, b) => a.angle - b.angle);
    // Find first node with angle >= keyAngle
    const target = sorted.find((n) => n.angle >= keyAngle);
    // If none found, wrap around to the first node (clockwise wrap)
    return target || sorted[0];
  };

  const handleAddNodeD = () => {
    if (hasNodeD) return;
    const newNode: ShardNode = {
      id: 'node-d',
      name: 'Shard Delta (8004)',
      angle: 220,
      color: '#EC4899', // Pink
    };
    setNodes((prev) => [...prev, newNode]);
    setHasNodeD(true);
    setLastAction('Added Shard Delta at 220°. Notice: Only keys between 165° and 220° migrate to Delta; all other keys remain unaffected.');
  };

  const handleRemoveNodeB = () => {
    const remaining = nodes.filter((n) => n.id !== 'node-b');
    setNodes(remaining);
    setLastAction('Simulated node failure on Shard Beta (165°). Its keys automatically fall forward to Shard Gamma (or Delta) without dropping the whole ring.');
  };

  const handleReset = () => {
    setNodes(INITIAL_NODES);
    setHasNodeD(false);
    setLastAction('Reset cluster to initial 3-node topology.');
  };

  // Calculate key distribution counts
  const distribution: Record<string, number> = {};
  nodes.forEach((n) => (distribution[n.id] = 0));
  SAMPLE_KEYS.forEach((k) => {
    const assigned = getAssignedNode(k.angle);
    if (assigned) {
      distribution[assigned.id] = (distribution[assigned.id] || 0) + 1;
    }
  });

  // SVG parameters
  const size = 260;
  const center = size / 2;
  const radius = 95;

  return (
    <div className="rounded-xl bg-obsidian border border-hairline p-5 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline/80">
        <div className="flex items-center space-x-2 text-slate-200">
          <Cpu className="w-4 h-4 text-cyan-telemetry" />
          <span className="font-semibold">Interactive Consistent Hash Ring Simulator (MD5 Topology)</span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded bg-surface border border-hairline text-amber-accent">
          K/N Shard Migration
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Ring Graphic */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-card border border-hairline">
          <svg width={size} height={size} className="overflow-visible">
            {/* The Outer Hash Ring Circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#1F2637"
              strokeWidth="4"
              strokeDasharray="4 4"
            />

            {/* Keys on the ring */}
            {SAMPLE_KEYS.map((key) => {
              const rad = (key.angle * Math.PI) / 180;
              const kx = center + radius * Math.cos(rad);
              const ky = center + radius * Math.sin(rad);
              const assigned = getAssignedNode(key.angle);

              return (
                <g key={key.id}>
                  <circle
                    cx={kx}
                    cy={ky}
                    r={4}
                    fill={assigned?.color || '#94A3B8'}
                    stroke="#0B0D13"
                    strokeWidth="1.5"
                  />
                  <text
                    x={kx + (kx > center ? 7 : -7)}
                    y={ky + 3}
                    textAnchor={kx > center ? 'start' : 'end'}
                    fill="#94A3B8"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {key.label}
                  </text>
                </g>
              );
            })}

            {/* Shard Nodes on the ring */}
            {nodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const nx = center + radius * Math.cos(rad);
              const ny = center + radius * Math.sin(rad);

              return (
                <g key={node.id}>
                  {/* Outer pulse circle */}
                  <circle cx={nx} cy={ny} r={12} fill={node.color} fillOpacity="0.2" />
                  <circle cx={nx} cy={ny} r={7} fill={node.color} stroke="#0B0D13" strokeWidth="2" />
                  <text
                    x={nx + (nx > center ? 14 : -14)}
                    y={ny + 4}
                    textAnchor={nx > center ? 'start' : 'end'}
                    fill={node.color}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}

            {/* Center HUD */}
            <text x={center} y={center - 5} textAnchor="middle" fill="#64748B" fontSize="10">
              HASH RING
            </text>
            <text x={center} y={center + 12} textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="bold">
              {nodes.length} Active Nodes
            </text>
          </svg>
        </div>

        {/* Controls & Live Shard Distribution */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-surface-card border border-hairline">
            <div className="text-[11px] font-semibold text-slate-300 mb-2.5">Cluster Distribution</div>
            <div className="space-y-2">
              {nodes.map((node) => {
                const count = distribution[node.id] || 0;
                const pct = Math.round((count / SAMPLE_KEYS.length) * 100);
                return (
                  <div key={node.id} className="text-[11px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center space-x-1.5" style={{ color: node.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
                        <span>{node.name}</span>
                      </span>
                      <span className="text-slate-400 font-semibold">{count} keys ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${pct}%`, backgroundColor: node.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap gap-2">
            {!hasNodeD ? (
              <button
                onClick={handleAddNodeD}
                className="flex-1 py-2 px-3 rounded-lg bg-surface-card hover:bg-surface-hover border border-hairline text-pink-400 hover:text-pink-300 transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Shard Delta (220°)</span>
              </button>
            ) : (
              <span className="flex-1 py-2 px-3 rounded-lg bg-surface border border-hairline text-slate-500 text-center text-[11px]">
                Shard Delta Active
              </span>
            )}

            {nodes.some((n) => n.id === 'node-b') && (
              <button
                onClick={handleRemoveNodeB}
                className="py-2 px-3 rounded-lg bg-surface-card hover:bg-surface-hover border border-hairline text-amber-accent hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                title="Simulate node failure on Shard Beta"
              >
                <MinusCircle className="w-3.5 h-3.5" />
                <span>Drop Node Beta</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-surface border border-hairline text-slate-400 hover:text-slate-200 cursor-pointer"
              title="Reset Cluster"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Educational Telemetry Status */}
          <div className="p-3 rounded-lg bg-surface/60 border border-hairline text-slate-300 text-[11px] leading-relaxed">
            <span className="text-cyan-telemetry font-semibold block mb-0.5">Telemetry Note:</span>
            {lastAction}
          </div>
        </div>
      </div>
    </div>
  );
};
