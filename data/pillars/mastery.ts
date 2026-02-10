import { Pillar } from '../../types';

export const MASTERY_PILLARS: Pillar[] = [
  {
    id: 'pillar-j',
    code: 'J',
    title: 'Productivity, Work Systems & Execution',
    description: 'Systematizing execution. Outcomes > Activity.',
    color: 'text-teal-600',
    icon: 'Briefcase',
    sections: [
        {
            id: 'j-0',
            title: 'Work & Execution Mindset',
            subSections: [
                { id: 'j-0-mind', title: 'Philosophy', description: 'Approach.', 
                  subSubSections: [
                      { id: 'j-0-out', title: 'Outcome vs activity', description: 'Results', contentPoints: ['Outcome vs activity'] },
                      { id: 'j-0-tool', title: 'Tool ≠ productivity', description: 'Usage', contentPoints: ['Tool ≠ productivity'] },
                      { id: 'j-0-att', title: 'Attention as resource', description: 'Focus', contentPoints: ['Attention as resource'] },
                      { id: 'j-0-sys', title: 'Work as system', description: 'Process', contentPoints: ['Work as system'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-1',
            title: 'Personal Workflow System',
            subSections: [
                { id: 'j-1-flow', title: 'System', description: 'Method.', 
                  subSubSections: [
                      { id: 'j-1-cap', title: 'Task capture', description: 'Inbox', contentPoints: ['Task capture systems'] },
                      { id: 'j-1-plan', title: 'Daily / Weekly planning', description: 'Strategy', contentPoints: ['Daily / weekly planning'] },
                      { id: 'j-1-prio', title: 'Context & priority', description: 'Order', contentPoints: ['Context & priority handling'] },
                      { id: 'j-1-cog', title: 'Cognitive load reduction', description: 'Simplicity', contentPoints: ['Cognitive load reduction'] },
                      { id: 'j-1-loop', title: 'Execution loop', description: 'Doing', contentPoints: ['Personal execution loop'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-2',
            title: 'Time, Energy & Focus Engineering',
            subSections: [
                { id: 'j-2-eng', title: 'Resources', description: 'Capacity.', 
                  subSubSections: [
                      { id: 'j-2-deep', title: 'Deep vs shallow work', description: 'Intensity', contentPoints: ['Deep work vs shallow work'] },
                      { id: 'j-2-cyc', title: 'Energy cycles', description: 'Rhythm', contentPoints: ['Energy cycles'] },
                      { id: 'j-2-prot', title: 'Focus protection', description: 'Boundaries', contentPoints: ['Focus protection'] },
                      { id: 'j-2-burn', title: 'Burnout prevention', description: 'Health', contentPoints: ['Burnout prevention'] },
                      { id: 'j-2-sus', title: 'Sustainable productivity', description: 'Long term', contentPoints: ['Sustainable productivity'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-3',
            title: 'Documentation & Knowledge Engineering',
            subSections: [
                { id: 'j-3-doc', title: 'Writing', description: 'Clarity.', 
                  subSubSections: [
                      { id: 'j-3-struct', title: 'Structured documentation', description: 'Format', contentPoints: ['Structured documentation'] },
                      { id: 'j-3-tech', title: 'Technical writing', description: 'Skill', contentPoints: ['Technical & professional writing'] },
                      { id: 'j-3-liv', title: 'Living documents', description: 'Updates', contentPoints: ['Living documents'] },
                      { id: 'j-3-ver', title: 'Versioning & clarity', description: 'History', contentPoints: ['Versioning & clarity'] },
                      { id: 'j-3-tool', title: 'Docs Tools', description: 'Markdown', contentPoints: ['Tools: Word, Docs, Markdown'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-4',
            title: 'Spreadsheet & Analytical Thinking',
            subSections: [
                { id: 'j-4-data', title: 'Analysis', description: 'Logic.', 
                  subSubSections: [
                      { id: 'j-4-log', title: 'Spreadsheet logic', description: 'Formulas', contentPoints: ['Spreadsheet as logic engine'] },
                      { id: 'j-4-err', title: 'Error-proof modeling', description: 'Validation', contentPoints: ['Error-proof modeling'] },
                      { id: 'j-4-tab', title: 'Decision tables', description: 'Choices', contentPoints: ['Decision tables'] },
                      { id: 'j-4-risk', title: 'Risk of wrong numbers', description: 'Impact', contentPoints: ['Risk of wrong numbers'] },
                      { id: 'j-4-tool', title: 'Excel/Sheets', description: 'Software', contentPoints: ['Tools: Excel, Sheets, VBA awareness'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-5',
            title: 'Presentation & Executive Communication',
            subSections: [
                { id: 'j-5-pres', title: 'Storytelling', description: 'Delivery.', 
                  subSubSections: [
                      { id: 'j-5-data', title: 'Storytelling with data', description: 'Narrative', contentPoints: ['Storytelling with data'] },
                      { id: 'j-5-min', title: 'Slide minimalism', description: 'Clarity', contentPoints: ['Slide minimalism'] },
                      { id: 'j-5-msg', title: 'One-message clarity', description: 'Focus', contentPoints: ['One-message clarity'] },
                      { id: 'j-5-eth', title: 'Persuasion ethics', description: 'Trust', contentPoints: ['Persuasion ethics'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-6',
            title: 'Email, Calendar & Async Communication',
            subSections: [
                { id: 'j-6-async', title: 'Comms', description: 'Remote.', 
                  subSubSections: [
                      { id: 'j-6-inb', title: 'Inbox control', description: 'Zero', contentPoints: ['Inbox control'] },
                      { id: 'j-6-cal', title: 'Calendar discipline', description: 'Time', contentPoints: ['Calendar discipline'] },
                      { id: 'j-6-mind', title: 'Async-first mindset', description: 'Remote', contentPoints: ['Async-first mindset'] },
                      { id: 'j-6-meet', title: 'Meeting avoidance', description: 'Efficiency', contentPoints: ['Meeting avoidance when possible'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-7',
            title: 'Meetings Engineering',
            subSections: [
                { id: 'j-7-meet', title: 'Efficiency', description: 'Value.', 
                  subSubSections: [
                      { id: 'j-7-agen', title: 'Agenda-driven', description: 'Plan', contentPoints: ['Agenda-driven meetings'] },
                      { id: 'j-7-dec', title: 'Decision vs discussion', description: 'Outcome', contentPoints: ['Decision vs discussion'] },
                      { id: 'j-7-box', title: 'Time-boxing', description: 'Limits', contentPoints: ['Time-boxing'] },
                      { id: 'j-7-canc', title: 'Cancellation skill', description: 'Value', contentPoints: ['Cancellation skill'] },
                      { id: 'j-7-note', title: 'Notes & follow-up', description: 'Action', contentPoints: ['Meeting notes & follow-up'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-8',
            title: 'Collaboration & Team Dynamics',
            subSections: [
                { id: 'j-8-team', title: 'Synergy', description: 'People.', 
                  subSubSections: [
                      { id: 'j-8-own', title: 'Ownership & accountability', description: 'Responsibility', contentPoints: ['Ownership & accountability'] },
                      { id: 'j-8-feed', title: 'Feedback loops', description: 'Growth', contentPoints: ['Feedback loops'] },
                      { id: 'j-8-conf', title: 'Conflict reduction', description: 'Harmony', contentPoints: ['Conflict reduction'] },
                      { id: 'j-8-cross', title: 'Cross-functional work', description: 'Bridging', contentPoints: ['Cross-functional work'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-9',
            title: 'Project & Task Management',
            subSections: [
                { id: 'j-9-proj', title: 'Delivery', description: 'Tracking.', 
                  subSubSections: [
                      { id: 'j-9-dec', title: 'Task decomposition', description: 'Breakdown', contentPoints: ['Task decomposition'] },
                      { id: 'j-9-dep', title: 'Dependencies', description: 'Blockers', contentPoints: ['Dependencies'] },
                      { id: 'j-9-risk', title: 'Risk tracking', description: 'Mitigation', contentPoints: ['Risk tracking'] },
                      { id: 'j-9-scop', title: 'Scope control', description: 'Creep', contentPoints: ['Scope control'] },
                      { id: 'j-9-tool', title: 'Tools', description: 'Jira/Project', contentPoints: ['Tools: Jira, MS Project (conceptual)'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-10',
            title: 'Automation for Work Efficiency',
            subSections: [
                { id: 'j-10-auto', title: 'Speed', description: 'Scaling.', 
                  subSubSections: [
                      { id: 'j-10-rep', title: 'Repetition detection', description: 'DRY', contentPoints: ['Repetition detection'] },
                      { id: 'j-10-mac', title: 'Macro & script mindset', description: 'Tools', contentPoints: ['Macro & script mindset'] },
                      { id: 'j-10-hitl', title: 'Human-in-the-loop', description: 'Control', contentPoints: ['Human-in-the-loop automation'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-11',
            title: 'Information, File & Digital Hygiene',
            subSections: [
                { id: 'j-11-org', title: 'Organization', description: 'Clean.', 
                  subSubSections: [
                      { id: 'j-11-name', title: 'Naming systems', description: 'Standards', contentPoints: ['Naming systems'] },
                      { id: 'j-11-ver', title: 'Version discipline', description: 'History', contentPoints: ['Version discipline'] },
                      { id: 'j-11-back', title: 'Backup thinking', description: 'Safety', contentPoints: ['Backup thinking'] },
                      { id: 'j-11-decl', title: 'Digital declutter', description: 'Focus', contentPoints: ['Digital declutter'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-12',
            title: 'Decision Engineering & Traceability',
            subSections: [
                { id: 'j-12-dec', title: 'Choices', description: 'History.', 
                  subSubSections: [
                      { id: 'j-12-log', title: 'Decision logs', description: 'Record', contentPoints: ['Decision logs'] },
                      { id: 'j-12-ass', title: 'Assumptions tracking', description: 'Reality', contentPoints: ['Assumptions tracking'] },
                      { id: 'j-12-rev', title: 'Reversible decisions', description: 'Speed', contentPoints: ['Reversible vs irreversible decisions'] },
                      { id: 'j-12-acc', title: 'Accountability trail', description: 'Ownership', contentPoints: ['Accountability trail'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-13',
            title: 'Stakeholder & Upward Communication',
            subSections: [
                { id: 'j-13-comm', title: 'Relations', description: 'Trust.', 
                  subSubSections: [
                      { id: 'j-13-stat', title: 'Status reporting', description: 'Updates', contentPoints: ['Status reporting'] },
                      { id: 'j-13-exp', title: 'Expectation management', description: 'Reality', contentPoints: ['Expectation management'] },
                      { id: 'j-13-no', title: 'Saying "no" professionally', description: 'Boundaries', contentPoints: ['Saying "no" professionally'] },
                      { id: 'j-13-bad', title: 'Bad news delivery', description: 'Honesty', contentPoints: ['Bad news delivery'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-14',
            title: 'Security, Compliance & Professional Risk',
            subSections: [
                { id: 'j-14-risk', title: 'Safety', description: 'Legal.', 
                  subSubSections: [
                      { id: 'j-14-sens', title: 'Data sensitivity', description: 'Privacy', contentPoints: ['Data sensitivity'] },
                      { id: 'j-14-nda', title: 'NDA awareness', description: 'Legal', contentPoints: ['NDA awareness'] },
                      { id: 'j-14-ip', title: 'IP ownership', description: 'Rights', contentPoints: ['IP ownership basics'] },
                      { id: 'j-14-comp', title: 'Compliance mindset', description: 'Rules', contentPoints: ['Compliance mindset'] },
                      { id: 'j-14-liab', title: 'Professional liability', description: 'Risk', contentPoints: ['Professional liability'] }
                  ] 
                }
            ]
        },
        {
            id: 'j-15',
            title: 'Knowledge Decay & Maintenance',
            subSections: [
                { id: 'j-15-know', title: 'Retention', description: 'Upkeep.', 
                  subSubSections: [
                      { id: 'j-15-half', title: 'Information half-life', description: 'Aging', contentPoints: ['Information half-life'] },
                      { id: 'j-15-rot', title: 'Doc rot detection', description: 'Stale', contentPoints: ['Doc rot detection'] },
                      { id: 'j-15-rev', title: 'Periodic review', description: 'Refresh', contentPoints: ['Periodic review'] },
                      { id: 'j-15-cyc', title: 'Knowledge refresh cycles', description: 'Learning', contentPoints: ['Knowledge refresh cycles'] }
                  ] 
                }
            ]
        }
    ]
  },
  {
    id: 'pillar-l',
    code: 'L',
    title: 'Real-World Engineering & Professional Mastery',
    description: 'Judgment > Tools. The Elite Engineer Mindset.',
    color: 'text-slate-600',
    icon: 'Award',
    sections: [
        {
            id: 'l-0',
            title: 'Reality of Engineering',
            subSections: [
                { id: 'l-0-real', title: 'Truth', description: 'Mindset.', 
                  subSubSections: [
                      { id: 'l-0-best', title: 'Best practice myth', description: 'Context', contentPoints: ['"Best practice" ≠ universal truth'] },
                      { id: 'l-0-con', title: 'Constraint-driven', description: 'Limits', contentPoints: ['Constraint-driven engineering'] },
                      { id: 'l-0-tri', title: 'Time/Cost/Risk', description: 'Balance', contentPoints: ['Time, cost, risk—all together'] },
                      { id: 'l-0-perf', title: 'No perfect system', description: 'Reality', contentPoints: ['Perfect system does not exist'] },
                      { id: 'l-0-fail', title: 'Why smart systems fail', description: 'Complexity', contentPoints: ['Why smart systems still fail'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-1',
            title: 'Debugging as a Thinking Skill',
            subSections: [
                { id: 'l-1-debug', title: 'Solving', description: 'Logic.', 
                  subSubSections: [
                      { id: 'l-1-err', title: 'Bug ≠ error message', description: 'Root', contentPoints: ['Bug ≠ error message'] },
                      { id: 'l-1-hyp', title: 'Hypothesis-based', description: 'Method', contentPoints: ['Hypothesis-based debugging'] },
                      { id: 'l-1-bin', title: 'Binary-search mindset', description: 'Isolation', contentPoints: ['Binary-search mindset'] },
                      { id: 'l-1-rep', title: 'Reproducibility', description: 'Consistency', contentPoints: ['Reproducibility discipline'] },
                      { id: 'l-1-fix', title: 'Quick fix traps', description: 'Future bugs', contentPoints: ['Quick fix as future bug'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-2',
            title: 'Testing, Quality & Confidence Engineering',
            subSections: [
                { id: 'l-2-qa', title: 'Confidence', description: 'Assurance.', 
                  subSubSections: [
                      { id: 'l-2-phil', title: 'Testing philosophy', description: 'Why', contentPoints: ['Testing philosophy (what / why)'] },
                      { id: 'l-2-pyr', title: 'Unit vs Int vs Sys', description: 'Layers', contentPoints: ['Unit vs integration vs system tests'] },
                      { id: 'l-2-risk', title: 'Risk-based testing', description: 'Priority', contentPoints: ['Risk-based testing'] },
                      { id: 'l-2-reg', title: 'Regression prevention', description: 'Safety', contentPoints: ['Regression prevention'] },
                      { id: 'l-2-spd', title: 'Quality vs speed', description: 'Tradeoff', contentPoints: ['Quality vs speed trade-off'] },
                      { id: 'l-2-del', title: 'Confidence-driven delivery', description: 'Trust', contentPoints: ['Confidence-driven delivery'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-3',
            title: 'Reading & Owning Large Codebases',
            subSections: [
                { id: 'l-3-code', title: 'Legacy', description: 'Scale.', 
                  subSubSections: [
                      { id: 'l-3-ent', title: 'Unknown code entry', description: 'Strategy', contentPoints: ['Unknown code entry strategy'] },
                      { id: 'l-3-side', title: 'Side-effect detection', description: 'Risk', contentPoints: ['Side-effect detection'] },
                      { id: 'l-3-dep', title: 'Dependency & blast-radius', description: 'Impact', contentPoints: ['Dependency & blast-radius thinking'] },
                      { id: 'l-3-safe', title: 'Safe change discipline', description: 'Modding', contentPoints: ['Safe change discipline'] },
                      { id: 'l-3-own', title: 'Ownership mindset', description: 'Responsibility', contentPoints: ['Ownership mindset'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-4',
            title: 'Engineering Decisions & Trade-Off Mastery',
            subSections: [
                { id: 'l-4-dec', title: 'Choices', description: 'Balance.', 
                  subSubSections: [
                      { id: 'l-4-read', title: 'Perf vs readability', description: 'Code', contentPoints: ['Performance vs readability'] },
                      { id: 'l-4-safe', title: 'Speed vs safety', description: 'Process', contentPoints: ['Speed vs safety'] },
                      { id: 'l-4-build', title: 'Build vs buy', description: 'Vendor', contentPoints: ['Build vs buy'] },
                      { id: 'l-4-win', title: 'Short vs Long term', description: 'Strategy', contentPoints: ['Short-term win vs long-term debt'] },
                      { id: 'l-4-cost', title: 'Decision cost awareness', description: 'Impact', contentPoints: ['Decision cost awareness'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-5',
            title: 'Technical Debt & Long-Term Maintenance',
            subSections: [
                { id: 'l-5-debt', title: 'Sustainability', description: 'Health.', 
                  subSubSections: [
                      { id: 'l-5-int', title: 'Intentional vs accidental', description: 'Types', contentPoints: ['Intentional vs accidental debt'] },
                      { id: 'l-5-rate', title: 'Debt interest', description: 'Growth', contentPoints: ['Debt interest concept'] },
                      { id: 'l-5-ref', title: 'When to refactor', description: 'Timing', contentPoints: ['When to refactor'] },
                      { id: 'l-5-not', title: 'When NOT to refactor', description: 'Risk', contentPoints: ['When NOT to refactor'] },
                      { id: 'l-5-econ', title: 'Maintenance economics', description: 'Cost', contentPoints: ['Maintenance economics'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-6',
            title: 'Failure Analysis & Root-Cause Thinking',
            subSections: [
                { id: 'l-6-fail', title: 'Analysis', description: 'Prevention.', 
                  subSubSections: [
                      { id: 'l-6-sym', title: 'Symptom vs root cause', description: 'Depth', contentPoints: ['Symptom vs root cause'] },
                      { id: 'l-6-why', title: '5-Why analysis', description: 'Technique', contentPoints: ['5-Why analysis'] },
                      { id: 'l-6-pat', title: 'Pattern recognition', description: 'Experience', contentPoints: ['Pattern recognition'] },
                      { id: 'l-6-fix', title: 'Preventive fixes', description: 'Solution', contentPoints: ['Preventive fixes'] },
                      { id: 'l-6-learn', title: 'Learning loops', description: 'Growth', contentPoints: ['Learning loops'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-7',
            title: 'Code Review, Standards & Peer Engineering',
            subSections: [
                { id: 'l-7-rev', title: 'Quality', description: 'Team.', 
                  subSubSections: [
                      { id: 'l-7-mind', title: 'Review mindset', description: 'Critique', contentPoints: ['Review mindset'] },
                      { id: 'l-7-read', title: 'Reading others’ code', description: 'Skill', contentPoints: ['Reading others’ code'] },
                      { id: 'l-7-feed', title: 'Constructive feedback', description: 'Tone', contentPoints: ['Constructive feedback'] },
                      { id: 'l-7-std', title: 'Standards vs style', description: 'Bikeshedding', contentPoints: ['Standards vs style wars'] },
                      { id: 'l-7-prev', title: 'Gatekeeping', description: 'Quality', contentPoints: ['Preventing bad code before merge'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-8',
            title: 'Documentation Ownership & Continuity',
            subSections: [
                { id: 'l-8-doc', title: 'Handover', description: 'Legacy.', 
                  subSubSections: [
                      { id: 'l-8-touch', title: '"If you touched it, doc it"', description: 'Rule', contentPoints: ['"If you touched it, document it"'] },
                      { id: 'l-8-bus', title: 'Bus-factor awareness', description: 'Risk', contentPoints: ['Bus-factor awareness'] },
                      { id: 'l-8-silo', title: 'Knowledge silo', description: 'Sharing', contentPoints: ['Knowledge silo risk'] },
                      { id: 'l-8-hand', title: 'Handover discipline', description: 'Process', contentPoints: ['Handover discipline'] },
                      { id: 'l-8-long', title: 'Long-term maintainability', description: 'Future', contentPoints: ['Long-term maintainability'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-9',
            title: 'Mentorship, Culture & Engineering Leadership',
            subSections: [
                { id: 'l-9-lead', title: 'Growth', description: 'Influence.', 
                  subSubSections: [
                      { id: 'l-9-teach', title: 'Teaching juniors', description: 'Growth', contentPoints: ['Teaching juniors'] },
                      { id: 'l-9-ment', title: 'Review-based mentoring', description: 'Method', contentPoints: ['Review-based mentoring'] },
                      { id: 'l-9-ego', title: 'Ego-less leadership', description: 'Attitude', contentPoints: ['Ego-less leadership'] },
                      { id: 'l-9-bar', title: 'Raising team bar', description: 'Standards', contentPoints: ['Raising team bar'] },
                      { id: 'l-9-cult', title: 'Culture > rules', description: 'Values', contentPoints: ['Culture > rules'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-10',
            title: 'Accountability & Decision Aftermath',
            subSections: [
                { id: 'l-10-acc', title: 'Integrity', description: 'Ownership.', 
                  subSubSections: [
                      { id: 'l-10-bad', title: 'Owning bad decisions', description: 'Honesty', contentPoints: ['Owning bad decisions'] },
                      { id: 'l-10-post', title: 'Post-decision review', description: 'Learning', contentPoints: ['Post-decision review'] },
                      { id: 'l-10-wrng', title: '"I was wrong" skill', description: 'Maturity', contentPoints: ['"I was wrong" skill'] },
                      { id: 'l-10-trust', title: 'Trust recovery', description: 'Repair', contentPoints: ['Trust recovery'] },
                      { id: 'l-10-prof', title: 'Professional integrity', description: 'Ethics', contentPoints: ['Professional integrity'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-11',
            title: 'Ethics, Liability & Professional Risk',
            subSections: [
                { id: 'l-11-eth', title: 'Values', description: 'Safety.', 
                  subSubSections: [
                      { id: 'l-11-can', title: 'Can do vs should do', description: 'Choice', contentPoints: ['Can do vs should do'] },
                      { id: 'l-11-harm', title: 'User harm awareness', description: 'Impact', contentPoints: ['User harm awareness'] },
                      { id: 'l-11-data', title: 'Data misuse risk', description: 'Privacy', contentPoints: ['Data misuse risk'] },
                      { id: 'l-11-leg', title: 'Legal basics', description: 'Law', contentPoints: ['Legal & liability basics'] },
                      { id: 'l-11-car', title: 'Career-ending mistakes', description: 'Survival', contentPoints: ['Career-ending mistakes'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-12',
            title: 'Communication Under Pressure',
            subSections: [
                { id: 'l-12-comm', title: 'Crisis', description: 'Clarity.', 
                  subSubSections: [
                      { id: 'l-12-inc', title: 'Incident communication', description: 'Status', contentPoints: ['Incident communication'] },
                      { id: 'l-12-news', title: 'Bad news delivery', description: 'Speed', contentPoints: ['Bad news delivery'] },
                      { id: 'l-12-non', title: 'Non-technical stakeholders', description: 'Translation', contentPoints: ['Non-technical stakeholders'] },
                      { id: 'l-12-wrt', title: 'Written clarity under stress', description: 'Focus', contentPoints: ['Written clarity under stress'] },
                      { id: 'l-12-sig', title: 'Signal vs noise', description: 'Info', contentPoints: ['Signal vs noise'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-13',
            title: 'Estimation, Planning & Reality Calibration',
            subSections: [
                { id: 'l-13-plan', title: 'Forecasting', description: 'Accuracy.', 
                  subSubSections: [
                      { id: 'l-13-fail', title: 'Why estimates fail', description: 'Optimism', contentPoints: ['Why estimates fail'] },
                      { id: 'l-13-unk', title: 'Unknown-unknowns', description: 'Surprise', contentPoints: ['Unknown-unknowns'] },
                      { id: 'l-13-buf', title: 'Risk buffers', description: 'Padding', contentPoints: ['Risk buffers'] },
                      { id: 'l-13-hon', title: 'Honest estimation', description: 'Truth', contentPoints: ['Honest estimation'] },
                      { id: 'l-13-re', title: 'Re-estimation skill', description: 'Update', contentPoints: ['Re-estimation skill'] }
                  ] 
                }
            ]
        },
        {
            id: 'l-14',
            title: 'Strategy Thinking for Engineers',
            subSections: [
                { id: 'l-14-strat', title: 'Vision', description: 'Value.', 
                  subSubSections: [
                      { id: 'l-14-big', title: 'Big-picture awareness', description: 'Context', contentPoints: ['Big-picture awareness'] },
                      { id: 'l-14-aln', title: 'Business vs tech alignment', description: 'Goal', contentPoints: ['Business vs tech alignment'] },
                      { id: 'l-14-opp', title: 'Opportunity cost', description: 'Loss', contentPoints: ['Opportunity cost'] },
                      { id: 'l-14-die', title: 'Why features die', description: 'Usage', contentPoints: ['Why features die'] },
                      { id: 'l-14-val', title: 'Value-driven thinking', description: 'ROI', contentPoints: ['Value-driven thinking'] }
                  ] 
                }
            ]
        }
    ]
  }
];