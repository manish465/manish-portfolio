import React from 'react';
import { ViewModeProvider } from './context/ViewModeContext';
import { useKeyCommand } from './hooks/useKeyCommand';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { DistributedSection } from './components/DistributedSection';
import { LabSection } from './components/LabSection';
import { FieldNotes } from './components/FieldNotes';
import { ExperienceDossier } from './components/ExperienceDossier';
import { Footer } from './components/Footer';
import { KokoroSim } from './components/simulations/KokoroSim';
import { projectsData, labData, notesData, experienceData, profileData } from './data';

const PortfolioShell: React.FC = () => {
  // Activate global keyboard command listener (Space for mode toggle, 1-5 for jumps)
  useKeyCommand();

  const flagshipProjects = projectsData.filter((p) => p.tier === 'flagship');

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 hairline-grid flex flex-col antialiased">
      <Header />
      <main className="flex-1">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          {/* Section 01: Featured Systems & Products (Flagships) */}
          <section id="work" className="scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-4 mb-8 border-b border-hairline">
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <span className="font-mono text-xs text-amber-accent">01.</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 font-normal">
                  Featured Systems & Products
                </h2>
              </div>
              <span className="font-mono text-xs text-slate-400">
                Autonomous runtimes, browser extensions & AI microservices
              </span>
            </div>

            <div className="space-y-10">
              {flagshipProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  renderInteractiveSlot={project.id === 'kokoro-chat-reader' ? <KokoroSim /> : undefined}
                />
              ))}
            </div>
          </section>

          {/* Section 02: Distributed Systems & Core Microservices */}
          <DistributedSection projects={projectsData} />

          {/* Section 03: The Engineering Lab */}
          <LabSection experiments={labData} />

          {/* Section 04: Engineering Field Notes */}
          <FieldNotes notes={notesData} />

          {/* Section 05: Production Experience Dossier */}
          <ExperienceDossier experience={experienceData} />
        </div>
      </main>

      {/* Footer Colophon & Direct Resume Download */}
      <Footer profile={profileData} />
    </div>
  );
};

export default function App() {
  return (
    <ViewModeProvider>
      <PortfolioShell />
    </ViewModeProvider>
  );
}
