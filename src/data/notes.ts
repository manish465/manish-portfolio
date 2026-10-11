import { FieldNote } from '../types';

export const notesData: FieldNote[] = [
  {
    id: 'note-distributed-invariants',
    slug: 'invariants-in-distributed-rebalancing',
    title: 'Invariants in Distributed Rebalancing: Why Consistent Hashing Needs Virtual Nodes',
    date: 'October 2026',
    readingTime: '4 min read',
    topic: 'Distributed Systems',
    summary: 'When distributing keys across a naive hash ring, non-uniform hash distribution leads to hotspots where one physical node handles 40% of the traffic. Virtual nodes solve this geometrically.',
    takeaway: 'Without virtual nodes, adding a node only relieves its immediate neighbor. With virtual nodes, key redistribution is uniformly distributed across the entire fleet.',
    content: [
      'In a naive consistent hash ring with N physical nodes, points are randomly distributed on the integer range [0, 2^32 - 1]. Because standard hash functions do not guarantee uniform distance between a small number of samples, the standard deviation of shard sizes is unacceptably high.',
      'By assigning each physical node 100-250 virtual tokens along the ring (e.g., hash(node_id + "#v" + i)), the variance collapses asymptotically toward 1/sqrt(V).',
      'During migration, an asynchronous control plane must lock only the migrating key-range token boundary rather than the entire shard table. This maintains read availability while keys are cloned to the destination replica.'
    ]
  },
  {
    id: 'note-dom-mutation-streams',
    slug: 'dom-mutation-observers-in-ai-streams',
    title: 'Sub-Frame DOM Mutation Observers in Live AI Stream Pipelines',
    date: 'August 2026',
    readingTime: '3 min read',
    topic: 'Browser Architecture',
    summary: 'How to observe streaming assistant tokens across ChatGPT, Claude, and DeepSeek without locking the browser paint thread or double-mounting UI controls.',
    takeaway: 'Throttle mutation batch events to requestAnimationFrame boundaries and isolate text extraction from the main DOM mutation observer loop.',
    content: [
      'Streaming LLM chat web apps mutate their response containers every few milliseconds as SSE tokens arrive. Standard MutationObserver callbacks can fire hundreds of times per second.',
      'In Kokoro Chat Reader, attaching UI buttons requires debouncing the insertion check and maintaining an internal WeakSet of already-processed message root elements.',
      'When extracting clean text for text-to-speech, raw markdown formatting and code block fences must be filtered using a stateful regex stream parser so the speech synthesis buffer does not pronounce programming syntax or LaTeX markup.'
    ]
  },
  {
    id: 'note-local-first-reasoning',
    slug: 'continuity-of-reasoning-in-local-software',
    title: 'Continuity of Reasoning: Designing Local-First Engineering Tools',
    date: 'May 2026',
    readingTime: '5 min read',
    topic: 'System Design',
    summary: 'Knowledge tools that only store notes lose the trajectory of how decisions were reached. A software engineer needs continuity: Problem → Options → Invariants → Decision.',
    takeaway: 'Architectures should record why alternatives were rejected, not just the code that was committed.',
    content: [
      'Most project management tools treat tasks as static cards. But real engineering reasoning is an evolving causal graph of hypotheses, rejected trade-offs, and invariants discovered through production failures.',
      'A local-first architecture (SQLite, zero network dependencies, client-side indexing) provides sub-millisecond interaction that cloud web apps cannot match.',
      'When building desktop developer tools, offline durability is not a feature—it is the baseline invariant. Data belongs on the machine, in readable formats.'
    ]
  },
  {
    id: 'note-first-principles-matrices',
    slug: 'mathematical-intuition-of-weight-gradients',
    title: 'Deriving Backpropagation From Scratch: Where Intuition Meets Matrix Calculus',
    date: 'March 2026',
    readingTime: '4 min read',
    topic: 'First-Principles',
    summary: 'Building neural networks with NumPy forces you to confront the chain rule across matrix dimensions and understand why vanishing gradients occur in deep layers.',
    takeaway: 'Tensor libraries hide the mechanical details. Implementing backprop by hand reveals the direct physical meaning of transposed Jacobian dot products.',
    content: [
      'When teaching a network to classify handwritten symbols or gestures, the loss gradient with respect to hidden weights requires careful alignment of transpose dimensions (dZ = dA * g\'(Z), dW = (1/m) * dZ · X^T).',
      'Seeing the sigmoid derivative peak at 0.25 immediately explains why networks deeper than three layers without batch normalization or ReLU activations fail to train.',
      'First-principles implementations demystify machine learning from magical black boxes into deterministically verifiable matrix mathematics.'
    ]
  }
];
