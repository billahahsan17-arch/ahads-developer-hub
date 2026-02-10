import { Pillar } from '../../types';

export const INTELLIGENCE_PILLARS: Pillar[] = [
  {
    id: 'pillar-e',
    code: 'E',
    title: 'AI, ML & Agentic Engineering',
    description: 'Skill-first, tool-aware, reality-checked. Production AI.',
    color: 'text-purple-600',
    icon: 'Brain',
    sections: [
        {
            id: 'e-1',
            title: 'Foundations of Artificial Intelligence',
            subSections: [
                { id: 'e-1-fund', title: 'Concepts', description: 'Core.', 
                  subSubSections: [
                      { id: 'e-1-what', title: 'What AI is / is not', description: 'Definitions', contentPoints: ['What AI is / is not'] },
                      { id: 'e-1-narr', title: 'Narrow AI vs General AI', description: 'Scope', contentPoints: ['Narrow AI vs General AI (no hype)'] },
                      { id: 'e-1-rule', title: 'Rule-based vs Learning-based', description: 'Methods', contentPoints: ['Rule-based vs Learning-based systems'] },
                      { id: 'e-1-search', title: 'Search, reasoning, decision', description: 'Mechanics', contentPoints: ['Search, reasoning, decision systems'] },
                      { id: 'e-1-bias', title: 'Bias, limitations, failures', description: 'Reality', contentPoints: ['Bias, limitations, failure modes'] }
                  ] 
                }
            ]
        },
        {
            id: 'e-2',
            title: 'Machine Learning Core',
            subSections: [
                { id: 'e-2-ml', title: 'Mechanisms', description: 'Learning.', 
                  subSubSections: [
                      { id: 'e-2-sup', title: 'Supervised learning', description: 'Labeled', contentPoints: ['Supervised learning'] },
                      { id: 'e-2-unsup', title: 'Unsupervised learning', description: 'Patterns', contentPoints: ['Unsupervised learning'] },
                      { id: 'e-2-rl', title: 'Reinforcement learning', description: 'Rewards', contentPoints: ['Reinforcement learning'] },
                      { id: 'e-2-feat', title: 'Feature engineering', description: 'Inputs', contentPoints: ['Feature engineering'] },
                      { id: 'e-2-train', title: 'Model training & evaluation', description: 'Process', contentPoints: ['Model training & evaluation'] },
                      { id: 'e-2-fit', title: 'Overfitting / underfitting', description: 'Balance', contentPoints: ['Overfitting / underfitting'] },
                      { id: 'e-2-data', title: 'Data quality & leakage', description: 'Integrity', contentPoints: ['Data quality & leakage'] }
                  ] 
                }
            ]
        },
        {
            id: 'e-3',
            title: 'Deep Learning & Modern Models',
            subSections: [
                { id: 'e-3-dl', title: 'Architecture', description: 'Neural Nets.', 
                  subSubSections: [
                      { id: 'e-3-nn', title: 'Neural networks', description: 'Intuition', contentPoints: ['Neural networks (intuition level)'] },
                      { id: 'e-3-arch', title: 'CNN, RNN, Transformers', description: 'Types', contentPoints: ['CNN, RNN, Transformers'] },
                      { id: 'e-3-emb', title: 'Embeddings', description: 'Vectors', contentPoints: ['Embeddings'] },
                      { id: 'e-3-ft', title: 'Fine-tuning', description: 'Adaptation', contentPoints: ['Fine-tuning vs pre-trained models'] },
                      { id: 'e-3-cost', title: 'Inference vs training cost', description: 'Compute', contentPoints: ['Inference vs training cost'] }
                  ] 
                }
            ]
        },
        {
            id: 'e-4',
            title: 'AI Engineering',
            subSections: [
                { id: 'e-4-eng', title: 'Production', description: 'Systems.', 
                  subSubSections: [
                      { id: 'e-4-not', title: 'AI ≠ model', description: 'System view', contentPoints: ['AI ≠ model'] },
                      { id: 'e-4-pipe', title: 'Pipelines', description: 'Data flow', contentPoints: ['Pipelines (data → model → output)'] },
                      { id: 'e-4-prmt', title: 'Prompt engineering', description: 'Instruction', contentPoints: ['Prompt engineering (real rules)'] },
                      { id: 'e-4-rag', title: 'RAG', description: 'Context', contentPoints: ['Retrieval-augmented generation (RAG)'] },
                      { id: 'e-4-tool', title: 'Tool calling', description: 'Action', contentPoints: ['Tool calling & function execution'] },
                      { id: 'e-4-lat', title: 'Latency, cost, reliability', description: 'Metrics', contentPoints: ['Latency, cost, reliability'] },
                      { id: 'e-4-ver', title: 'Versioning & rollback', description: 'Ops', contentPoints: ['Versioning & rollback'] }
                  ] 
                }
            ]
        },
        {
            id: 'e-5',
            title: 'Agentic Systems & Workflows',
            subSections: [
                { id: 'e-5-agent', title: 'Agents', description: 'Autonomy.', 
                  subSubSections: [
                      { id: 'e-5-what', title: 'What is an agent', description: 'Definition', contentPoints: ['What is an agent (clear definition)'] },
                      { id: 'e-5-multi', title: 'Single vs multi-agent', description: 'Topology', contentPoints: ['Single-agent vs multi-agent systems'] },
                      { id: 'e-5-plan', title: 'Planning, memory, tools', description: 'Components', contentPoints: ['Planning, memory, tools'] },
                      { id: 'e-5-dec', title: 'Task decomposition', description: 'Steps', contentPoints: ['Task decomposition'] },
                      { id: 'e-5-feed', title: 'Feedback loops', description: 'Learning', contentPoints: ['Feedback loops'] },
                      { id: 'e-5-fail', title: 'Failure containment', description: 'Safety', contentPoints: ['Failure containment'] }
                  ] 
                }
            ]
        },
        {
            id: 'e-6',
            title: 'Automation & Orchestration',
            subSections: [
                { id: 'e-6-auto', title: 'Process', description: 'Workflow.', 
                  subSubSections: [
                      { id: 'e-6-driv', title: 'AI-driven automation', description: 'Logic', contentPoints: ['AI-driven automation'] },
                      { id: 'e-6-orch', title: 'Workflow orchestration', description: 'Flow', contentPoints: ['Workflow orchestration'] },
                      { id: 'e-6-hitl', title: 'Human-in-the-loop', description: 'Control', contentPoints: ['Human-in-the-loop systems'] },
                      { id: 'e-6-grd', title: 'Guardrails & constraints', description: 'Limits', contentPoints: ['Guardrails & constraints'] },
                      { id: 'e-6-not', title: 'When not to automate', description: 'Judgment', contentPoints: ['When not to automate'] }
                  ] 
                }
            ]
        },
        {
            id: 'e-7',
            title: 'Evaluation, Safety & Alignment',
            subSections: [
                { id: 'e-7-safe', title: 'Trust', description: 'Reliability.', 
                  subSubSections: [
                      { id: 'e-7-eval', title: 'Model evaluation', description: 'Testing', contentPoints: ['Model evaluation'] },
                      { id: 'e-7-hal', title: 'Hallucination detection', description: 'Accuracy', contentPoints: ['Hallucination detection'] },
                      { id: 'e-7-inj', title: 'Prompt injection awareness', description: 'Security', contentPoints: ['Prompt injection awareness'] },
                      { id: 'e-7-priv', title: 'Data privacy', description: 'Compliance', contentPoints: ['Data privacy'] },
                      { id: 'e-7-eth', title: 'Ethical boundaries', description: 'Responsibility', contentPoints: ['Ethical boundaries'] },
                      { id: 'e-7-sec', title: 'Security considerations', description: 'Defense', contentPoints: ['Security considerations'] }
                  ] 
                }
            ]
        },
        {
            id: 'e-8',
            title: 'Human + AI Collaboration',
            subSections: [
                { id: 'e-8-hum', title: 'Synergy', description: 'Partnership.', 
                  subSubSections: [
                      { id: 'e-8-ast', title: 'AI as assistant', description: 'Role', contentPoints: ['AI as assistant, not replacement'] },
                      { id: 'e-8-sup', title: 'Decision support', description: 'Advice', contentPoints: ['Decision support systems'] },
                      { id: 'e-8-rev', title: 'Review-first workflows', description: 'Verification', contentPoints: ['Review-first workflows'] },
                      { id: 'e-8-tru', title: 'Trust calibration', description: 'Reliance', contentPoints: ['Trust calibration'] },
                      { id: 'e-8-skl', title: 'Skill amplification', description: 'Growth', contentPoints: ['Skill amplification'] }
                  ] 
                }
            ]
        },
        {
            id: 'e-9',
            title: 'Real-World Use Cases',
            subSections: [
                { id: 'e-9-case', title: 'Applications', description: 'Practical.', 
                  subSubSections: [
                      { id: 'e-9-code', title: 'Coding assistants', description: 'DevTools', contentPoints: ['Coding assistants'] },
                      { id: 'e-9-res', title: 'Research copilots', description: 'Knowledge', contentPoints: ['Research copilots'] },
                      { id: 'e-9-cont', title: 'Content systems', description: 'Generation', contentPoints: ['Content systems'] },
                      { id: 'e-9-mon', title: 'Monitoring & analysis', description: 'Ops', contentPoints: ['Monitoring & analysis tools'] },
                      { id: 'e-9-tool', title: 'Internal tools', description: 'Enterprise', contentPoints: ['Internal tools for teams'] }
                  ] 
                }
            ]
        }
    ]
  },
  {
    id: 'pillar-g',
    code: 'G',
    title: 'Data Intelligence, Databases & Decision Engineering',
    description: 'Data Engineering, Databases, and Decision Engineering. Data != Truth.',
    color: 'text-cyan-600',
    icon: 'Database',
    sections: [
        {
            id: 'g-0',
            title: 'Data Thinking & Reality',
            subSections: [
                { id: 'g-0-mind', title: 'Mindset', description: 'Truth.', 
                  subSubSections: [
                      { id: 'g-0-fake', title: 'Data ≠ truth', description: 'Reality', contentPoints: ['Data ≠ truth'] },
                      { id: 'g-0-bias', title: 'Bias, noise, assumptions', description: 'Errors', contentPoints: ['Bias, noise, assumptions'] },
                      { id: 'g-0-wrng', title: 'Wrong data impact', description: 'Risk', contentPoints: ['Wrong data → confident wrong decisions'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-1',
            title: 'Data Structures for Data Systems',
            subSections: [
                { id: 'g-1-ds', title: 'Storage', description: 'Internals.', 
                  subSubSections: [
                      { id: 'g-1-how', title: 'How data is stored', description: 'Disk/Mem', contentPoints: ['How data is stored'] },
                      { id: 'g-1-idx', title: 'Indexing logic', description: 'Access', contentPoints: ['Indexing logic'] },
                      { id: 'g-1-look', title: 'Lookup vs scan', description: 'Perf', contentPoints: ['Lookup vs scan'] },
                      { id: 'g-1-cost', title: 'Cost of operations', description: 'Complexity', contentPoints: ['Cost of operations'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-2',
            title: 'Database Fundamentals',
            subSections: [
                { id: 'g-2-db', title: 'Concepts', description: 'Core.', 
                  subSubSections: [
                      { id: 'g-2-rel', title: 'Relational concepts', description: 'Tables', contentPoints: ['Relational concepts'] },
                      { id: 'g-2-key', title: 'Keys, constraints', description: 'Integrity', contentPoints: ['Keys, constraints'] },
                      { id: 'g-2-tx', title: 'Transactions & consistency', description: 'ACID', contentPoints: ['Transactions & consistency'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-3',
            title: 'Data Modeling & Schema Design',
            subSections: [
                { id: 'g-3-mod', title: 'Design', description: 'Structure.', 
                  subSubSections: [
                      { id: 'g-3-er', title: 'Entity-relationship thinking', description: 'Models', contentPoints: ['Entity-relationship thinking'] },
                      { id: 'g-3-norm', title: 'Normalization vs denormalization', description: 'Tradeoffs', contentPoints: ['Normalization vs denormalization'] },
                      { id: 'g-3-evo', title: 'Schema evolution', description: 'Change', contentPoints: ['Schema evolution'] },
                      { id: 'g-3-chg', title: 'Designing for change', description: 'Flexibility', contentPoints: ['Designing for change'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-4',
            title: 'SQL',
            subSections: [
                { id: 'g-4-sql', title: 'Querying', description: 'Usage.', 
                  subSubSections: [
                      { id: 'g-4-log', title: 'Logical query thinking', description: 'Sets', contentPoints: ['Logical query thinking'] },
                      { id: 'g-4-join', title: 'JOIN cost', description: 'Perf', contentPoints: ['JOIN cost'] },
                      { id: 'g-4-idx', title: 'Index usage', description: 'Speed', contentPoints: ['Index usage'] },
                      { id: 'g-4-opt', title: 'Query optimization', description: 'Tuning', contentPoints: ['Query optimization mindset'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-5',
            title: 'Performance, Scale & Cost',
            subSections: [
                { id: 'g-5-perf', title: 'Efficiency', description: 'Limits.', 
                  subSubSections: [
                      { id: 'g-5-slow', title: 'Why systems slow down', description: 'Analysis', contentPoints: ['Why systems slow down'] },
                      { id: 'g-5-big', title: 'Large data behaviour', description: 'Scale', contentPoints: ['Large data behaviour'] },
                      { id: 'g-5-mem', title: 'Memory vs disk', description: 'Hardware', contentPoints: ['Memory vs disk'] },
                      { id: 'g-5-bad', title: 'Cost of bad queries', description: 'Impact', contentPoints: ['Cost of bad queries'] },
                      { id: 'g-5-scl', title: 'When scaling hurts', description: 'Complexity', contentPoints: ['When scaling hurts'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-6',
            title: 'Data Analysis & Exploration',
            subSections: [
                { id: 'g-6-ana', title: 'Inquiry', description: 'Patterns.', 
                  subSubSections: [
                      { id: 'g-6-ask', title: 'Asking correct questions', description: 'Inquiry', contentPoints: ['Asking correct questions'] },
                      { id: 'g-6-out', title: 'Outliers vs trends', description: 'Signal', contentPoints: ['Outliers vs trends'] },
                      { id: 'g-6-pat', title: 'False patterns', description: 'Noise', contentPoints: ['False patterns'] },
                      { id: 'g-6-trap', title: 'Analysis traps', description: 'Errors', contentPoints: ['Analysis traps'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-7',
            title: 'Time, History & Change in Data',
            subSections: [
                { id: 'g-7-time', title: 'Temporal', description: 'Evolution.', 
                  subSubSections: [
                      { id: 'g-7-ts', title: 'Time-series thinking', description: 'Events', contentPoints: ['Time-series thinking'] },
                      { id: 'g-7-hist', title: 'Historical data', description: 'Records', contentPoints: ['Historical data'] },
                      { id: 'g-7-aud', title: 'Audit trails', description: 'Tracking', contentPoints: ['Audit trails'] },
                      { id: 'g-7-ver', title: 'Data versioning', description: 'State', contentPoints: ['Data versioning'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-8',
            title: 'Visualization & Communication',
            subSections: [
                { id: 'g-8-vis', title: 'Presentation', description: 'Story.', 
                  subSubSections: [
                      { id: 'g-8-hon', title: 'Honest charts', description: 'Truth', contentPoints: ['Honest charts'] },
                      { id: 'g-8-mis', title: 'Misleading visuals', description: 'Lies', contentPoints: ['Misleading visuals'] },
                      { id: 'g-8-stry', title: 'Storytelling', description: 'Narrative', contentPoints: ['Storytelling'] },
                      { id: 'g-8-exec', title: 'Executive vs engineer view', description: 'Audience', contentPoints: ['Executive vs engineer view'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-9',
            title: 'Data Pipelines & Reliability',
            subSections: [
                { id: 'g-9-pipe', title: 'Flow', description: 'Movement.', 
                  subSubSections: [
                      { id: 'g-9-und', title: 'Data flow understanding', description: 'Map', contentPoints: ['Data flow understanding'] },
                      { id: 'g-9-fail', title: 'Failure points', description: 'Risk', contentPoints: ['Failure points'] },
                      { id: 'g-9-brok', title: 'Broken data detection', description: 'Monitoring', contentPoints: ['Broken data detection'] },
                      { id: 'g-9-tru', title: 'Trust signals', description: 'Quality', contentPoints: ['Trust signals'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-10',
            title: 'Decision Engineering with Data',
            subSections: [
                { id: 'g-10-dec', title: 'Action', description: 'Judgment.', 
                  subSubSections: [
                      { id: 'g-10-kpi', title: 'KPI vs vanity', description: 'Metrics', contentPoints: ['KPI vs vanity'] },
                      { id: 'g-10-pri', title: 'Data-driven prioritization', description: 'Focus', contentPoints: ['Data-driven prioritization'] },
                      { id: 'g-10-ign', title: 'When to ignore data', description: 'Intuition', contentPoints: ['When to ignore data'] },
                      { id: 'g-10-hum', title: 'Human judgement + data', description: 'Hybrid', contentPoints: ['Human judgement + data'] }
                  ] 
                }
            ]
        },
        {
            id: 'g-11',
            title: 'Data Security, Privacy & Ethics',
            subSections: [
                { id: 'g-11-sec', title: 'Protection', description: 'Compliance.', 
                  subSubSections: [
                      { id: 'g-11-sens', title: 'Sensitive data', description: 'PII', contentPoints: ['Sensitive data'] },
                      { id: 'g-11-acc', title: 'Access control', description: 'Permissions', contentPoints: ['Access control'] },
                      { id: 'g-11-comp', title: 'Compliance awareness', description: 'Law', contentPoints: ['Compliance awareness'] },
                      { id: 'g-11-eth', title: 'Ethical boundaries', description: 'Right/Wrong', contentPoints: ['Ethical boundaries'] }
                  ] 
                }
            ]
        }
    ]
  }
];