import { LabExperiment } from '../types';

export const labData: LabExperiment[] = [
  {
    id: 'adaptive-shard-manager',
    title: 'Adaptive Shard Manager (ASM)',
    hypothesis: 'Can a distributed control plane orchestrate zero-downtime database shard rebalancing and migration across dynamic nodes without coordinator deadlocks?',
    status: 'Prototype Validated',
    completionPct: 65,
    keyTakeaway: 'Implementing MD5 Consistent Hashing with virtual nodes prevents hash clustering and ensures only K/N keys re-map when a shard fails, while an asynchronous RebalancePlanner minimizes live lock contention.',
    techStack: ['Java 21', 'Spring Boot 3', 'Consistent Hashing Ring', 'Virtual Nodes', 'MD5', 'Docker'],
    githubUrl: 'https://github.com/manish465/adaptive-shard-manager',
    hasInteractiveSim: 'hash-ring'
  },
  {
    id: 'search-engine-from-scratch',
    title: 'Distributed Search Engine From Scratch',
    hypothesis: 'How do production search engines structure inverted indexes, posting lists, and BM25 relevance scorers under memory-mapped constraints without relying on Lucene or Elasticsearch?',
    status: 'In Progress',
    completionPct: 55,
    keyTakeaway: 'Building tokenizers, postings lists, and BM25 term frequency/inverse document frequency (TF-IDF) scoring from scratch demonstrates the memory footprint trade-offs of skip-lists and document dictionary compression.',
    techStack: ['Java 17', 'Inverted Index', 'BM25 Scorer', 'Postings List', 'Shard Registry', 'Maven'],
    githubUrl: 'https://github.com/manish465/search-engine-project',
    hasInteractiveSim: null
  },
  {
    id: 'neural-network-from-scratch',
    title: 'Neural Network & Transformer Foundations From Scratch',
    hypothesis: 'Deriving perceptrons, sigmoid neurons, multi-layer backpropagation, and self-attention from pure matrix calculus exposes how weight gradients saturate and why residual connections are essential.',
    status: 'Mathematical Foundation',
    completionPct: 90,
    keyTakeaway: 'Writing forward/backward passes in pure mathematical matrix operations demystifies auto-differentiation frameworks and reveals why numerical stability matters in deep network training.',
    techStack: ['Python', 'NumPy', 'Jupyter Notebook', 'Matrix Calculus', 'Backpropagation'],
    githubUrl: 'https://github.com/manish465/neural-network-from-scratch',
    hasInteractiveSim: null
  },
  {
    id: 'asl-sign-language-cnn',
    title: 'Real-Time ASL Sign Language Recognition',
    hypothesis: 'Can a lightweight 3-layer Convolutional Neural Network achieve real-time webcam gesture classification across 29 classes under consumer CPU latency?',
    status: 'Completed Experiment',
    completionPct: 100,
    keyTakeaway: 'Trained on 64x64 RGB frames with MaxPooling and ReLU activations, achieving stable real-time classification for 26 alphabets plus space/delete gestures directly from webcam input streams.',
    techStack: ['PyTorch', 'OpenCV', 'CNN (3 Conv + 2 FC Layers)', 'Python 3.10'],
    githubUrl: 'https://github.com/manish465/Sign-language',
    hasInteractiveSim: null
  },
  {
    id: 'java-opengl-game-engine',
    title: 'Java OpenGL Graphics Pipeline From Scratch',
    hypothesis: 'Constructing an immediate and indexed rendering pipeline in LWJGL/OpenGL exposes low-level GPU buffer layouts, vertex shaders, and game loop timing precision.',
    status: 'Completed Experiment',
    completionPct: 80,
    keyTakeaway: 'Direct management of Vertex Buffer Objects (VBO), Vertex Array Objects (VAO), and shader compilation routines provides foundational insights into graphics driver overhead and frame delta timing.',
    techStack: ['Java', 'OpenGL', 'LWJGL', 'GLSL Shaders'],
    githubUrl: 'https://github.com/manish465/game-engine',
    hasInteractiveSim: null
  }
];
