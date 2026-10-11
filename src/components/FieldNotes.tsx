import React, { useState } from 'react';
import { FieldNote } from '../types';
import { BookOpen, Calendar, Clock, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface FieldNotesProps {
  notes: FieldNote[];
}

export const FieldNotes: React.FC<FieldNotesProps> = ({ notes }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(notes[0]?.id || null);

  const topics = ['All', 'Distributed Systems', 'Browser Architecture', 'System Design', 'First-Principles'];

  const filteredNotes = selectedTopic === 'All'
    ? notes
    : notes.filter((n) => n.topic === selectedTopic);

  const toggleExpand = (id: string) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  return (
    <section id="notes" className="scroll-mt-20 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-4 mb-8 border-b border-hairline">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <span className="font-mono text-xs text-slate-500">04.</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 font-normal">
            Engineering Field Notes & Invariants
          </h2>
        </div>
        <span className="font-mono text-xs text-slate-400">
          Causal reasoning, architectural decisions & continuous learning
        </span>
      </div>

      {/* Topic Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors cursor-pointer ${
              selectedTopic === t
                ? 'bg-amber-accent/20 border-amber-accent/60 text-amber-300'
                : 'bg-surface-card border-hairline text-slate-400 hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div className="space-y-6">
        {filteredNotes.map((note) => {
          const isExpanded = expandedNoteId === note.id;

          return (
            <div
              key={note.id}
              className="rounded-2xl bg-surface-card/80 border border-hairline hover:border-hairline-bright transition-all overflow-hidden"
            >
              {/* Note Header */}
              <div
                onClick={() => toggleExpand(note.id)}
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 mb-2">
                    <span className="px-2 py-0.5 rounded bg-surface border border-hairline text-cyan-telemetry">
                      {note.topic}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{note.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{note.readingTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-slate-100 font-normal hover:text-amber-accent transition-colors">
                    {note.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="font-mono text-xs text-slate-400 hidden sm:inline">
                    {isExpanded ? 'Collapse' : 'Read Note'}
                  </span>
                  <div className="p-2 rounded-lg bg-surface border border-hairline text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Note Preview Summary */}
              <div className="px-6 pb-6 pt-0 border-b border-hairline/60 text-xs font-sans text-slate-300 leading-relaxed">
                <p>{note.summary}</p>
                <div className="mt-3 p-3 rounded-lg bg-surface/50 border border-hairline text-amber-accent/90 font-mono text-[11px]">
                  <span className="font-semibold text-amber-accent">Core Invariant: </span>
                  {note.takeaway}
                </div>
              </div>

              {/* Expanded Note Body */}
              {isExpanded && (
                <div className="p-6 bg-obsidian/70 space-y-4 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-hairline/80">
                  {note.content.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
