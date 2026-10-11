# Self-Implementation Workbook — Manish Sahu Portfolio

> **Welcome to the implementation quest log.**  
> Keep this document open in a split editor pane (`Ctrl + \` or `Cmd + \`). Work through each quest sequentially (15–30 minutes each). Check off quests as you complete and verify them.

---

## Phase 1: Scaffolding & Design System Tokens

### ⏱️ Quest 1.1: Project Scaffolding & Clean Canvas [Est: 15 min]
* **Target File**: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
* **Contract**: Initialize a clean Vite + React 19 + TypeScript single-page application with zero template bloat.
* **Behavior & Edge Cases**:
  - Install dependencies: `react`, `react-dom`, `lucide-react`.
  - Install devDependencies: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `tailwindcss`, `postcss`, `autoprefixer`.
  - Configure path alias `@/` pointing to `src/` in `vite.config.ts` and `tsconfig.json`.
  - Clear out starter demo styles and SVGs.
* **Mental Model / Hints**: Keep dependencies minimal. No heavy 3D frameworks or bulky CSS libraries.
* **Verification**: Run `npm run build` and confirm it compiles with 0 errors.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 1.2: Design Tokens & Typography Scale [Est: 20 min]
* **Target File**: `tailwind.config.js`, `src/index.css`
* **Contract**: Define the color palette, typography font families, and hairline border utilities.
* **Behavior & Edge Cases**:
  - Color palette:
    - Base obsidian background: `#0B0D13`
    - Surface card background: `#131722`
    - Card elevated / hover: `#181E2C`
    - Hairline border: `#1F2637`
    - Primary text: `#F1F5F9`
    - Muted text: `#94A3B8`
    - Signature accents: Safety Amber (`#F59E0B`) and Telemetry Cyan (`#06B6D4`)
  - Set up font stacks: `font-serif` for high-craft editorial titles, `font-sans` for crisp UI, and `font-mono` for system metrics.
  - Add utility class `.hairline-grid` for subtle technical background grid pattern.
* **Mental Model / Hints**: Think CAD precision and Swiss editorial. High contrast, clean 1px borders, zero noisy gradients.
* **Verification**: Apply a test class like `bg-obsidian border-hairline text-amber` in a scratch component and check browser rendering.
* **Status**: - [ ] Incomplete

---

## Phase 2: Static Typed Data Store (Zero Backend)

### ⏱️ Quest 2.1: TypeScript Interfaces & Domain Models [Est: 15 min]
* **Target File**: `src/types/index.ts`
* **Contract**: Export all types defined in `SYSTEM_DESIGN.md` (`ViewMode`, `Project`, `ArchitectureSpec`, `LabExperiment`, `FieldNote`, `ProductionExperience`, `Profile`).
* **Behavior & Edge Cases**:
  - Ensure strict types for `status`, `tier`, `category`, and `hasInteractiveSim`.
  - All metrics and trade-offs should be strongly typed arrays, not generic `any`.
* **Mental Model / Hints**: Having explicit types now guarantees autocomplete and zero run-time shape mismatches later.
* **Verification**: Run `npx tsc --noEmit` and verify zero type errors.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 2.2: Profile & Career Timeline Data [Est: 20 min]
* **Target File**: `src/data/profile.ts`
* **Contract**: `export const profileData: Profile`
* **Behavior & Edge Cases**:
  - Populate Manish's bio, title (*"Systems & Product Engineer"*), location, core thesis statement.
  - Define `currentBets`: e.g. Autonomous Browser Runtimes (`WebOS.ai`), Distributed Sharding, Local-First Knowledge Systems.
  - Set social coordinates: GitHub (`https://github.com/manish465`), LinkedIn, email, and resume PDF link.
* **Mental Model / Hints**: This file answers Question 1: *"Who is Manish as an engineer?"* Keep statements clear, concrete, and zero-jargon.
* **Verification**: Import `profileData` in `src/App.tsx` and `console.log(profileData.name)`.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 2.3: Featured Projects & Architecture Specs [Est: 25 min]
* **Target File**: `src/data/projects.ts`
* **Contract**: `export const projectsData: Project[]`
* **Behavior & Edge Cases**:
  - Include the 3 Flagships: `WebOS.ai`, `kokoro-chat-reader`, `ReadmeGen.Ai`.
  - Include the Distributed Systems: `DistributedRateLimiter` (highlighting the `@RateLimited` Spring Boot Starter core and Kafka/Redis topology) and `event-service-microservice`.
  - Each project must define both its **Editorial Problem/Solution** and its **ArchitectureSpec** (nodes, edges, invariants, trade-offs).
* **Mental Model / Hints**: Write the trade-offs honestly. E.g. for `WebOS.ai`, why CDP on port 9222 instead of Playwright? (Real Chrome session cookies and zero detection overhead).
* **Verification**: Ensure all projects satisfy the `Project` interface without TypeScript errors.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 2.4: Engineering Lab & Field Notes Data [Est: 20 min]
* **Target File**: `src/data/lab.ts`, `src/data/notes.ts`
* **Contract**:
  - `export const labData: LabExperiment[]`
  - `export const notesData: FieldNote[]`
* **Behavior & Edge Cases**:
  - Lab experiments: `adaptive-shard-manager` (Status: Prototype Validated), `search-engine-project` (Status: In Progress), `neural-network-from-scratch` (Status: Mathematical Foundation), `Sign-language` (Status: Completed ML).
  - Field notes: Draw from your `Brain` Obsidian vault (e.g. *Invariants in Distributed Rebalancing*, *Handling Mutation Observers in Live AI Streams*, *Linear Algebra Foundations of Neural Weights*).
* **Mental Model / Hints**: Explicit status tags in the lab communicate intellectual curiosity and integrity.
* **Verification**: Run `npx tsc --noEmit` to validate data arrays against types.
* **Status**: - [ ] Incomplete

---

## Phase 3: Global Shell & Dual-Layer State Machine

### ⏱️ Quest 3.1: Viewport State Context & Keyboard Hooks [Est: 20 min]
* **Target File**: `src/context/ViewModeContext.tsx`, `src/hooks/useKeyCommand.ts`
* **Contract**:
  - `ViewModeContext`: Provides `viewMode` (`'editorial' | 'architecture'`) and `toggleViewMode()`.
  - `useKeyCommand`: Listens for `Space` or `KeyI` to toggle view mode; listens for `Digit1` through `Digit4` to jump to sections.
* **Behavior & Edge Cases**:
  - Persist user choice in `localStorage.getItem('manish_portfolio_view_mode')`.
  - Ignore keyboard triggers when focus is inside an input or form.
* **Mental Model / Hints**: Seamless keyboard control makes the site feel like an engineer's workbench application.
* **Verification**: Press `Space` in the browser and verify the mode toggle fires and persists on reload.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 3.2: Telemetry HUD Header [Est: 20 min]
* **Target File**: `src/components/Header.tsx`
* **Contract**: `export const Header: React.FC`
* **Behavior & Edge Cases**:
  - Left: Name branding with subtle status LED (`● Available for Senior Systems Roles`).
  - Center/Right: Quick navigation anchors (`[Work] [Distributed] [Lab] [Notes] [Experience]`).
  - Right: Prominent mechanical switch: `[Mode: Editorial] ⇄ [Mode: Architecture] (Space)`.
  - Direct 1-click Resume download pill button.
* **Mental Model / Hints**: Minimal, sticky, backdrop blur (`backdrop-blur-md bg-obsidian/80`).
* **Verification**: Ensure the header stays pinned smoothly during vertical scroll.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 3.3: Editorial Manifesto Hero [Est: 20 min]
* **Target File**: `src/components/Hero.tsx`
* **Contract**: `export const Hero: React.FC<{ profile: Profile }>`
* **Behavior & Edge Cases**:
  - High-craft typographic statement: *"I build systems, browser tooling, and experiments from first principles."*
  - 3-column quick metric badge row:
    - 01. Systems Architecture (Distributed control planes, rate limiters, Kafka event streams)
    - 02. Browser Substrates (Autonomous CDP runtimes, live streaming LLM audio extensions)
    - 03. Applied AI & Tools (Ollama microservices, local 3B model grounding)
  - Current Active Bets status box.
* **Mental Model / Hints**: Answers the 3 core questions in under 30 seconds for visitors who scan quickly.
* **Verification**: Confirm responsive wrapping on mobile screens (< 640px).
* **Status**: - [ ] Incomplete

---

## Phase 4: Project Showcases & Architecture Deconstruction

### ⏱️ Quest 4.1: Dual-Layer Project Card [Est: 25 min]
* **Target File**: `src/components/ProjectCard.tsx`
* **Contract**: `export const ProjectCard: React.FC<{ project: Project; viewMode: ViewMode }>`
* **Behavior & Edge Cases**:
  - In `'editorial'` mode: Render the narrative card (Problem, Solution, Business/Technical Impact, Tech stack pills, GitHub link).
  - In `'architecture'` mode: Unpack the card to render the **ArchitectureSpec View** (Node-edge flow, invariants checklist, trade-off decisions table).
  - Include a local card toggle `[Inspect Architecture]` so users can flip individual cards without toggling the whole page.
* **Mental Model / Hints**: Smooth CSS layout transition when mode changes.
* **Verification**: Toggle `viewMode` and verify card content flips between prose narrative and architecture specification.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 4.2: Architectural Topology Renderer [Est: 25 min]
* **Target File**: `src/components/ArchitectureTopology.tsx`
* **Contract**: `export const ArchitectureTopology: React.FC<{ spec: ArchitectureSpec }>`
* **Behavior & Edge Cases**:
  - Render an interactive SVG/HTML node diagram for the project's subsystems (e.g. `Client` $\rightarrow$ `Gateway` $\rightarrow$ `Services` $\rightarrow$ `Storage`).
  - Clicking a node highlights incoming/outgoing edges and displays the node's responsibilities and technology notes in an inspector drawer.
* **Mental Model / Hints**: Think clean schematic blueprint, not messy noodle graphs. Orthogonal lines with subtle directional arrows.
* **Verification**: Test with `WebOS.ai` spec and verify all 4 nodes (Runtime, CDP Client, SQLite, Model Gateway) render with correct connections.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 4.3: Distributed Systems Showcase Section [Est: 20 min]
* **Target File**: `src/components/DistributedSection.tsx`
* **Contract**: `export const DistributedSection: React.FC<{ projects: Project[] }>`
* **Behavior & Edge Cases**:
  - Focus spotlight on `DistributedRateLimiter`.
  - Feature a dedicated tab or callout explaining the `@RateLimited` Spring Boot Starter architecture:
    - Custom Annotation $\rightarrow$ Spring AOP Proxy $\rightarrow$ Redis Fixed/Sliding Window $\rightarrow$ Kafka telemetry event.
  - Highlight multi-module Maven structure (`rate-limiter-core`, `ProductService`, `SearchService`).
* **Mental Model / Hints**: Proves you build real, reusable infrastructure libraries, not just basic CRUD controllers.
* **Verification**: Confirm code snippet and architectural callouts render cleanly with monospaced highlighting.
* **Status**: - [ ] Incomplete

---

## Phase 5: Pure Client-Side Interactive Simulators

### ⏱️ Quest 5.1: Rate Limiter Token Bucket Simulator [Est: 30 min]
* **Target File**: `src/components/simulations/RateLimiterSim.tsx`
* **Contract**: `export const RateLimiterSim: React.FC`
* **Behavior & Edge Cases**:
  - Pure client-side token bucket algorithm state machine.
  - Interactive controls:
    - Bucket Capacity slider (e.g. 5–20 tokens)
    - Refill Rate slider (e.g. 1–5 tokens/sec)
    - "Send Request" and "Burst 10 Requests" buttons
  - Visual output:
    - Animated bucket filling/depleting with water/token bars
    - Live request counter: Allowed vs. Dropped (HTTP 429)
    - Console log of simulated events (`[200 OK] Token consumed`, `[429 TOO MANY REQUESTS] Bucket empty`)
* **Mental Model / Hints**: Use `requestAnimationFrame` or a `setInterval` hook with a ref to calculate token refill: `tokens = Math.min(capacity, tokens + elapsed * refillRate)`.
* **Verification**: Set capacity to 5, hit "Burst 10 Requests", and confirm exactly 5 succeed and 5 drop with 429.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 5.2: Consistent Hash Ring Visualizer [Est: 30 min]
* **Target File**: `src/components/simulations/HashRingSim.tsx`
* **Contract**: `export const HashRingSim: React.FC`
* **Behavior & Edge Cases**:
  - Visual SVG circle representing the 360-degree hash ring.
  - Initial nodes: 3 shard nodes placed at angular intervals with distinct colors.
  - 12 simulated data keys distributed clockwise to the nearest node.
  - Interactive actions:
    - `[Add Shard Node D]`: Inserts a node, animates keys that re-map to the new node.
    - `[Drop Node B]`: Simulates node failure, animates orphaned keys migrating to the next clockwise shard.
* **Mental Model / Hints**: Trigonometric mapping: `x = cx + r * cos(angle)`, `y = cy + r * sin(angle)`.
* **Verification**: Add and drop nodes; verify that key counts update and lines re-point to the correct clockwise shard.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 5.3: Kokoro Reader Audio HUD Simulator [Est: 25 min]
* **Target File**: `src/components/simulations/KokoroSim.tsx`
* **Contract**: `export const KokoroSim: React.FC`
* **Behavior & Edge Cases**:
  - Mock chat interface showing an assistant streaming response.
  - Dynamic injected `▶ Read` button on the message bubble.
  - Persistent bottom audio bar that slides in when clicked:
    - Play / Pause toggle with simulated progress bar scrub.
    - Speed control button (`1.0x`, `1.25x`, `1.5x`, `2.0x`).
    - Toggle: "Skip Code Blocks: [ON / OFF]".
* **Mental Model / Hints**: Demonstrates Kokoro's core product UX directly inside the portfolio without needing to install the Chrome extension.
* **Verification**: Click `▶ Read` on the mock message, verify audio player pops up and progress scrubs forward.
* **Status**: - [ ] Incomplete

---

## Phase 6: The Engineering Lab & Field Notes

### ⏱️ Quest 6.1: The Engineering Lab Drawer [Est: 25 min]
* **Target File**: `src/components/LabSection.tsx`
* **Contract**: `export const LabSection: React.FC<{ experiments: LabExperiment[] }>`
* **Behavior & Edge Cases**:
  - Header: *"The Engineering Lab — Unfinished Systems & First-Principles Experiments"*
  - Subtitle: *"Built to understand how things work under the hood, not for resume vanity."*
  - Experiment cards with explicit status badges:
    - `adaptive-shard-manager` (embeds or links to the Hash Ring Sim)
    - `search-engine-project` (Inverted Index, BM25 formula breakdown)
    - `neural-network-from-scratch` (Perceptron, backprop derivation)
    - `Sign-language` (PyTorch CNN inference)
* **Mental Model / Hints**: High intellectual credibility. Demonstrates genuine curiosity.
* **Verification**: Confirm all status badges render with distinct color codings (amber for in-progress, green for validated, blue for theory).
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 6.2: Field Notes & Obsidian Brain Vault [Est: 20 min]
* **Target File**: `src/components/FieldNotes.tsx`
* **Contract**: `export const FieldNotes: React.FC<{ notes: FieldNote[] }>`
* **Behavior & Edge Cases**:
  - Tufte-style editorial layout: Title, date, reading time, and margin summary.
  - Expandable drawer or modal to read the full note.
  - Highlights real engineering reflections:
    - *Why build an inverted index from scratch?*
    - *DOM Mutation Observers in streaming LLM interfaces.*
    - *Consistent Hashing invariants during shard migration.*
* **Mental Model / Hints**: Proves you write with clarity and document technical decisions.
* **Verification**: Click a note title, verify smooth accordion expansion showing takeaways and markdown body.
* **Status**: - [ ] Incomplete

---

## Phase 7: Production Experience, Polish & Launch

### ⏱️ Quest 7.1: Production Experience Dossier [Est: 20 min]
* **Target File**: `src/components/ExperienceDossier.tsx`
* **Contract**: `export const ExperienceDossier: React.FC<{ experience: ProductionExperience[] }>`
* **Behavior & Edge Cases**:
  - Structured timeline of professional production roles.
  - For each role, highlight:
    - Systems Owned & Delivered
    - Scale Metrics (throughput, users, latency, database size)
    - Architectural Decisions Made Under Constraints
* **Mental Model / Hints**: Anchors your hobby and lab projects to solid professional engineering track record.
* **Verification**: Confirm dates, metrics, and bullets render with high legibility.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 7.2: Colophon, Resume Trigger & Footer [Est: 15 min]
* **Target File**: `src/components/Footer.tsx`
* **Contract**: `export const Footer: React.FC<{ profile: Profile }>`
* **Behavior & Edge Cases**:
  - Direct 1-click Resume download button (prominent and unmissable).
  - Direct links: GitHub, LinkedIn, Email.
  - Colophon details: Built with React 19, TypeScript, Tailwind CSS. Zero backend. 100% client-side.
  - Copyright and current year.
* **Mental Model / Hints**: Respect the recruiter's time. Don't hide the resume behind complicated puzzles.
* **Verification**: Verify all external links have `target="_blank" rel="noopener noreferrer"` and resume link triggers download.
* **Status**: - [ ] Incomplete

---

### ⏱️ Quest 7.3: Full Build, Performance & Lighthouse Audit [Est: 20 min]
* **Target File**: Entire project
* **Contract**: Zero runtime errors, zero TypeScript errors, `< 100KB` gzipped bundle size.
* **Behavior & Edge Cases**:
  - Run `npm run build`.
  - Preview production build using `npm run preview`.
  - Verify keyboard shortcuts (`Space` for view mode, `1-4` for section jumps).
  - Verify smooth responsiveness on mobile, tablet, and ultra-wide screens.
* **Mental Model / Hints**: The final seal of quality. Blazing fast, elegant, memorable.
* **Verification**: Build produces clean `dist/` bundle with 0 warnings or errors.
* **Status**: - [ ] Incomplete
