# Project Roadmap — Manish Sahu Personal Portfolio

> **Disciplined, milestone-by-milestone delivery of Manish Sahu's high-craft personal portfolio.**  
> Built with React 19, TypeScript, Vite, and Tailwind CSS. Zero backend, zero database, 100% client-side.

---

## Milestone Overview

- [x] **Milestone 0: Project Scaffolding, Tooling & Design System Tokens** *(Completed: 2026-10-11)*
- [x] **Milestone 1: Static Typed Domain Store & Data Models** *(Completed: 2026-10-11)*
- [x] **Milestone 2: Global Shell, HUD Header & Dual-Layer State Machine** *(Completed: 2026-10-11)*
- [x] **Milestone 3: Flagships & Distributed Systems Showcase (Dual View)** *(Completed: 2026-10-11)*
- [x] **Milestone 4: Pure Client-Side Interactive Simulators** *(Completed: 2026-10-11)*
- [x] **Milestone 5: The Engineering Lab & Field Notes Drawer** *(Completed: 2026-10-11)*
- [x] **Milestone 6: Production Experience Dossier, Polish & Launch Verification** *(Completed: 2026-10-11)*

---

### [x] Milestone 0: Project Scaffolding, Tooling & Design System Tokens *(Completed: 2026-10-11)*
* **Deliverables**:
  - Initialize Vite + React 19 + TypeScript in `D:\DEVLOPMENT\Projects\manish-portfolio`.
  - Install dependencies: `lucide-react`, `tailwindcss`, `@vitejs/plugin-react`.
  - Configure path aliases (`@/` $\rightarrow$ `src/`) in `vite.config.ts` and `tsconfig.json`.
  - Configure Tailwind design tokens: Obsidian background (`#0B0D13`), card surface (`#131722`), hairline borders (`#1F2637`), Safety Amber (`#F59E0B`), Telemetry Cyan (`#06B6D4`), and font stacks.
  - Set up clean base HTML & CSS (`src/index.css`) with hairline drafting grid utility.
* **Acceptance Criteria**:
  - `npm run build` runs and succeeds with zero errors.
  - Clean canvas renders with dark obsidian theme and custom typography classes.
* **Verification Command**:
  ```bash
  npm run build
  ```

---

### [x] Milestone 1: Static Typed Domain Store & Data Models *(Completed: 2026-10-11)*
* **Deliverables**:
  - Implement domain TypeScript interfaces in `src/types/index.ts` (`Project`, `ArchitectureSpec`, `LabExperiment`, `FieldNote`, `ProductionExperience`, `Profile`, `ViewMode`).
  - Populate `src/data/profile.ts`: Bio, coordinates, current bets, resume PDF trigger.
  - Populate `src/data/projects.ts`: Flagships (`WebOS.ai`, `kokoro-chat-reader`, `ReadmeGen.Ai`) and Distributed Systems (`DistributedRateLimiter` with `@RateLimited` Spring Boot Starter specs, `event-service-microservice`).
  - Populate `src/data/lab.ts`: Transparent status experiments (`adaptive-shard-manager`, `search-engine-project`, `neural-network-from-scratch`, `Sign-language`).
  - Populate `src/data/notes.ts`: Field notes from `Brain` Obsidian vault.
* **Acceptance Criteria**:
  - All data strictly conforms to TypeScript interfaces with zero `any`.
  - `npx tsc --noEmit` validates all types with zero errors.
* **Verification Command**:
  ```bash
  npx tsc --noEmit
  ```

---

### [x] Milestone 2: Global Shell, HUD Header & Dual-Layer State Machine *(Completed: 2026-10-11)*
* **Deliverables**:
  - Implement `ViewModeContext` managing `'editorial'` vs. `'architecture'` mode with `localStorage` persistence.
  - Implement `useKeyCommand` hook listening for `Space` (toggle mode) and `1-4` (quick scroll).
  - Build `Header.tsx`: Pinned telemetry HUD with brand identity, live status indicator, 1-click resume trigger, and the prominent mode switch.
  - Build `Hero.tsx`: Editorial manifesto answering the 3 core questions in 30 seconds with 3-column metric cards.
* **Acceptance Criteria**:
  - Toggling mode via button click or `Space` key updates global state cleanly.
  - Header pins smoothly during vertical scroll with backdrop blur.
* **Verification Command**:
  ```bash
  npm run build
  ```

---

### [x] Milestone 3: Flagships & Distributed Systems Showcase (Dual View) *(Completed: 2026-10-11)*
* **Deliverables**:
  - Build `ProjectCard.tsx` with dual-layer rendering:
    - *Editorial View*: Clean narrative (problem, solution, business/technical impact, tech tags).
    - *Architecture View*: Deconstructed system topology, invariants checklist, trade-off decision matrix.
  - Build `ArchitectureTopology.tsx`: Interactive SVG node-edge schematic for `WebOS.ai`, `Kokoro`, and `DistributedRateLimiter`.
  - Build `DistributedSection.tsx`: Specialized focus on the distributed rate limiter ecosystem and reusable Spring Boot starter.
* **Acceptance Criteria**:
  - All 3 flagships and distributed projects render seamlessly in both Editorial and Architecture modes.
  - Clicking any node in the topology highlights connecting data pathways.
* **Verification Command**:
  ```bash
  npm run build
  ```

---

### [x] Milestone 4: Pure Client-Side Interactive Simulators *(Completed: 2026-10-11)*
* **Deliverables**:
  - Build `RateLimiterSim.tsx`: Interactive token bucket / sliding window simulator with capacity/refill sliders and burst testing (HTTP 200 vs 429).
  - Build `HashRingSim.tsx`: Interactive SVG Consistent Hash Ring demonstrating virtual nodes, key distribution, and add/drop node rebalancing.
  - Build `KokoroSim.tsx`: Embedded interactive streaming chat harness with injected `▶ Read` button and audio playback HUD.
* **Acceptance Criteria**:
  - All 3 simulators run 100% in client-side JavaScript without backend requests.
  - State changes animate smoothly at 60 FPS.
* **Verification Command**:
  ```bash
  npm run build
  ```

---

### [x] Milestone 5: The Engineering Lab & Field Notes Drawer *(Completed: 2026-10-11)*
* **Deliverables**:
  - Build `LabSection.tsx`: Clean laboratory drawer for unfinished work with explicit status flags (`[PROTOTYPE VALIDATED]`, `[IN PROGRESS]`, `[MATHEMATICAL FOUNDATION]`).
  - Build `FieldNotes.tsx`: Editorial Tufte-style cards for engineering reflections and architecture decision records.
  - Expandable modal/drawer for reading full field notes with code and math callouts.
* **Acceptance Criteria**:
  - Lab experiments are clearly distinguished from finished products.
  - Field notes expand and collapse cleanly without layout shifts.
* **Verification Command**:
  ```bash
  npm run build
  ```

---

### [x] Milestone 6: Production Experience Dossier, Polish & Launch Verification *(Completed: 2026-10-11)*
* **Deliverables**:
  - Build `ExperienceDossier.tsx`: Production engineering career track record, scale handled, systems owned.
  - Build `Footer.tsx`: Direct colophon, 1-click resume download, and contact coordinates.
  - Responsive audit across mobile, tablet, and widescreen.
  - Bundle size and performance optimization: verify total gzipped bundle is $< 100\text{ KB}$.
* **Acceptance Criteria**:
  - `npm run build` produces clean production bundle.
  - Zero console errors or runtime warnings in production preview.
* **Verification Command**:
  ```bash
  npm run build
  ```
