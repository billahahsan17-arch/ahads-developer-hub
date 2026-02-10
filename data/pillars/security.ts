import { Pillar } from '../../types';

export const SECURITY_PILLARS: Pillar[] = [
  {
    id: 'pillar-f',
    code: 'F',
    title: 'Cyber Intelligence, Security & Digital Defense Engineering',
    description: 'Secure Engineer + Defender + Decision Maker. Not just hacking.',
    color: 'text-red-600',
    icon: 'Shield',
    sections: [
        {
            id: 'f-0',
            title: 'Security Mindset',
            subSections: [
                { id: 'f-0-mind', title: 'Foundation', description: 'Basics.', 
                  subSubSections: [
                      { id: 'f-0-def', title: 'What is Security', description: 'Core', contentPoints: ['What is Security'] },
                      { id: 'f-0-cia', title: 'CIA Triad', description: 'Confidentiality, Integrity, Availability', contentPoints: ['CIA Triad'] },
                      { id: 'f-0-risk', title: 'Threat, Vulnerability, Risk', description: 'Definitions', contentPoints: ['Threat, Vulnerability, Risk'] },
                      { id: 'f-0-surf', title: 'Attack surface', description: 'Exposure', contentPoints: ['Attack surface'] },
                      { id: 'f-0-trst', title: 'Trust boundary', description: 'Limits', contentPoints: ['Trust boundary'] },
                      { id: 'f-0-lim', title: 'Security limitations', description: 'Reality', contentPoints: ['Security limitations'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-1',
            title: 'Adversarial Thinking',
            subSections: [
                { id: 'f-1-adv', title: 'Offense', description: 'Attacker View.', 
                  subSubSections: [
                      { id: 'f-1-mot', title: 'Attacker motivation', description: 'Why', contentPoints: ['Attacker motivation'] },
                      { id: 'f-1-rec', title: 'Reconnaissance', description: 'Scouting', contentPoints: ['Reconnaissance'] },
                      { id: 'f-1-ass', title: 'Assumption breaking', description: 'Exploits', contentPoints: ['Assumption breaking'] },
                      { id: 'f-1-red', title: 'Red vs Blue Team', description: 'Roles', contentPoints: ['Red Team vs Blue Team mindset'] },
                      { id: 'f-1-byp', title: 'Best practice bypass', description: 'Tricks', contentPoints: ['"Best practice bypass"'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-2',
            title: 'Identity, Access & Trust Security',
            subSections: [
                { id: 'f-2-iam', title: 'Auth', description: 'Identity.', 
                  subSubSections: [
                      { id: 'f-2-auth', title: 'AuthN vs AuthZ', description: 'Who vs What', contentPoints: ['Authentication vs Authorization'] },
                      { id: 'f-2-life', title: 'Identity lifecycle', description: 'CRUD', contentPoints: ['Identity lifecycle'] },
                      { id: 'f-2-cred', title: 'Password, token, session', description: 'Mechanisms', contentPoints: ['Password, token, session'] },
                      { id: 'f-2-priv', title: 'Least privilege', description: 'Minimization', contentPoints: ['Least privilege'] },
                      { id: 'f-2-zero', title: 'Zero-trust', description: 'Verify always', contentPoints: ['Zero-trust concept'] },
                      { id: 'f-2-hij', title: 'Session hijacking', description: 'Theft', contentPoints: ['Session hijacking awareness'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-3',
            title: 'Network & Infrastructure Security',
            subSections: [
                { id: 'f-3-net', title: 'Perimeter', description: 'Defense.', 
                  subSubSections: [
                      { id: 'f-3-fund', title: 'Network security fundamentals', description: 'Basics', contentPoints: ['Network security fundamentals'] },
                      { id: 'f-3-fw', title: 'Firewalls, segmentation', description: 'Filtering', contentPoints: ['Firewalls, segmentation'] },
                      { id: 'f-3-dns', title: 'Secure DNS', description: 'Naming', contentPoints: ['Secure DNS'] },
                      { id: 'f-3-vpn', title: 'VPN concept', description: 'Tunneling', contentPoints: ['VPN concept'] },
                      { id: 'f-3-ids', title: 'IDS / IPS', description: 'Detection', contentPoints: ['IDS / IPS'] },
                      { id: 'f-3-thr', title: 'Internal vs external threat', description: 'Origin', contentPoints: ['Internal vs external threat'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-4',
            title: 'Application & API Security',
            subSections: [
                { id: 'f-4-app', title: 'Code', description: 'Software.', 
                  subSubSections: [
                      { id: 'f-4-code', title: 'Secure coding mindset', description: 'Prevention', contentPoints: ['Secure coding mindset'] },
                      { id: 'f-4-owas', title: 'OWASP Top 10', description: 'Risks', contentPoints: ['OWASP Top 10'] },
                      { id: 'f-4-inp', title: 'Input validation', description: 'Sanitization', contentPoints: ['Input validation'] },
                      { id: 'f-4-flow', title: 'Auth flow security', description: 'Logic', contentPoints: ['Auth flow security'] },
                      { id: 'f-4-sess', title: 'Session management', description: 'State', contentPoints: ['Session management'] },
                      { id: 'f-4-api', title: 'API abuse patterns', description: 'Attacks', contentPoints: ['API abuse patterns'] },
                      { id: 'f-4-file', title: 'File upload/download risk', description: 'Data', contentPoints: ['File upload/download risk'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-5',
            title: 'Operating System & Endpoint Security',
            subSections: [
                { id: 'f-5-os', title: 'Host', description: 'System.', 
                  subSubSections: [
                      { id: 'f-5-iso', title: 'OS isolation', description: 'Separation', contentPoints: ['OS isolation'] },
                      { id: 'f-5-perm', title: 'Process & permission', description: 'Access', contentPoints: ['Process & permission'] },
                      { id: 'f-5-mal', title: 'Malware basics', description: 'Infection', contentPoints: ['Malware basics'] },
                      { id: 'f-5-sand', title: 'Sandboxing', description: 'Containment', contentPoints: ['Sandboxing'] },
                      { id: 'f-5-virt', title: 'Virtualization awareness', description: 'VMs', contentPoints: ['Virtualization awareness'] },
                      { id: 'f-5-hard', title: 'Endpoint hardening', description: 'Config', contentPoints: ['Endpoint hardening'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-6',
            title: 'Cryptography',
            subSections: [
                { id: 'f-6-crypto', title: 'Encryption', description: 'Math.', 
                  subSubSections: [
                      { id: 'f-6-hash', title: 'Hashing vs Encryption', description: 'One-way vs Two-way', contentPoints: ['Hashing vs Encryption'] },
                      { id: 'f-6-sym', title: 'Symmetric vs Asymmetric', description: 'Keys', contentPoints: ['Symmetric vs Asymmetric'] },
                      { id: 'f-6-pass', title: 'Password storage', description: 'Salting/Hashing', contentPoints: ['Password storage best practice'] },
                      { id: 'f-6-tls', title: 'TLS / HTTPS', description: 'Transport', contentPoints: ['TLS / HTTPS'] },
                      { id: 'f-6-key', title: 'Key management', description: 'Handling', contentPoints: ['Key management'] },
                      { id: 'f-6-use', title: 'Crypto misuse examples', description: 'Pitfalls', contentPoints: ['Crypto misuse examples'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-7',
            title: 'Cloud, Container & Modern Platform Security',
            subSections: [
                { id: 'f-7-cloud', title: 'Platform', description: 'Cloud.', 
                  subSubSections: [
                      { id: 'f-7-resp', title: 'Shared responsibility', description: 'Model', contentPoints: ['Cloud shared responsibility model'] },
                      { id: 'f-7-conf', title: 'Misconfiguration risk', description: 'Setup', contentPoints: ['Misconfiguration risk'] },
                      { id: 'f-7-cont', title: 'Container security', description: 'Docker', contentPoints: ['Container security awareness'] },
                      { id: 'f-7-secr', title: 'Secrets management', description: 'Vault', contentPoints: ['Secrets management'] },
                      { id: 'f-7-log', title: 'Logging & monitoring', description: 'Audit', contentPoints: ['Logging & monitoring basics'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-8',
            title: 'AI, Automation & Future Threat Security',
            subSections: [
                { id: 'f-8-ai', title: 'Emerging', description: 'Future.', 
                  subSubSections: [
                      { id: 'f-8-inj', title: 'Prompt injection', description: 'LLM Hacks', contentPoints: ['Prompt injection awareness'] },
                      { id: 'f-8-mis', title: 'Model misuse', description: 'Attacks', contentPoints: ['Model misuse'] },
                      { id: 'f-8-leak', title: 'Data leakage risk', description: 'Training data', contentPoints: ['Data leakage risk'] },
                      { id: 'f-8-auto', title: 'Automation abuse', description: 'Bots', contentPoints: ['Automation abuse'] },
                      { id: 'f-8-hitl', title: 'Human-in-the-loop', description: 'Oversight', contentPoints: ['Human-in-the-loop security'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-9',
            title: 'Secure Development Lifecycle (SDLC)',
            subSections: [
                { id: 'f-9-sdlc', title: 'Process', description: 'Pipeline.', 
                  subSubSections: [
                      { id: 'f-9-mod', title: 'Threat modeling', description: 'Design phase', contentPoints: ['Threat modeling'] },
                      { id: 'f-9-des', title: 'Secure design', description: 'Architecture', contentPoints: ['Secure design'] },
                      { id: 'f-9-rev', title: 'Secure code review', description: 'Verification', contentPoints: ['Secure code review'] },
                      { id: 'f-9-dep', title: 'Dependency risk', description: 'SCA', contentPoints: ['Dependency & supply-chain risk'] },
                      { id: 'f-9-bld', title: 'Build & deploy security', description: 'CI/CD', contentPoints: ['Build & deploy security'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-10',
            title: 'Incident Response & Recovery',
            subSections: [
                { id: 'f-10-ir', title: 'Response', description: 'Breach.', 
                  subSubSections: [
                      { id: 'f-10-det', title: 'Detection', description: 'Identifying', contentPoints: ['Detection'] },
                      { id: 'f-10-con', title: 'Containment', description: 'Stopping', contentPoints: ['Containment'] },
                      { id: 'f-10-for', title: 'Forensics awareness', description: 'Evidence', contentPoints: ['Forensics awareness'] },
                      { id: 'f-10-rec', title: 'Recovery', description: 'Restoring', contentPoints: ['Recovery'] },
                      { id: 'f-10-lrn', title: 'Post-incident learning', description: 'Improving', contentPoints: ['Post-incident learning'] },
                      { id: 'f-10-imp', title: 'System improvement', description: 'Hardening', contentPoints: ['System improvement'] }
                  ] 
                }
            ]
        },
        {
            id: 'f-11',
            title: 'Security Governance, Strategy & Judgment',
            subSections: [
                { id: 'f-11-gov', title: 'Strategy', description: 'Management.', 
                  subSubSections: [
                      { id: 'f-11-risk', title: 'Risk assessment', description: 'Measuring', contentPoints: ['Risk assessment'] },
                      { id: 'f-11-pri', title: 'Prioritization', description: 'Focus', contentPoints: ['Priority'] },
                      { id: 'f-11-cost', title: 'Cost vs security', description: 'Balance', contentPoints: ['Cost vs security trade-off'] },
                      { id: 'f-11-acc', title: 'Acceptable risk', description: 'Tolerance', contentPoints: ['Acceptable vs unacceptable risk'] },
                      { id: 'f-11-dec', title: 'Accountability', description: 'Ownership', contentPoints: ['Security decision accountability'] },
                      { id: 'f-11-no', title: 'Saying "no"', description: 'Gatekeeping', contentPoints: ['When to say "no"'] }
                  ] 
                }
            ]
        }
    ]
  }
];