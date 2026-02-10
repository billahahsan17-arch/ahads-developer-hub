import { Pillar } from '../../types';

export const SYSTEM_PILLARS: Pillar[] = [
  {
    id: 'pillar-a',
    code: 'A',
    title: 'Language → Sector Map',
    description: 'The definitive polyglot mapping. Validated for industry reality.',
    color: 'text-blue-600',
    icon: 'Code',
    sections: [
      {
        id: 'a-1',
        title: 'Primary & High-Scale',
        subSections: [
          {
            id: 'a-py', title: 'Python', description: 'The Universal Glue.',
            subSubSections: [
                { id: 'a-py-data', title: 'Data Analysis', description: 'Pandas, NumPy, EDA', contentPoints: ['Data Analysis'] },
                { id: 'a-py-ai', title: 'AI / Machine Learning', description: 'PyTorch, TensorFlow', contentPoints: ['AI / Machine Learning'] },
                { id: 'a-py-back', title: 'Backend', description: 'Django, FastAPI', contentPoints: ['Backend'] },
                { id: 'a-py-auto', title: 'Automation', description: 'Scripts, Cron jobs', contentPoints: ['Automation'] },
                { id: 'a-py-script', title: 'Scripting', description: 'Glue code, Utilities', contentPoints: ['Scripting'] },
                { id: 'a-py-sci', title: 'Scientific Computing', description: 'SciPy, Research', contentPoints: ['Scientific Computing'] },
                { id: 'a-py-cyber', title: 'Cyber Tools', description: 'Security scripting, Pentesting', contentPoints: ['Cyber Tools'] },
                { id: 'a-py-api', title: 'API Integration', description: 'Requests, Clients', contentPoints: ['API Integration'] }
            ]
          },
          {
            id: 'a-js', title: 'JavaScript', description: 'The Web Engine.',
            subSubSections: [
                { id: 'a-js-front', title: 'Frontend', description: 'React, Vue, DOM', contentPoints: ['Frontend'] },
                { id: 'a-js-back', title: 'Backend (Node.js)', description: 'Express, NestJS', contentPoints: ['Backend (Node.js)'] },
                { id: 'a-js-full', title: 'Full-Stack', description: 'End-to-end JS', contentPoints: ['Full-Stack'] },
                { id: 'a-js-browser', title: 'Browser APIs', description: 'Web standards', contentPoints: ['Browser APIs'] },
                { id: 'a-js-real', title: 'Real-Time Apps', description: 'WebSockets, Socket.io', contentPoints: ['Real-Time Apps'] },
                { id: 'a-js-auto', title: 'Automation', description: 'Puppeteer, Playwright', contentPoints: ['Automation'] },
                { id: 'a-js-tool', title: 'Tooling', description: 'Bundlers, CLIs', contentPoints: ['Tooling'] }
            ]
          },
          {
            id: 'a-ts', title: 'TypeScript', description: 'Scale & Safety.',
            subSubSections: [
                { id: 'a-ts-front', title: 'Large-Scale Frontend', description: 'Enterprise UI', contentPoints: ['Large-Scale Frontend'] },
                { id: 'a-ts-back', title: 'Backend APIs', description: 'Type-safe Services', contentPoints: ['Backend APIs'] },
                { id: 'a-ts-full', title: 'Full-Stack Systems', description: 'tRPC, Next.js', contentPoints: ['Full-Stack Systems'] },
                { id: 'a-ts-ent', title: 'Enterprise Apps', description: 'Scalable Architecture', contentPoints: ['Enterprise Apps'] },
                { id: 'a-ts-tool', title: 'Type-Safe Tooling', description: 'DevX Tools', contentPoints: ['Type-Safe Tooling'] }
            ]
          }
        ]
      },
      {
        id: 'a-2',
        title: 'Systems & Performance',
        subSections: [
          {
            id: 'a-c', title: 'C', description: 'The Foundation.',
            subSubSections: [
                { id: 'a-c-sys', title: 'System Programming', description: 'Low level logic', contentPoints: ['System Programming'] },
                { id: 'a-c-os', title: 'OS-Level Code', description: 'Kernels, Daemons', contentPoints: ['OS-Level Code'] },
                { id: 'a-c-emb', title: 'Embedded Systems', description: 'Firmware', contentPoints: ['Embedded Systems'] },
                { id: 'a-c-driv', title: 'Drivers', description: 'Hardware Interface', contentPoints: ['Drivers'] },
                { id: 'a-c-tool', title: 'Low-Level Tooling', description: 'Compilers, Debuggers', contentPoints: ['Low-Level Tooling'] }
            ]
          },
          {
            id: 'a-cpp', title: 'C++', description: 'High Performance.',
            subSubSections: [
                { id: 'a-cpp-game', title: 'Game Engines', description: 'Unreal, Custom', contentPoints: ['Game Engines'] },
                { id: 'a-cpp-gfx', title: 'Graphics Programming', description: 'OpenGL, DirectX, Vulkan', contentPoints: ['Graphics Programming'] },
                { id: 'a-cpp-perf', title: 'High-Performance Systems', description: 'HFT, Simulation', contentPoints: ['High-Performance Systems'] },
                { id: 'a-cpp-real', title: 'Real-Time Systems', description: 'Robotics, Audio', contentPoints: ['Real-Time Systems'] },
                { id: 'a-cpp-nat', title: 'Native Libraries', description: 'Node addons, Python ext', contentPoints: ['Native Libraries'] }
            ]
          },
          {
            id: 'a-rust', title: 'Rust', description: 'Safe Systems.',
            subSubSections: [
                { id: 'a-rust-safe', title: 'Safe Systems Programming', description: 'Memory safety guarantees', contentPoints: ['Safe Systems Programming'] },
                { id: 'a-rust-perf', title: 'Performance-Critical Software', description: 'Zero-cost abstractions', contentPoints: ['Performance-Critical Software'] },
                { id: 'a-rust-emb', title: 'Embedded Systems', description: 'Modern firmware', contentPoints: ['Embedded Systems'] },
                { id: 'a-rust-tool', title: 'Native Tooling', description: 'CLIs like Ripgrep', contentPoints: ['Native Tooling'] }
            ]
          },
          {
            id: 'a-go', title: 'Go', description: 'Cloud Native.',
            subSubSections: [
                { id: 'a-go-cloud', title: 'Cloud Services', description: 'K8s, Docker', contentPoints: ['Cloud Services'] },
                { id: 'a-go-micro', title: 'Microservices', description: 'gRPC, Backend', contentPoints: ['Microservices'] },
                { id: 'a-go-dev', title: 'DevOps Tools', description: 'Infrastructure tooling', contentPoints: ['DevOps Tools'] },
                { id: 'a-go-net', title: 'Network Services', description: 'Proxies, Servers', contentPoints: ['Network Services'] },
                { id: 'a-go-cli', title: 'CLI Tools', description: 'Cross-platform utils', contentPoints: ['CLI Tools'] }
            ]
          }
        ]
      },
      {
        id: 'a-3',
        title: 'Enterprise & Mobile',
        subSections: [
          {
            id: 'a-csharp', title: 'C#', description: 'Microsoft Ecosystem.',
            subSubSections: [
                { id: 'a-cs-game', title: 'Game Development (Unity)', description: 'Indie & Pro games', contentPoints: ['Game Development (Unity)'] },
                { id: 'a-cs-desk', title: 'Desktop Apps', description: 'Windows GUI', contentPoints: ['Desktop Apps'] },
                { id: 'a-cs-net', title: '.NET Backend', description: 'Enterprise APIs', contentPoints: ['.NET Backend'] },
                { id: 'a-cs-ent', title: 'Enterprise Systems', description: 'Corporate software', contentPoints: ['Enterprise Systems'] },
                { id: 'a-cs-tool', title: 'Tooling', description: 'Dev tools', contentPoints: ['Tooling'] }
            ]
          },
          {
            id: 'a-java', title: 'Java', description: 'Enterprise Standard.',
            subSubSections: [
                { id: 'a-java-and', title: 'Android Development', description: 'Native Mobile', contentPoints: ['Android Development'] },
                { id: 'a-java-ent', title: 'Enterprise Systems', description: 'Spring Boot, Legacy', contentPoints: ['Enterprise Systems'] },
                { id: 'a-java-dist', title: 'Distributed Applications', description: 'Big Data, Hadoop', contentPoints: ['Distributed Applications'] },
                { id: 'a-java-leg', title: 'Legacy Systems', description: 'Maintenance', contentPoints: ['Legacy Systems'] }
            ]
          },
          {
            id: 'a-kotlin', title: 'Kotlin', description: 'Modern Android.',
            subSubSections: [
                { id: 'a-kt-and', title: 'Android Apps', description: 'Modern Mobile', contentPoints: ['Android Apps'] },
                { id: 'a-kt-back', title: 'Backend Services', description: 'Ktor, Spring', contentPoints: ['Backend Services'] },
                { id: 'a-kt-multi', title: 'Multiplatform Apps', description: 'KMP', contentPoints: ['Multiplatform Apps'] }
            ]
          },
          {
            id: 'a-swift', title: 'Swift', description: 'Apple Ecosystem.',
            subSubSections: [
                { id: 'a-sw-ios', title: 'iOS Development', description: 'iPhone/iPad Apps', contentPoints: ['iOS Development'] },
                { id: 'a-sw-mac', title: 'macOS Apps', description: 'Desktop Native', contentPoints: ['macOS Apps'] }
            ]
          },
          {
            id: 'a-dart', title: 'Dart', description: 'Cross-Platform.',
            subSubSections: [
                { id: 'a-dt-flut', title: 'Cross-Platform Apps (Flutter)', description: 'iOS/Android/Web', contentPoints: ['Cross-Platform Apps (Flutter)'] },
                { id: 'a-dt-ui', title: 'UI-Heavy Applications', description: 'Visual apps', contentPoints: ['UI-Heavy Applications'] }
            ]
          }
        ]
      },
      {
        id: 'a-4',
        title: 'Specialized & Scripting',
        subSections: [
          {
            id: 'a-elixir', title: 'Elixir', description: 'Concurrency.',
            subSubSections: [
                { id: 'a-ex-dist', title: 'Distributed Systems', description: 'BEAM VM', contentPoints: ['Distributed Systems'] },
                { id: 'a-ex-fault', title: 'Fault-Tolerant Applications', description: 'Resilience', contentPoints: ['Fault-Tolerant Applications'] },
                { id: 'a-ex-real', title: 'Real-Time Messaging', description: 'Phoenix', contentPoints: ['Real-Time Messaging'] }
            ]
          },
          {
            id: 'a-php', title: 'PHP', description: 'Web Workhorse.',
            subSubSections: [
                { id: 'a-php-back', title: 'Web Backend', description: 'Server-side Logic', contentPoints: ['Web Backend'] },
                { id: 'a-php-cms', title: 'CMS (WordPress)', description: 'Content Management', contentPoints: ['CMS (WordPress)'] },
                { id: 'a-php-leg', title: 'Legacy Systems', description: 'Old web apps', contentPoints: ['Legacy Systems'] },
                { id: 'a-php-api', title: 'API Development', description: 'Laravel, Symfony', contentPoints: ['API Development'] }
            ]
          },
          {
            id: 'a-ruby', title: 'Ruby', description: 'Developer Joy.',
            subSubSections: [
                { id: 'a-rb-web', title: 'Web Applications', description: 'Rails', contentPoints: ['Web Applications'] },
                { id: 'a-rb-proto', title: 'Rapid Prototyping', description: 'MVP building', contentPoints: ['Rapid Prototyping'] },
                { id: 'a-rb-auto', title: 'Automation', description: 'Scripts', contentPoints: ['Automation'] }
            ]
          },
          {
            id: 'a-shell', title: 'Shell / Bash', description: 'Automation.',
            subSubSections: [
                { id: 'a-sh-auto', title: 'Automation', description: 'Task running', contentPoints: ['Automation'] },
                { id: 'a-sh-dev', title: 'DevOps', description: 'CI/CD glue', contentPoints: ['DevOps'] },
                { id: 'a-sh-sys', title: 'System Control', description: 'Admin tasks', contentPoints: ['System Control'] },
                { id: 'a-sh-dep', title: 'Deployment Scripts', description: 'Release automation', contentPoints: ['Deployment Scripts'] },
                { id: 'a-sh-cli', title: 'CLI Workflows', description: 'Terminal efficiency', contentPoints: ['CLI Workflows'] }
            ]
          }
        ]
      },
      {
        id: 'a-5',
        title: 'Data & Computation',
        subSections: [
           {
            id: 'a-r', title: 'R', description: 'Statistics.',
            subSubSections: [
                { id: 'a-r-stat', title: 'Statistical Computing', description: 'Analysis', contentPoints: ['Statistical Computing'] },
                { id: 'a-r-data', title: 'Data Analysis', description: 'Visualization', contentPoints: ['Data Analysis'] },
                { id: 'a-r-res', title: 'Research', description: 'Academic', contentPoints: ['Research'] }
            ]
          },
          {
            id: 'a-matlab', title: 'MATLAB', description: 'Engineering.',
            subSubSections: [
                { id: 'a-mt-eng', title: 'Engineering Computation', description: 'Math', contentPoints: ['Engineering Computation'] },
                { id: 'a-mt-sim', title: 'Simulations', description: 'Modeling', contentPoints: ['Simulations'] },
                { id: 'a-mt-ctrl', title: 'Control Systems', description: 'Automation logic', contentPoints: ['Control Systems'] }
            ]
          }
        ]
      },
      {
        id: 'a-6',
        title: 'Web Core',
        subSections: [
          {
            id: 'a-html', title: 'HTML / HTML5', description: 'Structure.',
            subSubSections: [
                { id: 'a-html-doc', title: 'Document Structure', description: 'Semantics', contentPoints: ['Document Structure'] },
                { id: 'a-html-seo', title: 'SEO', description: 'Search visibility', contentPoints: ['SEO'] },
                { id: 'a-html-a11y', title: 'Accessibility', description: 'ARIA, Inclusion', contentPoints: ['Accessibility'] },
                { id: 'a-html-std', title: 'Web Standards', description: 'W3C compliance', contentPoints: ['Web Standards'] }
            ]
          },
          {
            id: 'a-css', title: 'CSS / SCSS', description: 'Style.',
            subSubSections: [
                { id: 'a-css-resp', title: 'Responsive Design', description: 'Mobile adaptation', contentPoints: ['Responsive Design'] },
                { id: 'a-css-lay', title: 'Layout Systems', description: 'Flexbox, Grid', contentPoints: ['Layout Systems'] },
                { id: 'a-css-des', title: 'Design Systems', description: 'Scalable UI', contentPoints: ['Design Systems'] },
                { id: 'a-css-arch', title: 'UI Architecture', description: 'BEM, Tailwind', contentPoints: ['UI Architecture'] }
            ]
          }
        ]
      },
      {
        id: 'a-7',
        title: 'Supporting Technologies',
        subSections: [
          {
            id: 'a-wasm', title: 'WebAssembly', description: 'Performance.',
            subSubSections: [
                { id: 'a-wasm-perf', title: 'High-Performance Web Code', description: 'Near-native speed', contentPoints: ['High-Performance Web Code'] }
            ]
          },
          {
            id: 'a-sql', title: 'SQL', description: 'Data.',
            subSubSections: [
                { id: 'a-sql-query', title: 'Data Querying', description: 'Select, Join', contentPoints: ['Data Querying'] },
                { id: 'a-sql-back', title: 'Backend Integration', description: 'ORM, Drivers', contentPoints: ['Backend Integration'] },
                { id: 'a-sql-rep', title: 'Reporting', description: 'Analytics', contentPoints: ['Reporting'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'pillar-c',
    code: 'C',
    title: 'Systems, OS & Kernel Engineering',
    description: 'Computer internal architecture. Engineer-level understanding.',
    color: 'text-indigo-600',
    icon: 'HardDrive',
    sections: [
      {
        id: 'c-1',
        title: 'Operating System Fundamentals',
        subSections: [
            {
                id: 'c-1-core', title: 'Basics', description: 'Foundation.',
                subSubSections: [
                    { id: 'c-1-mode', title: 'User mode vs Kernel mode', description: 'Privilege levels', contentPoints: ['User mode vs Kernel mode'] },
                    { id: 'c-1-sys', title: 'System calls', description: 'Interface to kernel', contentPoints: ['System calls'] },
                    { id: 'c-1-proc', title: 'Process vs Thread', description: 'Execution units', contentPoints: ['Process vs Thread'] },
                    { id: 'c-1-ctx', title: 'Context switching', description: 'State saving', contentPoints: ['Context switching'] },
                    { id: 'c-1-sched', title: 'Scheduling basics', description: 'Time slicing', contentPoints: ['Scheduling basics'] },
                    { id: 'c-1-boot', title: 'Boot process', description: 'BIOS → UEFI → OS', contentPoints: ['Boot process (BIOS → UEFI → OS)'] }
                ]
            }
        ]
      },
      {
        id: 'c-2',
        title: 'Process, Memory & Concurrency',
        subSections: [
            {
                id: 'c-2-mem', title: 'Internals', description: 'Management.',
                subSubSections: [
                    { id: 'c-2-virt', title: 'Virtual memory', description: 'Address spaces', contentPoints: ['Virtual memory'] },
                    { id: 'c-2-page', title: 'Paging & segmentation', description: 'Memory mapping', contentPoints: ['Paging & segmentation'] },
                    { id: 'c-2-heap', title: 'Stack vs Heap', description: 'Memory regions', contentPoints: ['Stack vs Heap'] },
                    { id: 'c-2-alloc', title: 'Memory allocation', description: 'malloc/free concepts', contentPoints: ['Memory allocation (malloc/free concepts)'] },
                    { id: 'c-2-race', title: 'Race conditions', description: 'Concurrency bugs', contentPoints: ['Race conditions'] },
                    { id: 'c-2-dead', title: 'Deadlock / livelock', description: 'Stalled progress', contentPoints: ['Deadlock / livelock'] },
                    { id: 'c-2-sync', title: 'Mutex, semaphore, spinlock', description: 'Synchronization', contentPoints: ['Mutex, semaphore, spinlock'] },
                    { id: 'c-2-thrd', title: 'Thread models', description: '1:1, M:N', contentPoints: ['Thread models (1:1, M:N)'] }
                ]
            }
        ]
      },
      {
        id: 'c-3',
        title: 'File Systems & Storage Internals',
        subSections: [
            {
                id: 'c-3-fs', title: 'Persistence', description: 'Storage.',
                subSubSections: [
                    { id: 'c-3-des', title: 'File system design', description: 'Structure', contentPoints: ['File system design'] },
                    { id: 'c-3-node', title: 'Inode, journaling', description: 'Metadata', contentPoints: ['Inode, journaling'] },
                    { id: 'c-3-cache', title: 'Caching & buffering', description: 'Performance', contentPoints: ['Caching & buffering'] },
                    { id: 'c-3-blk', title: 'Block devices', description: 'Drivers', contentPoints: ['Block devices'] },
                    { id: 'c-3-ssd', title: 'SSD vs HDD behavior', description: 'Hardware physics', contentPoints: ['SSD vs HDD behavior'] },
                    { id: 'c-3-perm', title: 'Mounting & permissions', description: 'Access control', contentPoints: ['Mounting & permissions'] }
                ]
            }
        ]
      },
      {
        id: 'c-4',
        title: 'OS Internals & Kernel Architecture',
        subSections: [
            {
                id: 'c-4-kern', title: 'Kernel', description: 'The Heart.',
                subSubSections: [
                    { id: 'c-4-mono', title: 'Monolithic vs Microkernel', description: 'Architecture types', contentPoints: ['Monolithic vs Microkernel'] },
                    { id: 'c-4-mod', title: 'Kernel modules', description: 'Dynamic loading', contentPoints: ['Kernel modules'] },
                    { id: 'c-4-int', title: 'Interrupts & traps', description: 'Hardware events', contentPoints: ['Interrupts & traps'] },
                    { id: 'c-4-drv', title: 'Device drivers overview', description: 'Hardware control', contentPoints: ['Device drivers overview'] },
                    { id: 'c-4-sch', title: 'Kernel scheduling internals', description: 'CFS, etc.', contentPoints: ['Kernel scheduling internals'] },
                    { id: 'c-4-tim', title: 'System timers', description: 'Clock interrupts', contentPoints: ['System timers'] }
                ]
            }
        ]
      },
      {
        id: 'c-5',
        title: 'Low-Level Hardware Interaction',
        subSections: [
            {
                id: 'c-5-hw', title: 'Metal', description: 'Hardware.',
                subSubSections: [
                    { id: 'c-5-cpu', title: 'CPU modes', description: 'Real/Protected', contentPoints: ['CPU modes'] },
                    { id: 'c-5-reg', title: 'Registers & instruction flow', description: 'Assembly level', contentPoints: ['Registers & instruction flow'] },
                    { id: 'c-5-pic', title: 'Interrupt controller', description: 'APIC/PIC', contentPoints: ['Interrupt controller'] },
                    { id: 'c-5-dma', title: 'DMA', description: 'Direct Memory Access', contentPoints: ['DMA'] },
                    { id: 'c-5-cach', title: 'Cache hierarchy', description: 'L1/L2/L3', contentPoints: ['Cache hierarchy (L1/L2/L3)'] },
                    { id: 'c-5-mmio', title: 'Memory-mapped I/O', description: 'Device communication', contentPoints: ['Memory-mapped I/O'] }
                ]
            }
        ]
      },
      {
        id: 'c-6',
        title: 'Performance, Debugging & Profiling',
        subSections: [
            {
                id: 'c-6-perf', title: 'Elite Layer', description: 'Optimization.',
                subSubSections: [
                    { id: 'c-6-bot', title: 'System bottleneck analysis', description: 'Finding limits', contentPoints: ['System bottleneck analysis'] },
                    { id: 'c-6-ctx', title: 'Context switch cost', description: 'Overhead', contentPoints: ['Context switch cost'] },
                    { id: 'c-6-miss', title: 'Cache misses', description: 'Latency impact', contentPoints: ['Cache misses'] },
                    { id: 'c-6-pan', title: 'Kernel panic concepts', description: 'Crashes', contentPoints: ['Kernel panic concepts'] },
                    { id: 'c-6-trc', title: 'Tracing & logging', description: 'eBPF, dtrace', contentPoints: ['Tracing & logging'] },
                    { id: 'c-6-prof', title: 'Profilers (conceptual)', description: 'Perf analysis', contentPoints: ['Profilers (conceptual)'] }
                ]
            }
        ]
      },
      {
        id: 'c-7',
        title: 'Security & Isolation',
        subSections: [
            {
                id: 'c-7-sec', title: 'Boundary Layer', description: 'Protection.',
                subSubSections: [
                    { id: 'c-7-iso', title: 'Process isolation', description: 'Namespaces', contentPoints: ['Process isolation'] },
                    { id: 'c-7-priv', title: 'Privilege separation', description: 'User/Group', contentPoints: ['Privilege separation'] },
                    { id: 'c-7-mem', title: 'Memory protection', description: 'NX, ASLR', contentPoints: ['Memory protection'] },
                    { id: 'c-7-boot', title: 'Secure boot concepts', description: 'Chain of trust', contentPoints: ['Secure boot concepts'] },
                    { id: 'c-7-att', title: 'Kernel attack surface', description: 'Vulnerabilities', contentPoints: ['Kernel attack surface (high-level)'] }
                ]
            }
        ]
      },
      {
        id: 'c-8',
        title: 'OS Families & Practical Exposure',
        subSections: [
            {
                id: 'c-8-fam', title: 'Ecosystems', description: 'Reality Check.',
                subSubSections: [
                    { id: 'c-8-lin', title: 'Linux internals focus', description: 'VFS, ELF', contentPoints: ['Linux internals focus'] },
                    { id: 'c-8-win', title: 'Windows architecture awareness', description: 'NT Kernel', contentPoints: ['Windows architecture awareness'] },
                    { id: 'c-8-unix', title: 'UNIX philosophy', description: 'Everything is a file', contentPoints: ['UNIX philosophy'] },
                    { id: 'c-8-pos', title: 'POSIX concepts', description: 'Standards', contentPoints: ['POSIX concepts'] },
                    { id: 'c-8-cont', title: 'Containers vs VM', description: 'OS perspective', contentPoints: ['Containers vs VM (OS perspective)'] }
                ]
            }
        ]
      }
    ]
  },
  {
    id: 'pillar-i',
    code: 'I',
    title: 'Embedded, Robotics, IoT & Hardware',
    description: 'Code -> Physical world. Real-world system engineering.',
    color: 'text-orange-600',
    icon: 'Zap',
    sections: [
        {
            id: 'i-0',
            title: 'Engineering Reality & Hardware Mindset',
            subSections: [
                { id: 'i-0-mind', title: 'Foundation', description: 'Constraint.', 
                  subSubSections: [
                      { id: 'i-0-hw', title: 'Hardware ≠ software', description: 'Physical limits', contentPoints: ['Hardware ≠ software'] },
                      { id: 'i-0-det', title: 'Determinism vs best-effort', description: 'Consistency', contentPoints: ['Determinism vs best-effort'] },
                      { id: 'i-0-tim', title: 'Timing, latency, jitter', description: 'Real-time constraints', contentPoints: ['Timing, latency, jitter'] },
                      { id: 'i-0-pwr', title: 'Power, memory, heat constraints', description: 'Physics', contentPoints: ['Power, memory, heat constraints'] },
                      { id: 'i-0-fail', title: 'Why embedded systems fail', description: 'Environment', contentPoints: ['Why embedded systems fail in the field'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-1',
            title: 'Embedded Systems Fundamentals',
            subSections: [
                { id: 'i-1-fund', title: 'Concepts', description: 'Basics.', 
                  subSubSections: [
                      { id: 'i-1-def', title: 'What "embedded system" means', description: 'Definition', contentPoints: ['What "embedded system" really means'] },
                      { id: 'i-1-mcu', title: 'MCU vs MPU', description: 'Controller vs Processor', contentPoints: ['MCU vs MPU'] },
                      { id: 'i-1-bare', title: 'Bare-metal vs OS-based', description: 'Architecture', contentPoints: ['Bare-metal vs OS-based systems'] },
                      { id: 'i-1-rt', title: 'Real-time vs non-real-time', description: 'Time sensitivity', contentPoints: ['Real-time vs non-real-time'] },
                      { id: 'i-1-safe', title: 'Safety-critical vs consumer', description: 'Risk levels', contentPoints: ['Safety-critical vs consumer systems'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-2',
            title: 'Electronics Fundamentals',
            subSections: [
                { id: 'i-2-elec', title: 'Physics', description: 'Circuits.', 
                  subSubSections: [
                      { id: 'i-2-volt', title: 'Voltage, current, resistance', description: 'Ohm\'s Law', contentPoints: ['Voltage, current, resistance'] },
                      { id: 'i-2-dig', title: 'Digital vs analog signals', description: 'Signal types', contentPoints: ['Digital vs analog signals'] },
                      { id: 'i-2-sens', title: 'Sensors, actuators', description: 'IO', contentPoints: ['Sensors, actuators'] },
                      { id: 'i-2-pull', title: 'Pull-ups, noise, grounding', description: 'Circuit stability', contentPoints: ['Pull-ups, noise, grounding'] },
                      { id: 'i-2-reg', title: 'Power regulation & protection', description: 'Safety', contentPoints: ['Power regulation & protection'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-3',
            title: 'Microcontrollers & Architecture',
            subSections: [
                { id: 'i-3-chip', title: 'Hardware', description: 'The Chip.', 
                  subSubSections: [
                      { id: 'i-3-arch', title: 'AVR, ARM, RISC basics', description: 'Instruction sets', contentPoints: ['AVR, ARM, RISC basics'] },
                      { id: 'i-3-reg', title: 'Registers & memory-mapped I/O', description: 'Control', contentPoints: ['Registers & memory-mapped I/O'] },
                      { id: 'i-3-gpio', title: 'GPIO, timers, PWM', description: 'Peripherals', contentPoints: ['GPIO, timers, PWM'] },
                      { id: 'i-3-int', title: 'Interrupts & priorities', description: 'Event handling', contentPoints: ['Interrupts & priorities'] },
                      { id: 'i-3-clk', title: 'Clock trees & timing', description: 'Speed control', contentPoints: ['Clock trees & timing'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-4',
            title: 'Embedded Programming & Firmware',
            subSections: [
                { id: 'i-4-firm', title: 'Code', description: 'Firmware.', 
                  subSubSections: [
                      { id: 'i-4-c', title: 'C / C++ (embedded style)', description: 'Language choice', contentPoints: ['C / C++ (embedded style)'] },
                      { id: 'i-4-mem', title: 'Memory & stack control', description: 'Constraints', contentPoints: ['Memory & stack control'] },
                      { id: 'i-4-int', title: 'Interrupt-driven design', description: 'Async logic', contentPoints: ['Interrupt-driven design'] },
                      { id: 'i-4-state', title: 'State machines', description: 'Logic flow', contentPoints: ['State machines'] },
                      { id: 'i-4-time', title: 'Timing-critical logic', description: 'Precision', contentPoints: ['Timing-critical logic'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-5',
            title: 'Hardware–Software Interface',
            subSections: [
                { id: 'i-5-iface', title: 'Integration', description: 'Drivers.', 
                  subSubSections: [
                      { id: 'i-5-drv', title: 'Drivers & HAL', description: 'Abstraction', contentPoints: ['Drivers & HAL'] },
                      { id: 'i-5-periph', title: 'Peripheral communication', description: 'Data flow', contentPoints: ['Peripheral communication'] },
                      { id: 'i-5-proto', title: 'SPI, I²C, UART, CAN', description: 'Protocols', contentPoints: ['SPI, I²C, UART, CAN (awareness)'] },
                      { id: 'i-5-sync', title: 'Synchronization issues', description: 'Timing bugs', contentPoints: ['Synchronization issues'] },
                      { id: 'i-5-race', title: 'Race conditions', description: 'Hardware races', contentPoints: ['Race conditions'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-5-5',
            title: 'Simulation, Modeling & Prototyping',
            subSections: [
                { id: 'i-5-5-sim', title: 'Virtual', description: 'Testing.', 
                  subSubSections: [
                      { id: 'i-5-5-why', title: 'Why simulation saves money', description: 'Efficiency', contentPoints: ['Why simulation saves money & time'] },
                      { id: 'i-5-5-mod', title: 'Hardware behavior modeling', description: 'Digital Twins', contentPoints: ['Hardware behavior modeling'] },
                      { id: 'i-5-5-tim', title: 'Timing & control simulation', description: 'Logic check', contentPoints: ['Timing & control simulation'] },
                      { id: 'i-5-5-sens', title: 'Sensor/actuator modeling', description: 'Inputs/Outputs', contentPoints: ['Sensor/actuator modeling'] },
                      { id: 'i-5-5-twin', title: 'Digital twin concept', description: 'Replica', contentPoints: ['Digital twin concept'] },
                      { id: 'i-5-5-gap', title: 'Simulation vs reality gap', description: 'Limitations', contentPoints: ['Simulation vs reality gap'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-6',
            title: 'Real-Time Operating Systems (RTOS)',
            subSections: [
                { id: 'i-6-rtos', title: 'Scheduling', description: 'Determinism.', 
                  subSubSections: [
                      { id: 'i-6-why', title: 'Why RTOS exists', description: 'Complexity management', contentPoints: ['Why RTOS exists'] },
                      { id: 'i-6-task', title: 'Tasks, scheduling, priorities', description: 'Multitasking', contentPoints: ['Tasks, scheduling, priorities'] },
                      { id: 'i-6-que', title: 'Queues, semaphores, mutex', description: 'IPC', contentPoints: ['Queues, semaphores, mutex'] },
                      { id: 'i-6-dead', title: 'Deadlocks & priority inversion', description: 'RTOS bugs', contentPoints: ['Deadlocks & priority inversion'] },
                      { id: 'i-6-bad', title: 'When RTOS is a bad idea', description: 'Overhead', contentPoints: ['When RTOS is a bad idea'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-7',
            title: 'Embedded Debugging & Testing',
            subSections: [
                { id: 'i-7-debug', title: 'Verification', description: 'Analysis.', 
                  subSubSections: [
                      { id: 'i-7-tool', title: 'Debugging tools (JTAG/SWD)', description: 'Hardware probes', contentPoints: ['Debugging tools awareness (JTAG/SWD)'] },
                      { id: 'i-7-log', title: 'Logic analyzer basics', description: 'Signal views', contentPoints: ['Logic analyzer basics'] },
                      { id: 'i-7-trc', title: 'Logging vs real debugging', description: 'Methods', contentPoints: ['Logging vs real debugging'] },
                      { id: 'i-7-fault', title: 'Hardware fault vs software bug', description: 'Isolation', contentPoints: ['Hardware fault vs software bug'] },
                      { id: 'i-7-strs', title: 'Stress & edge-case testing', description: 'Reliability', contentPoints: ['Stress & edge-case testing'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-8',
            title: 'Robotics Fundamentals',
            subSections: [
                { id: 'i-8-robot', title: 'Motion', description: 'Control.', 
                  subSubSections: [
                      { id: 'i-8-sens', title: 'Sensors & perception', description: 'Input', contentPoints: ['Sensors & perception'] },
                      { id: 'i-8-act', title: 'Actuators & motors', description: 'Output', contentPoints: ['Actuators & motors'] },
                      { id: 'i-8-ctrl', title: 'Control systems intuition', description: 'Feedback loops', contentPoints: ['Control systems intuition'] },
                      { id: 'i-8-kin', title: 'Kinematics awareness', description: 'Movement math', contentPoints: ['Kinematics awareness'] },
                      { id: 'i-8-safe', title: 'Safety in robotics', description: 'Protection', contentPoints: ['Safety in robotics'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-9',
            title: 'Internet of Things (IoT)',
            subSections: [
                { id: 'i-9-iot', title: 'Connectivity', description: 'Network.', 
                  subSubSections: [
                      { id: 'i-9-arch', title: 'IoT system architecture', description: 'Topology', contentPoints: ['IoT system architecture'] },
                      { id: 'i-9-cloud', title: 'Device → gateway → cloud', description: 'Data flow', contentPoints: ['Device → gateway → cloud'] },
                      { id: 'i-9-proto', title: 'Protocol awareness', description: 'MQTT/HTTP', contentPoints: ['Protocol awareness (MQTT/HTTP)'] },
                      { id: 'i-9-ota', title: 'Device identity & OTA', description: 'Updates', contentPoints: ['Device identity & OTA updates'] },
                      { id: 'i-9-rel', title: 'Reliability in the field', description: 'Uptime', contentPoints: ['Reliability in the field'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-10',
            title: 'Embedded & Device Security',
            subSections: [
                { id: 'i-10-sec', title: 'Protection', description: 'Hardening.', 
                  subSubSections: [
                      { id: 'i-10-bas', title: 'Firmware security basics', description: 'Concepts', contentPoints: ['Firmware security basics'] },
                      { id: 'i-10-boot', title: 'Secure boot', description: 'Trust chain', contentPoints: ['Secure boot'] },
                      { id: 'i-10-key', title: 'Key storage', description: 'Secrets', contentPoints: ['Key storage'] },
                      { id: 'i-10-phys', title: 'Physical attack awareness', description: 'Hardware hacks', contentPoints: ['Physical attack awareness'] },
                      { id: 'i-10-hack', title: 'Why IoT gets hacked', description: 'Vulnerabilities', contentPoints: ['Why IoT gets hacked'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-11',
            title: 'Power, Performance & Reliability',
            subSections: [
                { id: 'i-11-perf', title: 'Efficiency', description: 'Constraints.', 
                  subSubSections: [
                      { id: 'i-11-mod', title: 'Power consumption modeling', description: 'Estimation', contentPoints: ['Power consumption modeling'] },
                      { id: 'i-11-slp', title: 'Sleep modes', description: 'Energy saving', contentPoints: ['Sleep modes'] },
                      { id: 'i-11-therm', title: 'Thermal constraints', description: 'Heat', contentPoints: ['Thermal constraints'] },
                      { id: 'i-11-life', title: 'Lifetime & wear-out', description: 'Durability', contentPoints: ['Lifetime & wear-out'] },
                      { id: 'i-11-fail', title: 'Field failure analysis', description: 'Diagnostics', contentPoints: ['Field failure analysis'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-12',
            title: 'Production, Manufacturing & Scale',
            subSections: [
                { id: 'i-12-prod', title: 'Scale', description: 'Factory.', 
                  subSubSections: [
                      { id: 'i-12-proto', title: 'Prototype vs production', description: 'Scaling', contentPoints: ['Prototype vs production'] },
                      { id: 'i-12-bom', title: 'BOM thinking', description: 'Costing', contentPoints: ['BOM thinking'] },
                      { id: 'i-12-rev', title: 'Hardware revisions', description: 'Versioning', contentPoints: ['Hardware revisions'] },
                      { id: 'i-12-cert', title: 'Certification awareness', description: 'FCC/CE', contentPoints: ['Certification awareness'] },
                      { id: 'i-12-cost', title: 'Cost vs reliability trade-offs', description: 'Economics', contentPoints: ['Cost vs reliability trade-offs'] }
                  ] 
                }
            ]
        },
        {
            id: 'i-13',
            title: 'Ethics, Safety & Judgment',
            subSections: [
                { id: 'i-13-eth', title: 'Responsibility', description: 'Impact.', 
                  subSubSections: [
                      { id: 'i-13-safe', title: 'Safety-critical responsibility', description: 'Lives at stake', contentPoints: ['Safety-critical responsibility'] },
                      { id: 'i-13-over', title: 'Over-engineering traps', description: 'Complexity', contentPoints: ['Over-engineering traps'] },
                      { id: 'i-13-bad', title: 'When embedded is wrong', description: 'Choice', contentPoints: ['When embedded is wrong choice'] },
                      { id: 'i-13-lim', title: 'Ethical limits', description: 'Control', contentPoints: ['Ethical limits of hardware control'] }
                  ] 
                }
            ]
        }
    ]
  }
];