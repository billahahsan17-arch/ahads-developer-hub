
import { 
    // Icons
    MessageSquare, Monitor, Image, ShieldCheck, Globe, Beaker, BookOpen, Hash, RotateCcw, Activity, Tag, 
    Layout, Bug, Wand2, Database, Eye, Palette, Network, GitCommit, Briefcase, Server, Container, Clock, Terminal,
    FileText, DollarSign, Smile, Mic, Baby, Brain, FileJson, Lock, Search, Code2, Layers, Key,
    Mail, FileCode, Shield, Zap, Sparkles, Command, Workflow, FileDigit, Smartphone, Box, Radio, Target, FileDiff,
    GitPullRequest, AlertTriangle, Keyboard, BarChart2, Binary, Cpu, List, Grid, Anchor, Share2, ToggleLeft,
    GitMerge, PenTool, CheckCircle, Flame, User,  Scissors, Maximize, Minimize, Move, Crop, Type, 
    AlignLeft, MousePointer, CreditCard, Video, HardDrive, Wifi, Bluetooth, MapPin, Cloud
} from 'lucide-react';

export interface LabFeature {
    id: string;
    title: string;
    description: string;
    icon: any;
    path: string;
    status: 'AVAILABLE' | 'IN_DEVELOPMENT' | 'LOCKED';
    elite: boolean;
    isAI: boolean;
    // New prop for Universal AI Generator configuration
    promptConfig?: {
        label: string;
        placeholder: string;
        template: string;
        outputMode: 'markdown' | 'code' | 'text';
        language?: string;
    };
}

export interface LabSector {
    id: string;
    title: string;
    description: string;
    features: LabFeature[];
}

/**
 * THE ATLAS 88 (44 AI + 44 MANUAL)
 * BEST OF THE BEST ENGINEERING SUITE
 */

export const LAB_SECTORS: LabSector[] = [
    // =================================================================================
    // 🧠 AI ARSENAL: SYSTEMS & ARCHITECTURE (11 Tools)
    // =================================================================================
    {
        id: 'ai-arch',
        title: 'AI: Systems & Architecture',
        description: 'Generative infrastructure design.',
        features: [
            { id: 'arch-blueprint', title: 'System Architect', description: 'Mermaid.js System Design.', icon: Network, path: '/architect', status: 'AVAILABLE', elite: true, isAI: true },
            { id: 'cloud-aws', title: 'AWS CloudFormation', description: 'Infra as Code generator.', icon: Cloud, path: '/lab/gen/aws', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'Infrastructure Req', placeholder: 'EC2 AutoScaling Group with ALB...', template: 'Generate valid AWS CloudFormation YAML for:', outputMode: 'code', language: 'yaml' } },
            { id: 'cloud-k8s', title: 'K8s Manifest Gen', description: 'Deployment & Service YAML.', icon: Server, path: '/lab/gen/k8s', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'Workload Desc', placeholder: 'Nginx deployment, 3 replicas, port 80...', template: 'Generate Kubernetes YAML manifests for:', outputMode: 'code', language: 'yaml' } },
            { id: 'cloud-terra', title: 'Terraform Spinner', description: 'HCL Infrastructure code.', icon: Globe, path: '/lab/gen/terra', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'Resource Needs', placeholder: 'S3 Bucket with public read...', template: 'Write Terraform HCL for:', outputMode: 'code', language: 'hcl' } },
            { id: 'arch-docker', title: 'Dockerfile Opt', description: 'Multi-stage build gen.', icon: Container, path: '/lab/gen/docker', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Stack Details', placeholder: 'Node.js 18, pnpm, production build...', template: 'Write an optimized multi-stage Dockerfile for:', outputMode: 'code', language: 'dockerfile' } },
            { id: 'sec-threat', title: 'Threat Modeler', description: 'STRIDE Security Analysis.', icon: Shield, path: '/lab/gen/threat', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'System Description', placeholder: 'Public API with file upload...', template: 'Perform a STRIDE threat analysis on:', outputMode: 'markdown' } },
            { id: 'api-swagger', title: 'OpenAPI/Swagger', description: 'API Contract Generator.', icon: Share2, path: '/lab/gen/swagger', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'API Endpoints', placeholder: 'User CRUD, Auth login/logout...', template: 'Generate OpenAPI 3.0 YAML for:', outputMode: 'code', language: 'yaml' } },
            { id: 'db-schema', title: 'DB Schema Gen', description: 'SQL DDL Generator.', icon: Database, path: '/lab/gen/schema', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'Data Model', placeholder: 'Users, Posts, Comments with relations...', template: 'Write PostgreSQL CREATE TABLE statements for:', outputMode: 'code', language: 'sql' } },
            { id: 'arch-decision', title: 'ADR Writer', description: 'Architecture Decision Records.', icon: FileText, path: '/lab/gen/adr', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Decision Context', placeholder: 'Choosing Postgres over Mongo...', template: 'Write a formal ADR (Architecture Decision Record) for:', outputMode: 'markdown' } },
            { id: 'proto-graphql', title: 'GQL Schema Gen', description: 'GraphQL Type Definitions.', icon: Activity, path: '/lab/gen/gql', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Domain Objects', placeholder: 'User has many Orders...', template: 'Generate GraphQL schema (SDL) for:', outputMode: 'code', language: 'graphql' } },
            { id: 'nginx-conf', title: 'Nginx Config', description: 'Reverse Proxy Setup.', icon: Server, path: '/lab/gen/nginx', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Routing Rules', placeholder: 'Proxy /api to localhost:3000, SSL...', template: 'Generate secure Nginx configuration for:', outputMode: 'code', language: 'nginx' } },
        ]
    },
    // =================================================================================
    // 🧠 AI ARSENAL: CODE & LOGIC (11 Tools)
    // =================================================================================
    {
        id: 'ai-code',
        title: 'AI: Code & Logic',
        description: 'Development accelerators.',
        features: [
            { id: 'code-audit', title: 'Security Auditor', description: 'Static Vulnerability Check.', icon: ShieldCheck, path: '/refiner', status: 'AVAILABLE', elite: true, isAI: true },
            { id: 'code-refactor', title: 'Legacy Refactor', description: 'Modernize Old Code.', icon: RotateCcw, path: '/lab/refactor', status: 'AVAILABLE', elite: true, isAI: true },
            { id: 'code-sql', title: 'SQL Sorcerer', description: 'Natural Language to SQL.', icon: Database, path: '/lab/gen/sql', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'Query Request', placeholder: 'Find top 10 users by spend...', template: 'Write an optimized SQL query for:', outputMode: 'code', language: 'sql' } },
            { id: 'code-regex', title: 'Regex Enforcer', description: 'Complex Pattern Gen.', icon: Hash, path: '/regex', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'code-unit', title: 'Unit Test Gen', description: 'Jest/PyTest Creator.', icon: Beaker, path: '/testsuite', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'code-doc', title: 'Auto Scribe', description: 'JSDoc/Docstring Gen.', icon: BookOpen, path: '/scribe', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'code-trans', title: 'Polyglot', description: 'Lang-to-Lang Converter.', icon: Globe, path: '/translator', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'code-name', title: 'Naming Titan', description: 'Variable Naming AI.', icon: Tag, path: '/lab/gen/name', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Context', placeholder: 'Function that calculates tax...', template: 'Suggest 5 clean variable/function names for:', outputMode: 'text' } },
            { id: 'code-bigo', title: 'Complexity Audit', description: 'Time/Space Analysis.', icon: Activity, path: '/lab/complexity', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'code-json-ts', title: 'JSON to TS', description: 'Interface Generator.', icon: FileCode, path: '/lab/gen/ts', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'JSON Data', placeholder: '{ "id": 1, "name": "Atlas" }...', template: 'Convert this JSON to TypeScript interfaces:', outputMode: 'code', language: 'typescript' } },
            { id: 'code-explain', title: 'Code Explainer', description: 'Deconstruct Logic.', icon: Monitor, path: '/lab/gen/explain', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Complex Code', placeholder: 'Paste weird regex or logic...', template: 'Explain this code step-by-step:', outputMode: 'markdown' } },
        ]
    },
    // =================================================================================
    // 🧠 AI ARSENAL: OPS, PRODUCT & SOFT SKILLS (11 Tools)
    // =================================================================================
    {
        id: 'ai-ops',
        title: 'AI: Ops & Product',
        description: 'Workflow & Career Intelligence.',
        features: [
            { id: 'ops-cicd', title: 'CI/CD Pipeline', description: 'GitHub Actions Gen.', icon: Workflow, path: '/lab/gen/cicd', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'Workflow Steps', placeholder: 'Lint, Test, Build, Deploy to S3...', template: 'Write a GitHub Actions YAML workflow for:', outputMode: 'code', language: 'yaml' } },
            { id: 'ops-bash', title: 'Shell Wizard', description: 'Bash Script Gen.', icon: Terminal, path: '/lab/gen/bash', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'Task', placeholder: 'Backup DB and upload to S3...', template: 'Write a safe Bash script for:', outputMode: 'code', language: 'bash' } },
            { id: 'git-commit', title: 'Commit Sentinel', description: 'Semantic Commit Msgs.', icon: GitCommit, path: '/lab/commit', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'git-pr', title: 'PR Scribe', description: 'Pull Request Desc.', icon: GitMerge, path: '/lab/gen/pr', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Diff/Changes', placeholder: 'Added auth, fixed login bug...', template: 'Write a professional PR description for:', outputMode: 'markdown' } },
            { id: 'prod-prd', title: 'PRD Generator', description: 'Product Specs.', icon: FileDigit, path: '/lab/gen/prd', status: 'AVAILABLE', elite: true, isAI: true, promptConfig: { label: 'Feature Idea', placeholder: 'Uber for Cat Sitting...', template: 'Write a Product Requirement Document (PRD) for:', outputMode: 'markdown' } },
            { id: 'prod-user', title: 'User Stories', description: 'Agile Ticket Gen.', icon: Ticket, path: '/lab/jira', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'data-mock', title: 'Data Seeder', description: 'Mock JSON Gen.', icon: FileJson, path: '/lab/gen/seed', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Structure', placeholder: 'List of 5 users with lat/long...', template: 'Generate a JSON array of mock data for:', outputMode: 'code', language: 'json' } },
            { id: 'soft-email', title: 'Email Drafter', description: 'Corporate Comm.', icon: Mail, path: '/lab/gen/email', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'Topic', placeholder: 'Asking for a raise...', template: 'Draft a professional email for:', outputMode: 'text' } },
            { id: 'soft-tone', title: 'Tone Shifter', description: 'Polite/Direct/Exec.', icon: MessageSquare, path: '/lab/tone', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'soft-resume', title: 'Resume Polish', description: 'ATS Optimizer.', icon: FileText, path: '/lab/resume', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'soft-neg', title: 'Salary Script', description: 'Negotiation Logic.', icon: DollarSign, path: '/lab/salary', status: 'AVAILABLE', elite: true, isAI: true },
        ]
    },
    // =================================================================================
    // 🧠 AI ARSENAL: CREATIVE & VISION (11 Tools)
    // =================================================================================
    {
        id: 'ai-create',
        title: 'AI: Creative & Vision',
        description: 'Multimodal Generation.',
        features: [
            { id: 'vis-wire', title: 'Wireframe to Code', description: 'Screenshot to React.', icon: Layout, path: '/lab/wireframe', status: 'AVAILABLE', elite: true, isAI: true },
            { id: 'vis-debug', title: 'Visual Debugger', description: 'Error Screenshot Fix.', icon: Bug, path: '/lab/screen-debug', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'vis-legacy', title: 'UI Modernizer', description: 'Old UI to New Code.', icon: Monitor, path: '/lab/ui-mod', status: 'AVAILABLE', elite: true, isAI: true },
            { id: 'vis-db', title: 'DB Digitizer', description: 'ERD Image to SQL.', icon: Database, path: '/lab/db-digitize', status: 'AVAILABLE', elite: true, isAI: true },
            { id: 'aud-tts', title: 'Sonic Architect', description: 'Neural TTS.', icon: Mic, path: '/lab/audio-gen', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'vid-veo', title: 'Veo Studio', description: 'Video Generation.', icon: Video, path: '/veo', status: 'AVAILABLE', elite: true, isAI: true },
            { id: 'img-gen', title: 'Imagine Studio', description: 'Image Generation.', icon: Image, path: '/imagine', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'css-tail', title: 'Tailwind Gen', description: 'CSS to Utility.', icon: Palette, path: '/lab/gen/tail', status: 'AVAILABLE', elite: false, isAI: true, promptConfig: { label: 'CSS/Style', placeholder: 'Blue button with shadow...', template: 'Convert this style to Tailwind CSS classes:', outputMode: 'text' } },
            { id: 'dev-eli5', title: 'ELI5 Engine', description: 'Simplify Concepts.', icon: Baby, path: '/lab/eli5', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'dev-adv', title: "Devil's Advocate", description: 'Logic Critique.', icon: Sparkles, path: '/lab/argue', status: 'AVAILABLE', elite: false, isAI: true },
            { id: 'dev-quiz', title: 'Quiz Gen', description: 'Interview Prep.', icon: Brain, path: '/calibration', status: 'AVAILABLE', elite: false, isAI: true },
        ]
    },

    // =================================================================================
    // ⚒️ THE FORGE: NETWORK & SYSTEMS (11 Tools)
    // =================================================================================
    {
        id: 'forge-net',
        title: 'Forge: Net & Sys',
        description: 'Deterministic utilities.',
        features: [
            { id: 'net-packet', title: 'Packet Sniffer', description: 'Traffic Sim.', icon: Network, path: '/lab/packet', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'net-subnet', title: 'Subnet Calc', description: 'CIDR Tool.', icon: Grid, path: '/lab/subnet', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'net-dns', title: 'DNS Resolver', description: 'Propagation Check.', icon: Globe, path: '/lab/dns', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'net-http', title: 'HTTP Inspector', description: 'Request Builder.', icon: Activity, path: '/lab/http', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'net-port', title: 'Port Scanner', description: 'Open Port Check.', icon: Radio, path: '/lab/ports', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'net-ip', title: 'IP Info', description: 'Geo/ASN Lookup.', icon: MapPin, path: '/lab/ip', status: 'AVAILABLE', elite: false, isAI: false }, // New
            { id: 'sys-term', title: 'Linux Term', description: 'Web Shell.', icon: Terminal, path: '/lab/term', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'sys-cron', title: 'Cron Viz', description: 'Schedule Parser.', icon: Clock, path: '/lab/cron-viz', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'sys-cpu', title: 'CPU Sched', description: 'Process Sim.', icon: Cpu, path: '/lab/scheduler', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'sys-mem', title: 'Mem Alloc', description: 'Heap Visualizer.', icon: Box, path: '/lab/memory', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'sys-cli', title: 'CLI Builder', description: 'Tar/FFmpeg Gen.', icon: Command, path: '/lab/cli', status: 'AVAILABLE', elite: false, isAI: false },
        ]
    },
    // =================================================================================
    // ⚒️ THE FORGE: DATA & SECURITY (11 Tools)
    // =================================================================================
    {
        id: 'forge-data',
        title: 'Forge: Data & Sec',
        description: 'Manipulation & Crypto.',
        features: [
            { id: 'data-sql', title: 'SQL Sandbox', description: 'SQLite Sim.', icon: Database, path: '/lab/sql', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'data-json', title: 'JSON Architect', description: 'Tree/Minify.', icon: FileJson, path: '/lab/json', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'data-diff', title: 'Diff Checker', description: 'Code Compare.', icon: FileDiff, path: '/lab/diff', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'sec-jwt', title: 'JWT Inspector', description: 'Token Decode.', icon: Lock, path: '/lab/jwt', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'sec-hash', title: 'Hash Gen', description: 'SHA/MD5.', icon: Shield, path: '/lab/hash', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'sec-base64', title: 'Base64 Tool', description: 'Enc/Dec.', icon: Code2, path: '/lab/base64', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'data-uuid', title: 'UUID Foundry', description: 'ID Gen.', icon: Key, path: '/lab/uuid', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'data-epoch', title: 'Epoch Time', description: 'Unix Convert.', icon: Clock, path: '/lab/epoch', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'data-hex', title: 'Hex Inspector', description: 'Binary View.', icon: Binary, path: '/lab/hex', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'data-regex', title: 'Regex Tester', description: 'Pattern Match.', icon: Hash, path: '/lab/regex', status: 'AVAILABLE', elite: false, isAI: false }, // Reusing Regex Vis
            { id: 'sec-pass', title: 'Password Gen', description: 'Entropy Calc.', icon: Lock, path: '/lab/pass', status: 'AVAILABLE', elite: false, isAI: false }, // New
        ]
    },
    // =================================================================================
    // ⚒️ THE FORGE: WEB & VISUAL (11 Tools)
    // =================================================================================
    {
        id: 'forge-web',
        title: 'Forge: Web & Visual',
        description: 'Frontend Utilities.',
        features: [
            { id: 'web-contrast', title: 'Contrast Check', description: 'WCAG Ratio.', icon: Eye, path: '/lab/contrast', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'web-bezier', title: 'Bezier Curve', description: 'CSS Easing.', icon: Activity, path: '/lab/bezier', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'web-flex', title: 'Flex Gym', description: 'Layout Drill.', icon: Layout, path: '/lab/flex', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'web-grid', title: 'Grid Garden', description: 'CSS Grid Sim.', icon: Grid, path: '/lab/grid', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'web-shadow', title: 'Shadow Gen', description: 'Box Shadow.', icon: Layers, path: '/lab/shadow', status: 'AVAILABLE', elite: false, isAI: false }, // New
            { id: 'web-border', title: 'Border Radius', description: 'Fancy Borders.', icon: Square, path: '/lab/border', status: 'AVAILABLE', elite: false, isAI: false }, // New
            { id: 'web-grad', title: 'Gradient Gen', description: 'CSS Gradients.', icon: Palette, path: '/lab/gradient', status: 'AVAILABLE', elite: false, isAI: false }, // New
            { id: 'web-lorem', title: 'Tech Ipsum', description: 'Mock Text.', icon: FileText, path: '/lab/lorem', status: 'AVAILABLE', elite: false, isAI: false }, // New
            { id: 'web-key', title: 'Keycodes', description: 'JS Event Codes.', icon: Keyboard, path: '/lab/keycodes', status: 'AVAILABLE', elite: false, isAI: false }, // New
            { id: 'web-meta', title: 'Meta Tag Gen', description: 'SEO Tags.', icon: Tag, path: '/lab/meta', status: 'AVAILABLE', elite: false, isAI: false }, // New
            { id: 'web-ide', title: 'Web IDE', description: 'HTML/JS Play.', icon: Code2, path: '/lab/ide', status: 'AVAILABLE', elite: true, isAI: false },
        ]
    },
    // =================================================================================
    // ⚒️ THE FORGE: MASTERY & UTILS (11 Tools)
    // =================================================================================
    {
        id: 'forge-mastery',
        title: 'Forge: Mastery',
        description: 'Drills & Calculators.',
        features: [
            { id: 'mast-sys', title: 'System Canvas', description: 'Arch Whiteboard.', icon: PenTool, path: '/lab/sys-design', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'mast-pr', title: 'PR Dojo', description: 'Review Sim.', icon: GitPullRequest, path: '/lab/pr-dojo', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'mast-call', title: 'On-Call Sim', description: 'Incident Response.', icon: AlertTriangle, path: '/lab/on-call', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'mast-vim', title: 'Vim Dojo', description: 'Keyboard Drill.', icon: Keyboard, path: '/lab/shortcuts', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'mast-regex', title: 'Regex Golf', description: 'Pattern Puzzle.', icon: Target, path: '/lab/regex-golf', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'mast-algo', title: 'Algo Viz', description: 'Sorting Visual.', icon: BarChart2, path: '/lab/algo-viz', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'mast-asm', title: 'Assembly Dojo', description: '16-bit CPU.', icon: Cpu, path: '/lab/asm', status: 'AVAILABLE', elite: true, isAI: false },
            { id: 'util-equity', title: 'Equity Calc', description: 'Startup Comp.', icon: DollarSign, path: '/lab/equity', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'util-pomo', title: 'Deep Work', description: 'Focus Timer.', icon: Clock, path: '/lab/pomo', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'util-sound', title: 'Ambient', description: 'Noise Gen.', icon: Radio, path: '/lab/audio-mix', status: 'AVAILABLE', elite: false, isAI: false },
            { id: 'util-flash', title: 'Flashcards', description: 'Spaced Rep.', icon: BookOpen, path: '/lab/flash', status: 'AVAILABLE', elite: false, isAI: false }, // New
        ]
    }
];

// Re-export icons for usage in other files if needed
import { Square, Ticket } from 'lucide-react';
