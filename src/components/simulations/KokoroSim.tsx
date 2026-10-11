import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, Rewind, Volume2, Code, Sparkles } from 'lucide-react';

export const KokoroSim: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(14); // seconds
  const [speed, setSpeed] = useState<number>(1.0);
  const [skipCode, setSkipCode] = useState<boolean>(true);
  const [hudOpen, setHudOpen] = useState<boolean>(true);

  const totalDuration = 45; // seconds

  // Simulated audio progress timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
  };

  const handleSeek = (delta: number) => {
    setProgress((prev) => Math.min(totalDuration, Math.max(0, prev + delta)));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="rounded-xl bg-obsidian border border-hairline p-5 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline/80">
        <div className="flex items-center space-x-2 text-slate-200">
          <Volume2 className="w-4 h-4 text-amber-accent" />
          <span className="font-semibold">Interactive Test Harness: Kokoro Chat Companion</span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded bg-surface border border-hairline text-cyan-telemetry">
          Chrome MV3 DOM Injection Simulation
        </span>
      </div>

      {/* Mock Chat Interface */}
      <div className="rounded-lg bg-surface-card border border-hairline p-4 mb-4 relative overflow-hidden">
        {/* Assistant Header with Injected Kokoro Button */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-hairline/60">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-telemetry" />
            <span className="font-semibold text-slate-300">Claude / ChatGPT (Live Streaming)</span>
          </div>

          {/* Injected Kokoro Read Trigger Button */}
          <button
            onClick={() => {
              setHudOpen(true);
              setIsPlaying(!isPlaying);
            }}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-accent/20 hover:bg-amber-accent/30 border border-amber-accent/60 text-amber-300 transition-colors cursor-pointer text-[11px] font-semibold"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? 'Pause Speech' : '▶ Read (Kokoro TTS)'}</span>
          </button>
        </div>

        {/* Message Content */}
        <div className="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
          <p className={progress < 20 && isPlaying ? 'bg-amber-accent/10 rounded px-1 text-slate-100' : ''}>
            "Consistent hashing rings map both data keys and server nodes to a shared 360-degree integer key space. When an additional node is provisioned into the cluster, only its immediate counter-clockwise neighbor’s key partition is migrated."
          </p>

          {/* Mock Code Block */}
          <div className={`p-3 rounded-md bg-obsidian border border-hairline font-mono text-[11px] transition-opacity ${skipCode ? 'opacity-40' : 'opacity-100'}`}>
            <div className="flex justify-between items-center text-slate-500 mb-1 text-[10px]">
              <span>java</span>
              <span>{skipCode ? '[SKIPPED BY TTS CLEANER]' : '[TTS READING CODE]'}</span>
            </div>
            <code className="text-amber-accent/90 block">
              public int hash(String key) &#123; return md5(key).hashCode() % 360; &#125;
            </code>
          </div>

          <p className={progress >= 20 && isPlaying ? 'bg-amber-accent/10 rounded px-1 text-slate-100' : ''}>
            "This eliminates the complete K-way data reshuffling penalty common to modulo hash algorithms."
          </p>
        </div>
      </div>

      {/* Persistent Draggable-Style Audio HUD */}
      {hudOpen && (
        <div className="p-3.5 rounded-lg bg-surface border border-amber-accent/40 shadow-2xl transition-all">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            {/* Playback Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-amber-accent hover:bg-amber-400 text-obsidian flex items-center justify-center transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <button
                onClick={() => handleSeek(-10)}
                className="p-1.5 rounded hover:bg-surface-card text-slate-400 hover:text-slate-200 cursor-pointer"
                title="Rewind 10 seconds"
              >
                <Rewind className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleSeek(10)}
                className="p-1.5 rounded hover:bg-surface-card text-slate-400 hover:text-slate-200 cursor-pointer"
                title="Forward 10 seconds"
              >
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scrubber & Time */}
            <div className="flex-1 min-w-[140px] flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max={totalDuration}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 shrink-0">
                {formatTime(progress)} / {formatTime(totalDuration)}
              </span>
            </div>

            {/* Feature Toggles */}
            <div className="flex items-center space-x-2">
              <button
                onClick={cycleSpeed}
                className="px-2 py-1 rounded bg-surface-card border border-hairline hover:border-slate-500 text-slate-200 text-[10px] font-semibold cursor-pointer"
                title="Audio playback speed multiplier"
              >
                {speed.toFixed(2)}x
              </button>
              <button
                onClick={() => setSkipCode(!skipCode)}
                className={`flex items-center space-x-1 px-2 py-1 rounded border text-[10px] cursor-pointer transition-colors ${
                  skipCode
                    ? 'bg-amber-accent/20 border-amber-accent/50 text-amber-300'
                    : 'bg-surface-card border-hairline text-slate-400'
                }`}
                title="Toggle code block avoidance filter"
              >
                <Code className="w-3 h-3" />
                <span>Skip Code: {skipCode ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
