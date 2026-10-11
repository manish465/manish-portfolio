export type ViewMode = 'editorial' | 'architecture';

export type ProjectTier = 'flagship' | 'distributed' | 'lab';

export interface ArchitectureNode {
  id: string;
  label: string;
  role: string;
  tech: string;
  notes?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  protocol: 'HTTP' | 'CDP' | 'Kafka' | 'AOP' | 'Redis' | 'DOM Event' | 'IPC' | 'TCP';
  description: string;
}

export interface ArchitectureSpec {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  invariants: string[];
  tradeOffs: {
    decision: string;
    chosen: string;
    alternative: string;
    reason: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  tier: ProjectTier;
  category: 'Browser Substrate' | 'Browser Extension' | 'Distributed Systems' | 'Full-Stack AI' | 'Developer Tool';
  status: 'Finished Product' | 'Production Ready' | 'Lab Prototype' | 'Benchmarking';
  problem: string;
  solution: string;
  techStack: string[];
  metrics?: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  architecture: ArchitectureSpec;
  hasInteractiveSim?: 'rate-limiter' | 'hash-ring' | 'kokoro' | null;
}

export interface LabExperiment {
  id: string;
  title: string;
  hypothesis: string;
  status: 'Prototype Validated' | 'In Progress' | 'Active Benchmark' | 'Mathematical Foundation' | 'Completed Experiment';
  completionPct: number;
  keyTakeaway: string;
  techStack: string[];
  githubUrl: string;
  hasInteractiveSim?: 'hash-ring' | null;
}

export interface FieldNote {
  id: string;
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  topic: 'Distributed Systems' | 'Browser Architecture' | 'First-Principles' | 'System Design';
  summary: string;
  takeaway: string;
  content: string[];
}

export interface ProductionExperience {
  period: string;
  role: string;
  organization: string;
  summary: string;
  systemsOwned: string[];
  scaleMetrics: { metric: string; detail: string }[];
  keyDecisions: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  thesis: string;
  corePillars: { title: string; subtitle: string; description: string }[];
  currentBets: { title: string; desc: string; status: string }[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  resumePdfUrl: string;
}
