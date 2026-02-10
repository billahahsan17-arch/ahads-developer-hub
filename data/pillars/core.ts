import { Pillar } from '../../types';

export const CORE_PILLARS: Pillar[] = [
  {
    id: 'pillar-b',
    code: 'B',
    title: 'Computer Science Core',
    description: 'The immutable laws. Systems, Data, Networking, and Architecture.',
    color: 'text-emerald-600',
    icon: 'Cpu',
    sections: [
      {
        id: 'b-1',
        title: 'Data Structures & Algorithms',
        subSections: [
            {
                id: 'b-1-dsa', title: 'Problem Solving', description: 'Foundations.',
                subSubSections: [
                    { id: 'b-1-prob', title: 'Problem Solving', description: 'Approach', contentPoints: ['Problem Solving'] },
                    { id: 'b-1-perf', title: 'Performance Thinking', description: 'Big O', contentPoints: ['Performance Thinking'] },
                    { id: 'b-1-opt', title: 'Real-World Optimization', description: 'Beyond theory', contentPoints: ['Real-World Optimization'] },
                    { id: 'b-1-trade', title: 'Trade-offs', description: 'Space vs Time', contentPoints: ['Trade-offs'] },
                    { id: 'b-1-int', title: 'Interview Readiness', description: 'Patterns', contentPoints: ['Interview Readiness'] }
                ]
            }
        ]
      },
      {
        id: 'b-2',
        title: 'Operating Systems',
        subSections: [
            {
                id: 'b-2-os', title: 'Management', description: 'Resources.',
                subSubSections: [
                    { id: 'b-2-proc', title: 'Processes', description: 'Execution', contentPoints: ['Processes'] },
                    { id: 'b-2-thrd', title: 'Threads', description: 'Concurrency', contentPoints: ['Threads'] },
                    { id: 'b-2-sch', title: 'Scheduling', description: 'CPU time', contentPoints: ['Scheduling'] },
                    { id: 'b-2-mem', title: 'Memory Management', description: 'Allocation', contentPoints: ['Memory Management'] },
                    { id: 'b-2-fs', title: 'File Systems', description: 'Storage', contentPoints: ['File Systems'] },
                    { id: 'b-2-sys', title: 'System Calls', description: 'Kernel Interface', contentPoints: ['System Calls'] }
                ]
            }
        ]
      },
      {
        id: 'b-3',
        title: 'Computer Networks',
        subSections: [
            {
                id: 'b-3-net', title: 'Connectivity', description: 'Transport.',
                subSubSections: [
                    { id: 'b-3-int', title: 'Internet Fundamentals', description: 'How it works', contentPoints: ['Internet Fundamentals'] },
                    { id: 'b-3-tcp', title: 'TCP/IP', description: 'Packets', contentPoints: ['TCP/IP'] },
                    { id: 'b-3-http', title: 'HTTP/HTTPS', description: 'Web protocols', contentPoints: ['HTTP/HTTPS'] },
                    { id: 'b-3-dbg', title: 'Network Debugging', description: 'Tools', contentPoints: ['Network Debugging'] },
                    { id: 'b-3-lat', title: 'Latency & Reliability', description: 'Physics', contentPoints: ['Latency & Reliability'] }
                ]
            }
        ]
      },
      {
        id: 'b-4',
        title: 'Databases (Internals)',
        subSections: [
            {
                id: 'b-4-db', title: 'Persistence', description: 'Storage.',
                subSubSections: [
                    { id: 'b-4-eng', title: 'Storage Engines', description: 'B-Trees, LSM', contentPoints: ['Storage Engines'] },
                    { id: 'b-4-idx', title: 'Indexing', description: 'Search speed', contentPoints: ['Indexing'] },
                    { id: 'b-4-qry', title: 'Query Optimization', description: 'Plans', contentPoints: ['Query Optimization'] },
                    { id: 'b-4-tx', title: 'Transactions', description: 'ACID', contentPoints: ['Transactions'] },
                    { id: 'b-4-conc', title: 'Concurrency Control', description: 'Locking', contentPoints: ['Concurrency Control'] },
                    { id: 'b-4-scl', title: 'Scaling', description: 'Sharding', contentPoints: ['Scaling'] }
                ]
            }
        ]
      },
      {
        id: 'b-5',
        title: 'Concurrency & Parallelism',
        subSections: [
            {
                id: 'b-5-conc', title: 'Execution', description: 'Simultaneity.',
                subSubSections: [
                    { id: 'b-5-thrd', title: 'Threads', description: 'Basics', contentPoints: ['Threads'] },
                    { id: 'b-5-async', title: 'Async Models', description: 'Event loops', contentPoints: ['Async Models'] },
                    { id: 'b-5-sync', title: 'Synchronization', description: 'Coordination', contentPoints: ['Synchronization'] },
                    { id: 'b-5-race', title: 'Race Conditions', description: 'Bugs', contentPoints: ['Race Conditions'] },
                    { id: 'b-5-dead', title: 'Deadlocks', description: 'Stalls', contentPoints: ['Deadlocks'] }
                ]
            }
        ]
      },
      {
        id: 'b-6',
        title: 'Memory & Storage Systems',
        subSections: [
            {
                id: 'b-6-mem', title: 'Hierarchy', description: 'Access.',
                subSubSections: [
                    { id: 'b-6-ram', title: 'RAM vs Disk', description: 'Speed gap', contentPoints: ['RAM vs Disk'] },
                    { id: 'b-6-cach', title: 'Caching', description: 'Locality', contentPoints: ['Caching'] },
                    { id: 'b-6-virt', title: 'Virtual Memory', description: 'Abstraction', contentPoints: ['Virtual Memory'] },
                    { id: 'b-6-pers', title: 'Persistence', description: 'Durability', contentPoints: ['Persistence'] },
                    { id: 'b-6-perf', title: 'Performance Trade-offs', description: 'Cost vs Speed', contentPoints: ['Performance Trade-offs'] }
                ]
            }
        ]
      },
      {
        id: 'b-7',
        title: 'I/O Systems & Performance',
        subSections: [
            {
                id: 'b-7-io', title: 'Input/Output', description: 'Throughput.',
                subSubSections: [
                    { id: 'b-7-blk', title: 'Blocking vs Non-Blocking I/O', description: 'Models', contentPoints: ['Blocking vs Non-Blocking I/O'] },
                    { id: 'b-7-dsk', title: 'Disk I/O', description: 'Storage access', contentPoints: ['Disk I/O'] },
                    { id: 'b-7-net', title: 'Network I/O', description: 'Socket access', contentPoints: ['Network I/O'] },
                    { id: 'b-7-buf', title: 'Buffers', description: 'Data holding', contentPoints: ['Buffers'] },
                    { id: 'b-7-thru', title: 'Throughput vs Latency', description: 'Metrics', contentPoints: ['Throughput vs Latency'] }
                ]
            }
        ]
      },
      {
        id: 'b-8',
        title: 'Computer Architecture (Applied)',
        subSections: [
            {
                id: 'b-8-arch', title: 'Hardware', description: 'Silicon.',
                subSubSections: [
                    { id: 'b-8-cpu', title: 'CPU', description: 'Processor basics', contentPoints: ['CPU'] },
                    { id: 'b-8-cach', title: 'Cache Hierarchy', description: 'L1/L2/L3', contentPoints: ['Cache Hierarchy'] },
                    { id: 'b-8-pipe', title: 'Instruction Pipelines', description: 'Execution', contentPoints: ['Instruction Pipelines'] },
                    { id: 'b-8-numa', title: 'NUMA Awareness', description: 'Memory access', contentPoints: ['NUMA Awareness'] }
                ]
            }
        ]
      },
      {
        id: 'b-9',
        title: 'Compilers & Runtimes (Practical)',
        subSections: [
            {
                id: 'b-9-comp', title: 'Translation', description: 'Execution.',
                subSubSections: [
                    { id: 'b-9-flow', title: 'Compilation Flow', description: 'Src to Bin', contentPoints: ['Compilation Flow'] },
                    { id: 'b-9-run', title: 'Runtime Models', description: 'Execution env', contentPoints: ['Runtime Models'] },
                    { id: 'b-9-jit', title: 'JIT', description: 'Just-In-Time', contentPoints: ['JIT'] },
                    { id: 'b-9-gc', title: 'Garbage Collection', description: 'Memory mgmt', contentPoints: ['Garbage Collection'] },
                    { id: 'b-9-opt', title: 'Optimization Basics', description: 'Code improv', contentPoints: ['Optimization Basics'] }
                ]
            }
        ]
      },
      {
        id: 'b-10',
        title: 'Distributed Systems (Foundations)',
        subSections: [
            {
                id: 'b-10-dist', title: 'Scale', description: 'Coordination.',
                subSubSections: [
                    { id: 'b-10-cons', title: 'Consistency', description: 'Data state', contentPoints: ['Consistency'] },
                    { id: 'b-10-avail', title: 'Availability', description: 'Uptime', contentPoints: ['Availability'] },
                    { id: 'b-10-fault', title: 'Fault Tolerance', description: 'Resilience', contentPoints: ['Fault Tolerance'] },
                    { id: 'b-10-rep', title: 'Replication', description: 'Copies', contentPoints: ['Replication'] },
                    { id: 'b-10-con', title: 'Consensus Basics', description: 'Agreement', contentPoints: ['Consensus Basics'] }
                ]
            }
        ]
      },
      {
        id: 'b-11',
        title: 'Time, Ordering & Clocks',
        subSections: [
            {
                id: 'b-11-time', title: 'Synchronization', description: 'Order.',
                subSubSections: [
                    { id: 'b-11-sys', title: 'System Time', description: 'Wall clock', contentPoints: ['System Time'] },
                    { id: 'b-11-skew', title: 'Clock Skew', description: 'Drift', contentPoints: ['Clock Skew'] },
                    { id: 'b-11-ord', title: 'Ordering Guarantees', description: 'Sequence', contentPoints: ['Ordering Guarantees'] },
                    { id: 'b-11-evt', title: 'Event Timing', description: 'Causality', contentPoints: ['Event Timing'] }
                ]
            }
        ]
      },
      {
        id: 'b-12',
        title: 'Failure Models & Debug Thinking',
        subSections: [
            {
                id: 'b-12-fail', title: 'Resilience', description: 'Reliability.',
                subSubSections: [
                    { id: 'b-12-crash', title: 'Crash vs Partial Failure', description: 'Types of breaks', contentPoints: ['Crash vs Partial Failure'] },
                    { id: 'b-12-retry', title: 'Retry Logic', description: 'Recovery', contentPoints: ['Retry Logic'] },
                    { id: 'b-12-back', title: 'Backpressure', description: 'Load mgmt', contentPoints: ['Backpressure'] },
                    { id: 'b-12-obs', title: 'Observability Basics', description: 'Visibility', contentPoints: ['Observability Basics'] }
                ]
            }
        ]
      },
      {
        id: 'b-13',
        title: 'Security Fundamentals (CS-Level)',
        subSections: [
            {
                id: 'b-13-sec', title: 'Protection', description: 'Design.',
                subSubSections: [
                    { id: 'b-13-mod', title: 'Threat Modeling', description: 'Analysis', contentPoints: ['Threat Modeling'] },
                    { id: 'b-13-trust', title: 'Trust Boundaries', description: 'Zones', contentPoints: ['Trust Boundaries'] },
                    { id: 'b-13-des', title: 'Secure Design Thinking', description: 'Mindset', contentPoints: ['Secure Design Thinking'] }
                ]
            }
        ]
      }
    ]
  }
];