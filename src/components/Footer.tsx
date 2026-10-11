import React from 'react';
import { Profile } from '../types';
import { FileText, Github, Linkedin, Mail, MapPin, Terminal, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="border-t border-hairline bg-surface/30 pt-16 pb-12 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-hairline/60">
          {/* Identity & Coordinates */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-lime-signal" />
              <span className="font-semibold text-slate-100 text-sm tracking-wider">
                {profile.name.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed max-w-md">
              {profile.title} focusing on distributed backend infrastructure, browser runtimes, and local-first software engineering.
            </p>
            <div className="flex items-center space-x-2 text-slate-500 text-[11px]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.location} (UTC+05:30)</span>
            </div>
          </div>

          {/* Direct Resume Download */}
          <div className="space-y-3">
            <span className="text-slate-300 font-semibold uppercase tracking-wider text-[11px] block">
              Official Resume
            </span>
            <p className="text-slate-400 text-[11px] font-sans">
              Clean 1-page document detailing production tenure, scale handled, and systems authored.
            </p>
            <a
              href={profile.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-amber-accent/20 hover:bg-amber-accent/30 border border-amber-accent/60 text-amber-300 transition-colors cursor-pointer font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </a>
          </div>

          {/* Direct Connect Channels */}
          <div className="space-y-3">
            <span className="text-slate-300 font-semibold uppercase tracking-wider text-[11px] block">
              Direct Channels
            </span>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-100 transition-colors flex items-center space-x-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@manish465)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-100 transition-colors flex items-center space-x-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="hover:text-slate-100 transition-colors flex items-center space-x-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile.socials.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Colophon & Invariants */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-amber-accent" />
            <span>Built with React 19, TypeScript & Tailwind CSS. Zero backend. 100% Client-Side.</span>
          </div>
          <div>
            MANISH SAHU © {new Date().getFullYear()} — All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
