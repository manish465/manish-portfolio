import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'webos-ai',
    title: 'WebOS.ai',
    tagline: 'Autonomous, Hardware-Aware Browser Operating Substrate',
    tier: 'flagship',
    category: 'Browser Substrate',
    status: 'Finished Product',
    problem: 'Modern LLM browser agents burn millions of tokens passing raw HTML/DOM trees, fail under consumer hardware constraints, leak sensitive credentials/PII to cloud APIs, and break when cloud LLM rate limits trigger.',
    solution: 'A task-agnostic browser runtime with deterministic Chrome DevTools Protocol (CDP) control, zero-token accessibility tree (AXTree) pruning, local SQLite episodic memory, and a privacy-preserving LLM gateway running 3B models locally under 6GB VRAM.',
    techStack: ['Python 3.11', 'Chrome CDP (9222)', 'Chrome MV3', 'SQLite', 'Pytest', 'Llama 3.2 3B', 'Ollama'],
    metrics: [
      { label: 'DOM Token Reduction', value: '99.7%' },
      { label: 'Local VRAM Footprint', value: '2.55 GB' },
      { label: 'Inference Speed', value: '~110 tok/s' },
      { label: 'Candidate Pruning', value: '10k → ≤30 nodes' }
    ],
    githubUrl: 'https://github.com/manish465/WebOS.ai',
    hasInteractiveSim: null,
    architecture: {
      nodes: [
        {
          id: 'client-plugin',
          label: 'Domain Plugin',
          role: 'Task Driver',
          tech: 'JobPilot.ai / Python API',
          notes: 'Dispatches high-level semantic objectives into runtime execution queues.'
        },
        {
          id: 'runtime-engine',
          label: 'WebRuntime Engine',
          role: 'Core Coordinator',
          tech: 'Python / src/runtime.py',
          notes: 'Manages step execution loops, deterministic perception cycles, and action verification.'
        },
        {
          id: 'browser-engine',
          label: 'Browser Engine',
          role: 'CDP Controller',
          tech: 'Chrome CDP (port 9222)',
          notes: 'Direct control of authentic Chrome sessions without automation fingerprint detection.'
        },
        {
          id: 'axtree-pruner',
          label: '0-Token AXTree Pruner',
          role: 'Perception Filter',
          tech: 'Deterministic Tree Filter',
          notes: 'Strips non-interactive nodes; reduces 10,000 DOM nodes to ≤ 30 interactive targets.'
        },
        {
          id: 'storage-subsystem',
          label: 'Episodic Memory',
          role: 'Local Persistence',
          tech: 'SQLite (runtime.db)',
          notes: 'Stores flight recorder telemetry, DOM diff snapshots, and credential vaults.'
        },
        {
          id: 'model-gateway',
          label: 'Model Gateway',
          role: 'Air-Gap LLM Router',
          tech: 'Ollama 3B + Cloud Ring',
          notes: 'PII sanitizer tokenizes emails/phones before cloud dispatch; fallback to local 3B model.'
        }
      ],
      edges: [
        { from: 'client-plugin', to: 'runtime-engine', protocol: 'IPC', description: 'Task dispatch & step objectives' },
        { from: 'runtime-engine', to: 'browser-engine', protocol: 'CDP', description: 'Low-level input dispatch & DOM evaluation' },
        { from: 'browser-engine', to: 'axtree-pruner', protocol: 'IPC', description: 'Raw accessibility tree snapshot' },
        { from: 'axtree-pruner', to: 'model-gateway', protocol: 'IPC', description: 'Pruned candidates (≤30 items) to LLM' },
        { from: 'runtime-engine', to: 'storage-subsystem', protocol: 'IPC', description: 'Episodic action state logging' }
      ],
      invariants: [
        'Zero raw HTML is ever sent to LLMs; only pruned accessibility candidates are forwarded.',
        'Zero PII leakage: deterministic regex masking happens locally before any network dispatch.',
        'Operates on real Chrome profile (port 9222) to retain real user session cookies and bypass bot challenges.',
        'Runs completely offline on consumer 6GB VRAM GPUs using quantized 3B local models.'
      ],
      tradeOffs: [
        {
          decision: 'Chrome CDP vs. Playwright/Puppeteer',
          chosen: 'Direct CDP socket attachment on port 9222',
          alternative: 'Playwright headless browser wrapper',
          reason: 'Playwright launches isolated ephemeral browsers that trigger Cloudflare and bot checks. Direct CDP connects to the user’s authentic Chrome session with intact logins.'
        },
        {
          decision: 'Perception Strategy',
          chosen: 'Accessibility Tree (AXTree) pruning',
          alternative: 'Vision model screenshots (VLM)',
          reason: 'Vision models cost 10x-50x more latency and VRAM. AXTree deterministic filtering is instant, consumes 0 vision tokens, and extracts exact bounding coordinates.'
        }
      ]
    }
  },
  {
    id: 'kokoro-chat-reader',
    title: 'Kokoro Chat Reader',
    tagline: 'Streaming Text-to-Speech Companion for Modern AI Chats',
    tier: 'flagship',
    category: 'Browser Extension',
    status: 'Finished Product',
    problem: 'Reading long, multi-paragraph AI responses from ChatGPT, Claude, and DeepSeek causes screen fatigue. Existing browser extensions either read the entire page, crash during dynamic token streaming, or lack fine-grained audio controls.',
    solution: 'A Chrome Manifest V3 extension that attaches inline "▶ Read" buttons to live AI message blocks, observes token streams in real-time, filters markdown and code blocks, and renders a compact, persistent audio HUD with scrubbing and speed controls.',
    techStack: ['Chrome Manifest V3', 'JavaScript (ES2022)', 'DOM MutationObserver', 'HTML5 Audio API', 'CSS3 Transitions'],
    metrics: [
      { label: 'Supported Platforms', value: 'ChatGPT, Claude, DeepSeek' },
      { label: 'Token Stream Latency', value: '< 16ms observer lag' },
      { label: 'Memory Footprint', value: '< 12 MB background worker' },
      { label: 'Code Block Filter', value: '100% regex code avoidance' }
    ],
    githubUrl: 'https://github.com/manish465/kokoro-chat-reader',
    hasInteractiveSim: 'kokoro',
    architecture: {
      nodes: [
        {
          id: 'mutation-observer',
          label: 'DOM Stream Observer',
          role: 'Dynamic Detector',
          tech: 'MutationObserver API',
          notes: 'Monitors chat containers; detects new message blocks and streaming token appends.'
        },
        {
          id: 'button-injector',
          label: 'Button Injector',
          role: 'UI Injector',
          tech: 'Shadow DOM / Inline injection',
          notes: 'Mounts non-intrusive "▶ Read" buttons on assistant response headers.'
        },
        {
          id: 'content-cleaner',
          label: 'Text Sanitizer',
          role: 'Markdown & Code Filter',
          tech: 'Regex & AST Traversal',
          notes: 'Strips code blocks, backticks, LaTeX formulas, and raw markdown syntax prior to synthesis.'
        },
        {
          id: 'audio-hud',
          label: 'Audio Control HUD',
          role: 'Playback State Machine',
          tech: 'Draggable DOM HUD',
          notes: 'Manages Play, Pause, ±10s scrubbing, speed multiplier (1x-2x), and persistent state.'
        }
      ],
      edges: [
        { from: 'mutation-observer', to: 'button-injector', protocol: 'DOM Event', description: 'Triggers button mount on new message node' },
        { from: 'button-injector', to: 'content-cleaner', protocol: 'DOM Event', description: 'Extracts message text content on user click' },
        { from: 'content-cleaner', to: 'audio-hud', protocol: 'IPC', description: 'Dispatches cleaned text to speech synthesis buffer' }
      ],
      invariants: [
        'Idempotent button injection: duplicate buttons are never injected during rapid stream mutations.',
        'Code blocks are cleanly ignored when "Skip Code" setting is active, preventing TTS from reading syntax aloud.',
        'Non-blocking: TTS parsing runs off the main paint thread to maintain 60 FPS scrolling in the host chat.'
      ],
      tradeOffs: [
        {
          decision: 'DOM Event Architecture',
          chosen: 'Scoped MutationObserver on chat container',
          alternative: 'Global polling timer (setInterval)',
          reason: 'Interval polling consumes background CPU and misses transient stream tokens. Scoped MutationObserver provides zero-CPU idle and sub-frame reaction time.'
        },
        {
          decision: 'Audio UI Rendering',
          chosen: 'Lightweight draggable overlay HUD',
          alternative: 'Browser extension popup window',
          reason: 'Browser popups close as soon as the user clicks anywhere on the webpage. An overlay HUD persists across long audio playback sessions.'
        }
      ]
    }
  },
  {
    id: 'readme-gen-ai',
    title: 'ReadMeGen.AI',
    tagline: 'Microservices Platform for Automated Repository Documentation',
    tier: 'flagship',
    category: 'Full-Stack AI',
    status: 'Finished Product',
    problem: 'Writing comprehensive, production-grade README files for multi-module distributed repositories is tedious and often results in out-of-date or incomplete documentation.',
    solution: 'A decoupled microservices application that inspects GitHub repository trees, parses module dependencies, and coordinates with local LLMs (Ollama / Gemma) to generate production-quality technical READMEs with live previews.',
    techStack: ['React 19', 'TypeScript', 'Spring Boot 3', 'Spring AI', 'Ollama (Gemma)', 'Consul', 'Docker Compose'],
    metrics: [
      { label: 'Frontend Engine', value: 'React 19 + TypeScript' },
      { label: 'Service Discovery', value: 'HashiCorp Consul' },
      { label: 'LLM Runtime', value: 'Spring AI + Ollama' },
      { label: 'Orchestration', value: 'Docker Compose' }
    ],
    githubUrl: 'https://github.com/manish465/ReadmeGen.Ai',
    hasInteractiveSim: null,
    architecture: {
      nodes: [
        {
          id: 'frontend',
          label: 'React 19 Frontend',
          role: 'Interactive UI',
          tech: 'React 19 / TypeScript',
          notes: 'Real-time Markdown editor, live split-pane preview, and repository branch selector.'
        },
        {
          id: 'prompt-service',
          label: 'Prompt Service',
          role: 'Context Builder',
          tech: 'Spring Boot 3',
          notes: 'Fetches GitHub file trees, analyzes package manifests (pom.xml, package.json), and structures prompts.'
        },
        {
          id: 'readme-service',
          label: 'README Service',
          role: 'Document Assembler',
          tech: 'Spring Boot 3',
          notes: 'Orchestrates section generation, handles retry logic, and packages downloadable assets.'
        },
        {
          id: 'llm-service',
          label: 'LLM Gateway',
          role: 'Inference Engine',
          tech: 'Spring AI + Ollama',
          notes: 'Interfaces with local Gemma models with streaming chunk generation.'
        },
        {
          id: 'consul',
          label: 'Consul Registry',
          role: 'Service Discovery',
          tech: 'HashiCorp Consul',
          notes: 'Dynamic registration and heartbeat health monitoring for all backend nodes.'
        }
      ],
      edges: [
        { from: 'frontend', to: 'readme-service', protocol: 'HTTP', description: 'User generation request & custom instructions' },
        { from: 'readme-service', to: 'prompt-service', protocol: 'HTTP', description: 'Requests repository AST & file context' },
        { from: 'readme-service', to: 'llm-service', protocol: 'HTTP', description: 'Dispatches structured prompt payloads' },
        { from: 'prompt-service', to: 'consul', protocol: 'HTTP', description: 'Service registration & health checks' },
        { from: 'llm-service', to: 'consul', protocol: 'HTTP', description: 'Service registration & health checks' }
      ],
      invariants: [
        'Decoupled inference: Backend never relies on proprietary cloud APIs; fully operable with local Ollama instances.',
        'Service discovery: Services resolve each other dynamically via Consul without hardcoded hostnames or ports.'
      ],
      tradeOffs: [
        {
          decision: 'Microservices Split vs. Monolith',
          chosen: 'Decoupled services (Prompt, Readme, LLM)',
          alternative: 'Single Spring Boot monolithic app',
          reason: 'Isolating the LLM inference service allows independent GPU scaling and container resource allocation without starving the GitHub tree parser.'
        }
      ]
    }
  },
  {
    id: 'distributed-rate-limiter',
    title: 'Distributed Rate Limiter Ecosystem',
    tagline: 'High-Throughput Token Bucket & Sliding Window Spring Boot Starter',
    tier: 'distributed',
    category: 'Distributed Systems',
    status: 'Production Ready',
    problem: 'In high-concurrency ecommerce microservices, unprotected endpoints face cascading failures during traffic surges, while external API gateways introduce cross-datacenter latency hops for internal service-to-service calls.',
    solution: 'An in-process, auto-configuring Spring Boot Starter (`rate-limiter-core`) with custom `@RateLimited` AOP annotation, Redis-backed sliding window/token bucket storage, and asynchronous breach event streaming over Kafka to decouple audit pipelines.',
    techStack: ['Java 17', 'Spring Boot 3', 'Spring AOP', 'Redis', 'Apache Kafka', 'MongoDB', 'Elasticsearch', 'Docker'],
    metrics: [
      { label: 'Throughput Overhead', value: '< 1.2ms Redis lookup' },
      { label: 'Starter Auto-Config', value: 'Zero-XML Spring AutoConfig' },
      { label: 'Event Telemetry', value: 'Asynchronous Kafka streaming' },
      { label: 'Ecosystem Modules', value: 'ProductService, SearchService' }
    ],
    githubUrl: 'https://github.com/manish465/DistributedRateLimiter',
    hasInteractiveSim: 'rate-limiter',
    architecture: {
      nodes: [
        {
          id: 'client-request',
          label: 'Inbound HTTP Traffic',
          role: 'Traffic Source',
          tech: 'REST / HTTP API',
          notes: 'High-concurrency requests entering ProductService and SearchService controllers.'
        },
        {
          id: 'rate-limiter-aspect',
          label: '@RateLimited AOP Aspect',
          role: 'Method Interceptor',
          tech: 'Spring AOP (rate-limiter-core)',
          notes: 'Extracts client IP or API key key-space; checks token limits before method execution.'
        },
        {
          id: 'redis-store',
          label: 'Redis Cache Cluster',
          role: 'Atomic Counter',
          tech: 'Redis (Fixed/Sliding Window)',
          notes: 'Atomic decrement and window expiration using Redis Lua scripts.'
        },
        {
          id: 'service-logic',
          label: 'Business Service (Product / Search)',
          role: 'Service Execution',
          tech: 'Spring Boot 3 / MongoDB / ES',
          notes: 'Executes database query if request passes token verification.'
        },
        {
          id: 'kafka-topic',
          label: 'Kafka Telemetry Topic',
          role: 'Audit Event Stream',
          tech: 'Apache Kafka',
          notes: 'Asynchronously streams rate-limit breach events (HTTP 429) for fraud and abuse analysis.'
        }
      ],
      edges: [
        { from: 'client-request', to: 'rate-limiter-aspect', protocol: 'HTTP', description: 'Inbound method invocation' },
        { from: 'rate-limiter-aspect', to: 'redis-store', protocol: 'Redis', description: 'Atomic token check & decrement' },
        { from: 'rate-limiter-aspect', to: 'service-logic', protocol: 'AOP', description: 'Proceeds with method execution if allowed' },
        { from: 'rate-limiter-aspect', to: 'kafka-topic', protocol: 'Kafka', description: 'Streams breach notification if throttled' }
      ],
      invariants: [
        'Atomic token replenishment: token counts never desynchronize across concurrent thread pools.',
        'Non-blocking telemetry: writing 429 violation records to Kafka occurs asynchronously off the critical HTTP response path.',
        'Auto-configuration: importing `rate-limiter-core` in `pom.xml` activates rate-limiting without manual bean wiring.'
      ],
      tradeOffs: [
        {
          decision: 'Library Starter vs. Central Gateway',
          chosen: 'In-process Spring Boot Starter library',
          alternative: 'Central Nginx / Kong API Gateway',
          reason: 'A central gateway creates a single point of failure and adds network hops. An in-process starter allows fine-grained, method-level rate limiting based on internal service parameters.'
        },
        {
          decision: 'Telemetry Decoupling',
          chosen: 'Async Kafka event publishing',
          alternative: 'Synchronous relational database logging',
          reason: 'Synchronous DB writes under a DDoS or burst attack will exhaust the connection pool. Kafka buffering guarantees that audit telemetry never degrades core database throughput.'
        }
      ]
    }
  },
  {
    id: 'event-service-microservice',
    title: 'Event Service Microservice Platform',
    tagline: 'Enterprise Spring Cloud Distributed Architecture',
    tier: 'distributed',
    category: 'Distributed Systems',
    status: 'Production Ready',
    problem: 'Monolithic event booking applications suffer from coupled deployments where sudden ticket release spikes crash user authentication and profile management services.',
    solution: 'A decomposed microservice architecture with dedicated user-service, auth-service, discovery-service, and event-service utilizing Spring Cloud Eureka and JWT gateway authorization with documented UML domain boundaries.',
    techStack: ['Java 17', 'Spring Boot 3', 'Spring Cloud', 'Netflix Eureka', 'Spring Security', 'JWT', 'Maven Multi-Module'],
    metrics: [
      { label: 'Architecture', value: '4 Independent Microservices' },
      { label: 'Registry', value: 'Eureka Discovery Server' },
      { label: 'Security', value: 'Stateless JWT Token Gateway' },
      { label: 'Design Artifacts', value: 'Full UML Component Diagrams' }
    ],
    githubUrl: 'https://github.com/manish465/event-service-microservice',
    hasInteractiveSim: null,
    architecture: {
      nodes: [
        {
          id: 'discovery-service',
          label: 'Discovery Service',
          role: 'Service Registry',
          tech: 'Spring Cloud Eureka',
          notes: 'Maintains live heartbeat registry of all active microservice instances.'
        },
        {
          id: 'auth-service',
          label: 'Auth Service',
          role: 'Security Provider',
          tech: 'Spring Security / JWT',
          notes: 'Issues signed cryptographic JWT tokens and handles user authentication.'
        },
        {
          id: 'user-service',
          label: 'User Service',
          role: 'Profile Domain',
          tech: 'Spring Boot 3 / JPA',
          notes: 'Manages user registration, profiles, and email verification workflows.'
        },
        {
          id: 'event-service',
          label: 'Event Service',
          role: 'Event Domain',
          tech: 'Spring Boot 3 / JPA',
          notes: 'Handles event creation, attendee quotas, booking status, and administrative approval.'
        }
      ],
      edges: [
        { from: 'auth-service', to: 'discovery-service', protocol: 'HTTP', description: 'Instance heartbeat registration' },
        { from: 'user-service', to: 'discovery-service', protocol: 'HTTP', description: 'Instance heartbeat registration' },
        { from: 'event-service', to: 'discovery-service', protocol: 'HTTP', description: 'Instance heartbeat registration' },
        { from: 'event-service', to: 'auth-service', protocol: 'HTTP', description: 'Token validation & role verification' }
      ],
      invariants: [
        'Stateless session state: services communicate without shared HTTP sessions; all authorization is encoded in JWT claims.',
        'Independent database schemas: each microservice owns its domain tables and schema migrations.'
      ],
      tradeOffs: [
        {
          decision: 'Microservices Boundary Split',
          chosen: 'Separated Auth, User, and Event domains',
          alternative: 'Combined User + Auth service',
          reason: 'Separating Auth prevents heavy user profile updates from stalling token signature and verification throughput.'
        }
      ]
    }
  }
];
