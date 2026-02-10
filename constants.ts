import { Pillar } from './types';
import { SYSTEM_PILLARS } from './data/pillars/system';
import { CORE_PILLARS } from './data/pillars/core';
import { BACKEND_PILLARS } from './data/pillars/backend';
import { INTELLIGENCE_PILLARS } from './data/pillars/intelligence';
import { SECURITY_PILLARS } from './data/pillars/security';
import { VISUAL_PILLARS } from './data/pillars/visual';
import { MASTERY_PILLARS } from './data/pillars/mastery';

// Helper to sort by Code (A, B, C...)
const ALL_PILLARS_UNSORTED = [
    ...SYSTEM_PILLARS,
    ...CORE_PILLARS,
    ...BACKEND_PILLARS,
    ...INTELLIGENCE_PILLARS,
    ...SECURITY_PILLARS,
    ...VISUAL_PILLARS,
    ...MASTERY_PILLARS
];

// Deduplicate just in case of overlap in my manual grouping above
const uniquePillarsMap = new Map();
ALL_PILLARS_UNSORTED.forEach(p => uniquePillarsMap.set(p.code, p));

export const PILLARS: Pillar[] = Array.from(uniquePillarsMap.values()).sort((a, b) => a.code.localeCompare(b.code));

export const MOCK_DEEP_GUIDE = `
### 1. The Physics of the Problem (Concept)

Engineering is not about memorizing syntax; it is about managing constraints. For this topic, we are dealing with the fundamental trade-off between **latency** (how fast one unit moves) and **throughput** (how many units move per second).

Whether you are designing a Rust memory allocator or a distributed database, the physics remains the same:
*   **Consistency** costs time (latency).
*   **Availability** costs complexity (reconciliation).
*   **Speed** costs safety (or memory).

### 2. The Blueprint (Architecture)

Before writing code, visualize the data flow.
*   **Input**: Raw signal/data enters the system.
*   **Processing**: Transformation occurs (CPU cycles spent).
*   **State**: Data is persisted (Memory/Disk IO).
*   **Output**: Result returned to client.

In high-performance systems, the bottleneck is rarely the CPU; it is the **IO** (Network or Disk) or **Lock Contention** (Concurrency).

### 3. The Build (Implementation Strategy)

When implementing this, follow the **"Make it Work, Make it Right, Make it Fast"** principle.
1.  **Draft**: Write the naive solution to understand the domain.
2.  **Refine**: Apply types, error handling, and modularity.
3.  **Optimize**: Profile it. Find the hot path. Optimize only that.

### 4. The Minefield (Common Pitfalls)

*   **Premature Optimization**: Optimizing code that runs 1% of the time.
*   **Ignoring Failure**: Assuming the network is reliable.
*   **Dependency Hell**: Importing heavy libraries for simple tasks.
*   **Tutorial Purgatory**: Reading about it instead of building it.

### 5. The Mission (Actionable Step)

**Your Directive:**
Do not just read this. Open your IDE.
1.  Build a minimal prototype of this concept.
2.  Break it intentionally (load test it).
3.  Fix the break.

*Click "Generate Guided Path" above to get a specific, tailored guide for this exact topic from Atlas AI.*
`;