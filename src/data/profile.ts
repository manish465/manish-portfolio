import { Profile } from "../types";

export const profileData: Profile = {
    name: "Manish Sahu",
    title: "Systems & Product Engineer",
    location: "India",
    thesis: "I build software systems, browser runtimes, and local-first tools from first principles. My focus is on understanding architectural trade-offs, designing resilient data pipelines, and creating intentional user-facing products rather than superficial prototypes.",
    corePillars: [
        {
            title: "Distributed Infrastructure",
            subtitle: "Resilient control planes & high-throughput pipelines",
            description:
                "Designing partitioned event queues, custom Spring Boot starter abstractions, consistent hashing ring topologies, and cache-backed rate limiters that survive network partitions.",
        },
        {
            title: "Browser Runtime & Tooling",
            subtitle: "Deterministic automation & DOM extension engines",
            description:
                "Building deep browser integrations with Chrome DevTools Protocol (CDP), zero-token accessibility tree pruning, live DOM mutation streams, and low-latency audio pipelines.",
        },
        {
            title: "First-Principles Engineering",
            subtitle: "Understanding mechanisms by building them from scratch",
            description:
                "Implementing custom inverted index search algorithms, perceptron backpropagation networks, and custom state machines rather than assembling black-box dependencies.",
        },
    ],
    currentBets: [
        {
            title: "WebOS.ai",
            desc: "Hardware-aware browser substrate executing local 3B grounder models under 6GB VRAM.",
            status: "Active Build",
        },
        {
            title: "Consistent Shard Migration",
            desc: "Testing zero-lock database rebalancing invariants in distributed control planes.",
            status: "Lab Benchmark",
        },
        {
            title: "Local-First Reasoning Substrates",
            desc: "Preserving continuity of engineering decision-making in personal desktop software.",
            status: "Research",
        },
    ],
    socials: {
        github: "https://github.com/manish465",
        linkedin: "https://www.linkedin.com/in/sahum/",
        email: "contact@manishsahu.dev",
    },
    resumePdfUrl: "/resume.pdf",
};
