import { ProductionExperience } from '../types';

export const experienceData: ProductionExperience[] = [
  {
    period: '2023 — Present',
    role: 'Senior Software Engineer / Backend Lead',
    organization: 'Enterprise & Distributed Engineering',
    summary: 'Architected and maintained high-throughput microservices, event streaming backends, and decoupled client integration layers across distributed enterprise deployments.',
    systemsOwned: [
      'Core Event Streaming & Kafka Consumer Pipelines for asynchronous audit telemetry',
      'Distributed Rate-Limiting and API Protection layers guarding downstream database clusters',
      'Multi-Service Authentication Gateways with stateless JWT verification and Eureka discovery'
    ],
    scaleMetrics: [
      { metric: 'P99 Latency Target', detail: '< 25ms internal service-to-service roundtrips' },
      { metric: 'Reliability & Uptime', detail: '99.95% availability maintained across peak load events' },
      { metric: 'Service Boundary Decoupling', detail: 'Transitioned monolithic services into 4 independent deployable domains' }
    ],
    keyDecisions: [
      'Replaced synchronous REST-to-database audit calls with asynchronous Kafka event buffering, eliminating connection pool exhaustion during traffic spikes.',
      'Introduced reusable Spring Boot Starter abstractions to enforce security and rate-limiting policies across all microservices without boilerplate duplication.',
      'Implemented Redis cluster Lua scripts for atomic sliding window token decrementing, eliminating race conditions under concurrent multi-pod deployments.'
    ]
  },
  {
    period: '2021 — 2023',
    role: 'Full-Stack Software Engineer',
    organization: 'Web Platforms & Cloud Solutions',
    summary: 'Built scalable web applications, real-time user interfaces, and backend REST APIs with an emphasis on performance optimization, responsive layouts, and robust test suites.',
    systemsOwned: [
      'Interactive Web Client Platforms using modern React, TypeScript, and state machines',
      'Relational Database Modeling & Index Optimization in PostgreSQL and MySQL',
      'Automated CI/CD Deployment pipelines with Docker containerization'
    ],
    scaleMetrics: [
      { metric: 'Client-Side Performance', detail: 'Sub-second First Contentful Paint and 60 FPS interactions' },
      { metric: 'API Integration', detail: 'Designed 30+ clean REST endpoints with strict OpenAPI documentation' }
    ],
    keyDecisions: [
      'Migrated legacy client-side state models to unidirectional data flows, reducing UI synchronization defects by 40%.',
      'Refactored database query execution plans, adding composite indexes on high-cardinality filters to reduce query time from 450ms to 18ms.'
    ]
  }
];
