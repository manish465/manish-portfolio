import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertOctagon, CheckCircle2, Zap, Gauge } from 'lucide-react';

interface RequestEvent {
  id: number;
  time: string;
  status: 200 | 429;
  message: string;
  tokensLeft: number;
}

export const RateLimiterSim: React.FC = () => {
  const [capacity, setCapacity] = useState<number>(10);
  const [refillRate, setRefillRate] = useState<number>(2); // tokens per second
  const [tokens, setTokens] = useState<number>(10);
  const [stats, setStats] = useState({ allowed: 0, dropped: 0, total: 0 });
  const [logs, setLogs] = useState<RequestEvent[]>([]);

  const tokensRef = useRef<number>(tokens);
  tokensRef.current = tokens;

  // Refill tokens continuously using interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) => Math.min(capacity, prev + refillRate * 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, [capacity, refillRate]);

  const sendRequests = (count: number) => {
    let currentTokens = tokensRef.current;
    let allowedIncrement = 0;
    let droppedIncrement = 0;
    const now = new Date().toLocaleTimeString();
    const newLogs: RequestEvent[] = [];

    for (let i = 0; i < count; i++) {
      if (currentTokens >= 1) {
        currentTokens -= 1;
        allowedIncrement++;
        newLogs.unshift({
          id: Date.now() + i,
          time: now,
          status: 200,
          message: 'HTTP 200 OK — Token consumed (AOP Aspect)',
          tokensLeft: Math.round(currentTokens * 10) / 10,
        });
      } else {
        droppedIncrement++;
        newLogs.unshift({
          id: Date.now() + i,
          time: now,
          status: 429,
          message: 'HTTP 429 TOO MANY REQUESTS — Throttled & Streamed to Kafka',
          tokensLeft: 0,
        });
      }
    }

    setTokens(currentTokens);
    setStats((prev) => ({
      allowed: prev.allowed + allowedIncrement,
      dropped: prev.dropped + droppedIncrement,
      total: prev.total + count,
    }));
    setLogs((prev) => [...newLogs, ...prev].slice(0, 8));
  };

  const handleReset = () => {
    setTokens(capacity);
    setStats({ allowed: 0, dropped: 0, total: 0 });
    setLogs([]);
  };

  const fillPercentage = Math.min(100, Math.max(0, (tokens / capacity) * 100));

  return (
    <div className="rounded-xl bg-obsidian border border-hairline p-5 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline/80">
        <div className="flex items-center space-x-2 text-slate-200">
          <Zap className="w-4 h-4 text-amber-accent" />
          <span className="font-semibold">Interactive Test Harness: In-Process Token Bucket</span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded bg-surface border border-hairline text-cyan-telemetry">
          Pure Client State Machine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls & Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
              <span>Bucket Capacity</span>
              <span className="text-amber-accent font-semibold">{capacity} tokens</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              value={capacity}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCapacity(val);
                setTokens((prev) => Math.min(val, prev));
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
              <span>Refill Rate</span>
              <span className="text-cyan-telemetry font-semibold">{refillRate} tokens/sec</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={refillRate}
              onChange={(e) => setRefillRate(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => sendRequests(1)}
              className="flex-1 py-2 px-3 rounded-lg bg-surface-card hover:bg-surface-hover border border-hairline text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center justify-center space-x-1"
            >
              <Play className="w-3 h-3 text-cyan-telemetry" />
              <span>Send 1 Req</span>
            </button>
            <button
              onClick={() => sendRequests(5)}
              className="flex-1 py-2 px-3 rounded-lg bg-surface-card hover:bg-surface-hover border border-hairline text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center justify-center space-x-1"
            >
              <Zap className="w-3 h-3 text-amber-accent" />
              <span>Burst 5</span>
            </button>
            <button
              onClick={() => sendRequests(12)}
              className="py-2 px-3 rounded-lg bg-surface-card hover:bg-surface-hover border border-hairline text-red-400 hover:text-red-300 transition-colors cursor-pointer flex items-center justify-center space-x-1"
              title="Spike traffic to trigger HTTP 429 limit"
            >
              <span>Spike 12</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-surface border border-hairline text-slate-400 hover:text-slate-200 cursor-pointer"
              title="Reset Bucket"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Token Tank & Fill Meter */}
        <div className="p-4 rounded-lg bg-surface-card border border-hairline flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] mb-2 text-slate-400">
            <span>Bucket Fill Level</span>
            <span className="text-slate-200 font-semibold">{tokens.toFixed(1)} / {capacity}</span>
          </div>

          {/* Graphical Tank */}
          <div className="relative w-full h-20 rounded bg-obsidian border border-hairline overflow-hidden mb-3">
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-accent/40 to-amber-accent/80 transition-all duration-150"
              style={{ height: `${fillPercentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg text-slate-100 drop-shadow">
              {Math.round(fillPercentage)}%
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-1.5 rounded bg-surface border border-hairline">
              <span className="text-slate-500 block">TOTAL</span>
              <span className="font-semibold text-slate-200">{stats.total}</span>
            </div>
            <div className="p-1.5 rounded bg-surface border border-hairline">
              <span className="text-lime-signal block">200 OK</span>
              <span className="font-semibold text-lime-signal">{stats.allowed}</span>
            </div>
            <div className="p-1.5 rounded bg-surface border border-hairline">
              <span className="text-red-400 block">429 DROP</span>
              <span className="font-semibold text-red-400">{stats.dropped}</span>
            </div>
          </div>
        </div>

        {/* Live Event Stream / Kafka Audit Log */}
        <div className="p-3.5 rounded-lg bg-surface-card border border-hairline flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-slate-300 mb-2 flex items-center justify-between">
            <span>Real-Time Audit Stream</span>
            <span className="text-[10px] text-slate-500">Kafka Topic</span>
          </div>
          <div className="space-y-1.5 overflow-hidden flex-1 max-h-[140px] overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-slate-600 text-[11px] py-6 text-center">
                Send requests above to inspect execution trace.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-1.5 rounded border text-[10px] flex items-center justify-between ${
                    log.status === 200
                      ? 'bg-surface border-lime-signal/30 text-slate-300'
                      : 'bg-red-950/30 border-red-500/40 text-red-300'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    {log.status === 200 ? (
                      <CheckCircle2 className="w-3 h-3 text-lime-signal shrink-0" />
                    ) : (
                      <AlertOctagon className="w-3 h-3 text-red-400 shrink-0" />
                    )}
                    <span className="truncate">{log.message}</span>
                  </div>
                  <span className="text-slate-500 shrink-0 ml-1">{log.tokensLeft} rem</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
