import { Pillar } from '../../types';

export const BACKEND_PILLARS: Pillar[] = [
  {
    id: 'pillar-d',
    code: 'D',
    title: 'System Architecture & Engineering Design',
    description: 'How real systems are imagined, shaped, and judged. "Why" we build.',
    color: 'text-amber-600',
    icon: 'Layout',
    sections: [
      {
        id: 'd-1',
        title: 'Foundations of System Architecture',
        subSections: [
           {
               id: 'd-1-base', title: 'Core Concepts', description: 'The blueprint.',
               subSubSections: [
                   { id: 'd-1-sys', title: 'What is a system?', description: 'Definition', contentPoints: ['What is a system?'] },
                   { id: 'd-1-comp', title: 'Components vs services', description: 'Units', contentPoints: ['Components vs services'] },
                   { id: 'd-1-bound', title: 'Boundaries & responsibilities', description: 'Scope', contentPoints: ['Boundaries & responsibilities'] },
                   { id: 'd-1-iface', title: 'Interfaces & contracts', description: 'API', contentPoints: ['Interfaces & contracts'] },
                   { id: 'd-1-coup', title: 'Coupling vs cohesion', description: 'Design quality', contentPoints: ['Coupling vs cohesion'] },
                   { id: 'd-1-abs', title: 'Abstraction layers', description: 'Hiding complexity', contentPoints: ['Abstraction layers'] },
                   { id: 'd-1-flow', title: 'Control flow vs data flow', description: 'Logic', contentPoints: ['Control flow vs data flow'] }
               ]
           }
        ]
      },
      {
        id: 'd-2',
        title: 'Requirement Engineering & Constraint Analysis',
        subSections: [
           {
               id: 'd-2-req', title: 'Analysis', description: 'Realism.',
               subSubSections: [
                   { id: 'd-2-func', title: 'Functional requirements', description: 'What it does', contentPoints: ['Functional requirements'] },
                   { id: 'd-2-non', title: 'Non-functional requirements', description: 'How it behaves', contentPoints: ['Non-functional requirements'] },
                   { id: 'd-2-scl', title: 'Scalability', description: 'Growth', contentPoints: ['Scalability'] },
                   { id: 'd-2-perf', title: 'Performance', description: 'Speed', contentPoints: ['Performance'] },
                   { id: 'd-2-rel', title: 'Reliability', description: 'Uptime', contentPoints: ['Reliability'] },
                   { id: 'd-2-av', title: 'Availability', description: 'Access', contentPoints: ['Availability'] },
                   { id: 'd-2-sec', title: 'Security', description: 'Protection', contentPoints: ['Security'] },
                   { id: 'd-2-main', title: 'Maintainability', description: 'Updates', contentPoints: ['Maintainability'] },
                   { id: 'd-2-biz', title: 'Business constraints', description: 'Money', contentPoints: ['Business constraints'] },
                   { id: 'd-2-trade', title: 'Trade-offs', description: 'Time/Budget', contentPoints: ['Time / budget / team size trade-offs'] }
               ]
           }
        ]
      },
      {
        id: 'd-3',
        title: 'Architectural Styles & Patterns',
        subSections: [
           {
               id: 'd-3-pat', title: 'Patterns', description: 'Models.',
               subSubSections: [
                   { id: 'd-3-mono', title: 'Monolith', description: 'Single unit', contentPoints: ['Monolith'] },
                   { id: 'd-3-mod', title: 'Modular monolith', description: 'Structured', contentPoints: ['Modular monolith'] },
                   { id: 'd-3-lay', title: 'Layered architecture', description: 'Tiers', contentPoints: ['Layered architecture'] },
                   { id: 'd-3-cs', title: 'Client–server', description: 'Basic web', contentPoints: ['Client–server'] },
                   { id: 'd-3-micro', title: 'Microservices', description: 'Distributed', contentPoints: ['Microservices'] },
                   { id: 'd-3-evt', title: 'Event-driven systems', description: 'Async', contentPoints: ['Event-driven systems'] },
                   { id: 'd-3-soa', title: 'Service-oriented architecture', description: 'SOA', contentPoints: ['Service-oriented architecture (SOA)'] },
                   { id: 'd-3-p2p', title: 'Peer-to-peer (P2P)', description: 'Decentralized', contentPoints: ['Peer-to-peer (P2P)'] }
               ]
           }
        ]
      },
      {
        id: 'd-4',
        title: 'Data Flow, State & Consistency',
        subSections: [
           {
               id: 'd-4-data', title: 'State Management', description: 'Truth.',
               subSubSections: [
                   { id: 'd-4-stat', title: 'Stateless vs stateful systems', description: 'Session', contentPoints: ['Stateless vs stateful systems'] },
                   { id: 'd-4-own', title: 'Data ownership', description: 'Who holds it', contentPoints: ['Data ownership'] },
                   { id: 'd-4-tru', title: 'Source of truth', description: 'Canonical', contentPoints: ['Source of truth'] },
                   { id: 'd-4-sync', title: 'Data synchronization', description: 'Updates', contentPoints: ['Data synchronization'] },
                   { id: 'd-4-ev', title: 'Eventual consistency', description: 'BASE', contentPoints: ['Eventual consistency'] },
                   { id: 'd-4-str', title: 'Strong consistency', description: 'ACID', contentPoints: ['Strong consistency'] },
                   { id: 'd-4-idem', title: 'Idempotency', description: 'Safe retries', contentPoints: ['Idempotency'] },
                   { id: 'd-4-tx', title: 'Transactions & isolation', description: 'Atomic', contentPoints: ['Transactions & isolation'] }
               ]
           }
        ]
      },
      {
        id: 'd-5',
        title: 'Scalability & Performance Design',
        subSections: [
           {
               id: 'd-5-scale', title: 'Growth', description: 'Load.',
               subSubSections: [
                   { id: 'd-5-hor', title: 'Horizontal vs vertical scaling', description: 'More nodes vs bigger nodes', contentPoints: ['Horizontal vs vertical scaling'] },
                   { id: 'd-5-lb', title: 'Load balancing concepts', description: 'Distribution', contentPoints: ['Load balancing concepts'] },
                   { id: 'd-5-cach', title: 'Caching strategies', description: 'Speed', contentPoints: ['Caching strategies'] },
                   { id: 'd-5-opt', title: 'Read vs write optimization', description: 'CQRS', contentPoints: ['Read vs write optimization'] },
                   { id: 'd-5-bot', title: 'Bottleneck identification', description: 'Profiling', contentPoints: ['Bottleneck identification'] },
                   { id: 'd-5-thru', title: 'Throughput vs latency', description: 'Metrics', contentPoints: ['Throughput vs latency'] },
                   { id: 'd-5-back', title: 'Backpressure', description: 'Flow control', contentPoints: ['Backpressure'] }
               ]
           }
        ]
      },
      {
        id: 'd-6',
        title: 'Distributed Systems Fundamentals',
        subSections: [
           {
               id: 'd-6-dist', title: 'Complexity', description: 'Network.',
               subSubSections: [
                   { id: 'd-6-fail', title: 'Network failures are normal', description: 'Reality', contentPoints: ['Network failures are normal'] },
                   { id: 'd-6-part', title: 'Partial failure handling', description: 'Zombies', contentPoints: ['Partial failure handling'] },
                   { id: 'd-6-tim', title: 'Time, clocks & ordering', description: 'Sync', contentPoints: ['Time, clocks & ordering'] },
                   { id: 'd-6-cap', title: 'CAP theorem', description: 'Tradeoffs', contentPoints: ['CAP theorem'] },
                   { id: 'd-6-con', title: 'Consensus basics', description: 'Raft/Paxos', contentPoints: ['Consensus basics'] },
                   { id: 'd-6-rep', title: 'Replication strategies', description: 'Master-Slave', contentPoints: ['Replication strategies'] },
                   { id: 'd-6-tol', title: 'Fault tolerance', description: 'Recovery', contentPoints: ['Fault tolerance'] }
               ]
           }
        ]
      },
      {
        id: 'd-7',
        title: 'API, Integration & Communication Design',
        subSections: [
           {
               id: 'd-7-api', title: 'Interfaces', description: 'Glue.',
               subSubSections: [
                   { id: 'd-7-prin', title: 'API design principles', description: 'Clarity', contentPoints: ['API design principles'] },
                   { id: 'd-7-type', title: 'REST vs RPC vs messaging', description: 'Protocols', contentPoints: ['REST vs RPC vs messaging'] },
                   { id: 'd-7-ver', title: 'Versioning strategies', description: 'Evolution', contentPoints: ['Versioning strategies'] },
                   { id: 'd-7-back', title: 'Backward compatibility', description: 'Safety', contentPoints: ['Backward compatibility'] },
                   { id: 'd-7-con', title: 'Contract-first design', description: 'Schema', contentPoints: ['Contract-first design'] },
                   { id: 'd-7-err', title: 'Error handling philosophy', description: 'Feedback', contentPoints: ['Error handling philosophy'] }
               ]
           }
        ]
      },
      {
        id: 'd-8',
        title: 'Reliability, Resilience & Failure Engineering',
        subSections: [
           {
               id: 'd-8-rel', title: 'Robustness', description: 'Survival.',
               subSubSections: [
                   { id: 'd-8-fail', title: 'Fail-fast vs fail-safe', description: 'Strategies', contentPoints: ['Fail-fast vs fail-safe'] },
                   { id: 'd-8-ret', title: 'Retries & timeouts', description: 'Resilience', contentPoints: ['Retries & timeouts'] },
                   { id: 'd-8-circ', title: 'Circuit breakers', description: 'Protection', contentPoints: ['Circuit breakers'] },
                   { id: 'd-8-deg', title: 'Graceful degradation', description: 'Fallback', contentPoints: ['Graceful degradation'] },
                   { id: 'd-8-red', title: 'Redundancy', description: 'Backups', contentPoints: ['Redundancy'] },
                   { id: 'd-8-dr', title: 'Disaster recovery thinking', description: 'Worst case', contentPoints: ['Disaster recovery thinking'] }
               ]
           }
        ]
      },
      {
        id: 'd-9',
        title: 'Security by Design',
        subSections: [
           {
               id: 'd-9-sec', title: 'Protection', description: 'Foundation.',
               subSubSections: [
                   { id: 'd-9-th', title: 'Threat modeling', description: 'Analysis', contentPoints: ['Threat modeling'] },
                   { id: 'd-9-tr', title: 'Trust boundaries', description: 'Zones', contentPoints: ['Trust boundaries'] },
                   { id: 'd-9-lp', title: 'Least privilege', description: 'Access', contentPoints: ['Least privilege'] },
                   { id: 'd-9-dd', title: 'Defense in depth', description: 'Layers', contentPoints: ['Defense in depth'] },
                   { id: 'd-9-sd', title: 'Secure defaults', description: 'Safety first', contentPoints: ['Secure defaults'] },
                   { id: 'd-9-dt', title: 'Design-time vs patch-time', description: 'Proactive', contentPoints: ['Design-time security vs patch-time security'] }
               ]
           }
        ]
      },
      {
        id: 'd-10',
        title: 'Maintainability & Evolution',
        subSections: [
           {
               id: 'd-10-maint', title: 'Lifecycle', description: 'Long-term.',
               subSubSections: [
                   { id: 'd-10-own', title: 'Code ownership', description: 'Responsibility', contentPoints: ['Code ownership'] },
                   { id: 'd-10-debt', title: 'Technical debt', description: 'Cost', contentPoints: ['Technical debt'] },
                   { id: 'd-10-ref', title: 'Refactoring strategy', description: 'Cleanup', contentPoints: ['Refactoring strategy'] },
                   { id: 'd-10-back', title: 'Backward compatibility', description: 'Stability', contentPoints: ['Backward compatibility'] },
                   { id: 'd-10-mig', title: 'Migration planning', description: 'Moves', contentPoints: ['Migration planning'] },
                   { id: 'd-10-ver', title: 'Versioned evolution', description: 'Semantic Ver', contentPoints: ['Versioned evolution'] },
                   { id: 'd-10-wrt', title: 'When to rewrite', description: 'Decision', contentPoints: ['When to rewrite vs when not to'] }
               ]
           }
        ]
      },
      {
        id: 'd-11',
        title: 'Decision-Making & Trade-off Engineering',
        subSections: [
           {
               id: 'd-11-dec', title: 'Judgment', description: 'Choices.',
               subSubSections: [
                   { id: 'd-11-no', title: 'No perfect system', description: 'Reality', contentPoints: ['No perfect system'] },
                   { id: 'd-11-doc', title: 'Trade-off documentation', description: 'ADR', contentPoints: ['Trade-off documentation'] },
                   { id: 'd-11-cba', title: 'Cost vs benefit analysis', description: 'Value', contentPoints: ['Cost vs benefit analysis'] },
                   { id: 'd-11-risk', title: 'Risk evaluation', description: 'Safety', contentPoints: ['Risk evaluation'] },
                   { id: 'd-11-rec', title: 'Decision records', description: 'Log', contentPoints: ['Decision records (ADR concept)'] },
                   { id: 'd-11-say', title: 'Saying "no" correctly', description: 'Leadership', contentPoints: ['Saying "no" correctly'] }
               ]
           }
        ]
      },
      {
        id: 'd-12',
        title: 'Real-World Case Thinking',
        subSections: [
           {
               id: 'd-12-case', title: 'Scenarios', description: 'Application.',
               subSubSections: [
                   { id: 'd-12-fut', title: 'Designing for unknown future', description: 'Flexibility', contentPoints: ['Designing for unknown future'] },
                   { id: 'd-12-team', title: 'Designing for team growth', description: 'Scale', contentPoints: ['Designing for team growth'] },
                   { id: 'd-12-fail', title: 'Designing for failure', description: 'Resilience', contentPoints: ['Designing for failure'] },
                   { id: 'd-12-pres', title: 'Designing under pressure', description: 'Constraints', contentPoints: ['Designing under pressure'] },
                   { id: 'd-12-inc', title: 'Designing with incomplete info', description: 'Ambiguity', contentPoints: ['Designing with incomplete info'] }
               ]
           }
        ]
      }
    ]
  },
  {
    id: 'pillar-k',
    code: 'K',
    title: 'Cloud, DevOps, Infrastructure & Production Engineering',
    description: 'Production Reality. Live, stable, secure, cheap, and recoverable.',
    color: 'text-sky-600',
    icon: 'Cloud',
    sections: [
        {
            id: 'k-0',
            title: 'Production Reality & DevOps Mindset',
            subSections: [
                { id: 'k-0-mind', title: 'Foundation', description: 'Culture.', 
                  subSubSections: [
                      { id: 'k-0-mach', title: '"It works on my machine"', description: 'Env parity', contentPoints: ['"It works on my machine" syndrome'] },
                      { id: 'k-0-env', title: 'Dev ≠ Test ≠ Prod', description: 'Stages', contentPoints: ['Dev ≠ Test ≠ Prod'] },
                      { id: 'k-0-auto', title: 'Automation > hero engineer', description: 'Systems', contentPoints: ['Automation > hero engineer'] },
                      { id: 'k-0-fail', title: 'Failure is normal', description: 'Prep', contentPoints: ['Failure is normal, unpreparedness is crime'] },
                      { id: 'k-0-tri', title: 'Cost, reliability, security', description: 'Tradeoffs', contentPoints: ['Cost, reliability, security alignment'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-1',
            title: 'Cloud Fundamentals',
            subSections: [
                { id: 'k-1-cloud', title: 'Core', description: 'Basics.', 
                  subSubSections: [
                      { id: 'k-1-def', title: 'What cloud really is', description: 'Servers', contentPoints: ['What cloud really is (magic na)'] },
                      { id: 'k-1-type', title: 'IaaS / PaaS / SaaS', description: 'Models', contentPoints: ['IaaS / PaaS / SaaS'] },
                      { id: 'k-1-reg', title: 'Regions, zones, latency', description: 'Geo', contentPoints: ['Regions, zones, latency'] },
                      { id: 'k-1-st', title: 'Stateless vs stateful systems', description: 'Design', contentPoints: ['Stateless vs stateful systems'] },
                      { id: 'k-1-no', title: 'When NOT to use cloud', description: 'On-prem', contentPoints: ['When NOT to use cloud'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-2',
            title: 'Compute, Storage & Networking Basics',
            subSections: [
                { id: 'k-2-res', title: 'Resources', description: 'Infra.', 
                  subSubSections: [
                      { id: 'k-2-vm', title: 'Virtual Machines vs Containers', description: 'Compute', contentPoints: ['Virtual Machines vs Containers'] },
                      { id: 'k-2-cpu', title: 'CPU / RAM trade-offs', description: 'Sizing', contentPoints: ['CPU / RAM trade-offs'] },
                      { id: 'k-2-obj', title: 'Object vs block storage', description: 'Data', contentPoints: ['Object vs block storage'] },
                      { id: 'k-2-net', title: 'Networking basics', description: 'VPC', contentPoints: ['Networking basics (VPC, subnet, routing)'] },
                      { id: 'k-2-lb', title: 'Load balancing', description: 'Traffic', contentPoints: ['Load balancing (why it exists)'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-3',
            title: 'Linux & Server Fundamentals',
            subSections: [
                { id: 'k-3-os', title: 'System', description: 'Admin.', 
                  subSubSections: [
                      { id: 'k-3-fs', title: 'Linux filesystem', description: 'Structure', contentPoints: ['Linux filesystem'] },
                      { id: 'k-3-proc', title: 'Processes & services', description: 'Daemons', contentPoints: ['Processes & services'] },
                      { id: 'k-3-logs', title: 'Logs, signals, ports', description: 'Ops', contentPoints: ['Logs, signals, ports'] },
                      { id: 'k-3-perm', title: 'Permissions & users', description: 'Access', contentPoints: ['Permissions & users'] },
                      { id: 'k-3-crash', title: 'Why servers hang / crash', description: 'Debug', contentPoints: ['Why servers hang / crash'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-4',
            title: 'Containers & Environment Isolation',
            subSections: [
                { id: 'k-4-cont', title: 'Isolation', description: 'Packaging.', 
                  subSubSections: [
                      { id: 'k-4-why', title: 'Why containers exist', description: 'Problem', contentPoints: ['Why containers exist'] },
                      { id: 'k-4-img', title: 'Image vs container', description: 'Runtime', contentPoints: ['Image vs container'] },
                      { id: 'k-4-env', title: 'Environment consistency', description: 'Parity', contentPoints: ['Environment consistency'] },
                      { id: 'k-4-res', title: 'Resource limits', description: 'Cgroups', contentPoints: ['Resource limits'] },
                      { id: 'k-4-over', title: 'When containers are overkill', description: 'Complexity', contentPoints: ['When containers are overkill'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-5',
            title: 'Infrastructure as Code (IaC) & Configuration',
            subSections: [
                { id: 'k-5-iac', title: 'Automation', description: 'Code.', 
                  subSubSections: [
                      { id: 'k-5-code', title: 'Infrastructure = code mindset', description: 'Versioned', contentPoints: ['Infrastructure = code mindset'] },
                      { id: 'k-5-man', title: 'Manual setup risks', description: 'Drift', contentPoints: ['Manual setup ken dangerous'] },
                      { id: 'k-5-dec', title: 'Declarative vs imperative', description: 'Styles', contentPoints: ['Declarative vs imperative infra'] },
                      { id: 'k-5-ver', title: 'Versioned infrastructure', description: 'Git', contentPoints: ['Versioned infrastructure'] },
                      { id: 'k-5-par', title: 'Dev / staging / prod parity', description: 'Matching', contentPoints: ['Dev / staging / prod parity'] },
                      { id: 'k-5-drft', title: 'Drift detection', description: 'Monitoring', contentPoints: ['Drift detection (silent infra change)'] },
                      { id: 'k-5-roll', title: 'Infra rollback', description: 'Safety', contentPoints: ['Infra rollback'] },
                      { id: 'k-5-re', title: 'Disaster rebuild mindset', description: 'Recovery', contentPoints: ['Disaster rebuild mindset'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-6',
            title: 'CI/CD & Build Pipelines',
            subSections: [
                { id: 'k-6-ci', title: 'Delivery', description: 'Pipeline.', 
                  subSubSections: [
                      { id: 'k-6-why', title: 'Why CI/CD exists', description: 'Speed', contentPoints: ['Why CI/CD exists'] },
                      { id: 'k-6-flow', title: 'Build → test → deploy flow', description: 'Steps', contentPoints: ['Build → test → deploy flow'] },
                      { id: 'k-6-chk', title: 'Automated checks', description: 'QA', contentPoints: ['Automated checks'] },
                      { id: 'k-6-sec', title: 'Secrets handling', description: 'Security', contentPoints: ['Secrets handling (conceptual)'] },
                      { id: 'k-6-rec', title: 'Pipeline failure recovery', description: 'Fixing', contentPoints: ['Pipeline failure recovery'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-7',
            title: 'Deployment Strategies',
            subSections: [
                { id: 'k-7-dep', title: 'Release', description: 'Rollout.', 
                  subSubSections: [
                      { id: 'k-7-bg', title: 'Blue-green deployment', description: 'Switch', contentPoints: ['Blue-green deployment'] },
                      { id: 'k-7-roll', title: 'Rolling updates', description: 'Gradual', contentPoints: ['Rolling updates'] },
                      { id: 'k-7-can', title: 'Canary releases', description: 'Test', contentPoints: ['Canary releases'] },
                      { id: 'k-7-down', title: 'Downtime vs risk trade-off', description: 'Decisions', contentPoints: ['Downtime vs risk trade-off'] },
                      { id: 'k-7-fix', title: 'Emergency hotfix strategy', description: 'Panic', contentPoints: ['Emergency hotfix strategy'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-8',
            title: 'Monitoring, Logging & Observability',
            subSections: [
                { id: 'k-8-obs', title: 'Visibility', description: 'Insight.', 
                  subSubSections: [
                      { id: 'k-8-lmt', title: 'Logs vs metrics vs traces', description: 'Data', contentPoints: ['Logs vs metrics vs traces'] },
                      { id: 'k-8-mat', title: 'What actually matters', description: 'Signals', contentPoints: ['What actually matters to monitor'] },
                      { id: 'k-8-fat', title: 'Alert fatigue', description: 'Noise', contentPoints: ['Alert fatigue'] },
                      { id: 'k-8-dbg', title: 'Debugging production issues', description: 'Skills', contentPoints: ['Debugging production issues'] },
                      { id: 'k-8-know', title: 'Knowing before users complain', description: 'Proactive', contentPoints: ['Knowing before users complain'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-9',
            title: 'Reliability Engineering & Failure Thinking',
            subSections: [
                { id: 'k-9-rel', title: 'Resilience', description: 'SRE.', 
                  subSubSections: [
                      { id: 'k-9-av', title: 'Availability vs reliability', description: 'Concepts', contentPoints: ['Availability vs reliability'] },
                      { id: 'k-9-spof', title: 'Single point of failure', description: 'Risk', contentPoints: ['Single point of failure'] },
                      { id: 'k-9-bkp', title: 'Backups & restore testing', description: 'Safety', contentPoints: ['Backups & restore testing'] },
                      { id: 'k-9-deg', title: 'Graceful degradation', description: 'UX', contentPoints: ['Graceful degradation'] },
                      { id: 'k-9-cont', title: 'Failure containment', description: 'Blast radius', contentPoints: ['Failure containment'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-10',
            title: 'Production Security Engineering',
            subSections: [
                { id: 'k-10-sec', title: 'Defense', description: 'Protection.', 
                  subSubSections: [
                      { id: 'k-10-att', title: 'Attack surface awareness', description: 'Risk', contentPoints: ['Attack surface awareness'] },
                      { id: 'k-10-cre', title: 'Secrets & credentials discipline', description: 'Hygiene', contentPoints: ['Secrets & credentials discipline'] },
                      { id: 'k-10-lp', title: 'Least privilege principle', description: 'Access', contentPoints: ['Least privilege principle'] },
                      { id: 'k-10-dep', title: 'Dependency & supply-chain', description: 'Libraries', contentPoints: ['Dependency & supply-chain risk'] },
                      { id: 'k-10-depsec', title: 'Secure deployment mindset', description: 'Process', contentPoints: ['Secure deployment mindset'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-11',
            title: 'Cost Engineering & Resource Discipline',
            subSections: [
                { id: 'k-11-cost', title: 'FinOps', description: 'Economics.', 
                  subSubSections: [
                      { id: 'k-11-trp', title: 'Cloud cost traps', description: 'Bills', contentPoints: ['Cloud cost traps'] },
                      { id: 'k-11-prov', title: 'Over-provisioning', description: 'Waste', contentPoints: ['Over-provisioning'] },
                      { id: 'k-11-perf', title: 'Cost vs performance', description: 'Balance', contentPoints: ['Cost vs performance'] },
                      { id: 'k-11-bud', title: 'Budget awareness', description: 'Limits', contentPoints: ['Budget awareness'] },
                      { id: 'k-11-scl', title: 'Scaling without bankruptcy', description: 'Control', contentPoints: ['Scaling without bankruptcy'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-12',
            title: 'Scalability & Growth Readiness',
            subSections: [
                { id: 'k-12-scale', title: 'Scaling', description: 'Capacity.', 
                  subSubSections: [
                      { id: 'k-12-vh', title: 'Vertical vs horizontal scaling', description: 'Method', contentPoints: ['Vertical vs horizontal scaling'] },
                      { id: 'k-12-bot', title: 'Bottleneck thinking', description: 'Constraint', contentPoints: ['Bottleneck thinking'] },
                      { id: 'k-12-st', title: 'Stateless services', description: 'Design', contentPoints: ['Stateless services'] },
                      { id: 'k-12-cach', title: 'Caching awareness', description: 'Speed', contentPoints: ['Caching awareness'] },
                      { id: 'k-12-hurt', title: 'When scaling hurts', description: 'Complexity', contentPoints: ['When scaling hurts more than helps'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-13',
            title: 'Incident Management & Recovery',
            subSections: [
                { id: 'k-13-inc', title: 'Response', description: 'Crisis.', 
                  subSubSections: [
                      { id: 'k-13-mind', title: 'Incident mindset', description: 'Calm', contentPoints: ['Incident mindset'] },
                      { id: 'k-13-rca', title: 'Root cause analysis', description: 'Why', contentPoints: ['Root cause analysis'] },
                      { id: 'k-13-pm', title: 'Blameless postmortem', description: 'Learning', contentPoints: ['Blameless postmortem'] },
                      { id: 'k-13-pf', title: 'Patch vs fix', description: 'Speed vs Quality', contentPoints: ['Patch vs fix'] },
                      { id: 'k-13-loop', title: 'Learning loop', description: 'Improvement', contentPoints: ['Learning loop'] }
                  ] 
                }
            ]
        },
        {
            id: 'k-14',
            title: 'DevOps Ethics, Responsibility & Judgment',
            subSections: [
                { id: 'k-14-eth', title: 'Values', description: 'Decisions.', 
                  subSubSections: [
                      { id: 'k-14-reck', title: 'Automation without recklessness', description: 'Care', contentPoints: ['Automation without recklessness'] },
                      { id: 'k-14-bal', title: 'Speed vs safety balance', description: 'Tradeoff', contentPoints: ['Speed vs safety balance'] },
                      { id: 'k-14-no', title: 'When NOT to deploy', description: 'Gatekeeping', contentPoints: ['When NOT to deploy'] },
                      { id: 'k-14-resp', title: 'Responsibility of live systems', description: 'Ownership', contentPoints: ['Responsibility of live systems'] },
                      { id: 'k-14-acc', title: 'Engineer accountability', description: 'Professionalism', contentPoints: ['Engineer accountability'] }
                  ] 
                }
            ]
        }
    ]
  }
];