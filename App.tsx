
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import InitialLoader from './components/InitialLoader';
import { ProgressProvider } from './context/ProgressContext';
import { LAB_SECTORS } from './data/labFeatures';
import { Loader } from 'lucide-react';

// --- LAZY LOADED PAGES (OPTIMIZATION) ---
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AIArsenal = lazy(() => import('./pages/AIArsenal'));
const EngineeringLab = lazy(() => import('./pages/EngineeringLab'));
const Community = lazy(() => import('./pages/Community'));
const BlackBox = lazy(() => import('./pages/BlackBox'));
const PillarView = lazy(() => import('./pages/PillarView'));
const TopicView = lazy(() => import('./pages/TopicView'));
const LabSectorView = lazy(() => import('./pages/lab/LabSectorView'));

// AI Studios
const AtlasChat = lazy(() => import('./pages/GeminiChat'));
const VeoStudio = lazy(() => import('./pages/VeoStudio'));
const Imagine = lazy(() => import('./pages/Imagine'));
const Calibration = lazy(() => import('./pages/Calibration'));
const Oculus = lazy(() => import('./pages/Oculus'));

// AI Tools
const Refiner = lazy(() => import('./pages/Refiner'));
const Architect = lazy(() => import('./pages/Architect'));
const Scribe = lazy(() => import('./pages/Scribe'));
const Translator = lazy(() => import('./pages/Translator'));
const TestSuite = lazy(() => import('./pages/TestSuite'));
const RegexEnforcer = lazy(() => import('./pages/RegexEnforcer'));

// Manual Tools
const SystemDesignCanvas = lazy(() => import('./pages/lab/SystemDesignCanvas'));
const OnCallSimulator = lazy(() => import('./pages/lab/OnCallSimulator'));
const SnippetLibrary = lazy(() => import('./pages/lab/SnippetLibrary'));
const MistakeGenome = lazy(() => import('./pages/lab/MistakeGenome'));
const PRDojo = lazy(() => import('./pages/lab/PRDojo'));
const AlgoViz = lazy(() => import('./pages/lab/AlgoViz'));
const JWTInspector = lazy(() => import('./pages/lab/JWTInspector'));
const MockInterview = lazy(() => import('./pages/lab/MockInterview'));
const SQLSandbox = lazy(() => import('./pages/lab/SQLSandbox'));
const EquityCalculator = lazy(() => import('./pages/lab/EquityCalculator'));
const BigOPlotter = lazy(() => import('./pages/lab/BigOPlotter'));
const TechStackMatrix = lazy(() => import('./pages/lab/TechStackMatrix'));
const HTTPInspector = lazy(() => import('./pages/lab/HTTPInspector'));
const ATSResumeCompiler = lazy(() => import('./pages/lab/ATSResumeCompiler'));
const SalaryScript = lazy(() => import('./pages/lab/SalaryScript'));
const DBSchemaArchitect = lazy(() => import('./pages/lab/DBSchemaArchitect'));
const CLIBuilder = lazy(() => import('./pages/lab/CLIBuilder'));
const LegacyRefactor = lazy(() => import('./pages/lab/LegacyRefactor'));
const RegexVisualizer = lazy(() => import('./pages/lab/RegexVisualizer'));
const JSONArchitect = lazy(() => import('./pages/lab/JSONArchitect'));
const KeyboardDojo = lazy(() => import('./pages/lab/KeyboardDojo'));
const DevilsAdvocate = lazy(() => import('./pages/lab/DevilsAdvocate'));
const ChaosConsole = lazy(() => import('./pages/lab/ChaosConsole'));
const GitConflictResolver = lazy(() => import('./pages/lab/GitConflictResolver'));
const SyntaxRacer = lazy(() => import('./pages/lab/SyntaxRacer'));
const AlgoDojo = lazy(() => import('./pages/lab/AlgoDojo'));
const RegexGolf = lazy(() => import('./pages/lab/RegexGolf'));
const JiraGenerator = lazy(() => import('./pages/lab/JiraGenerator'));
const WireframeToCode = lazy(() => import('./pages/lab/WireframeToCode'));
const A11yAuditor = lazy(() => import('./pages/lab/A11yAuditor'));
const DBDigitizer = lazy(() => import('./pages/lab/DBDigitizer'));
const ScreenshotDebugger = lazy(() => import('./pages/lab/ScreenshotDebugger'));
const LegacyUIModernizer = lazy(() => import('./pages/lab/LegacyUIModernizer'));
const WebIDE = lazy(() => import('./pages/lab/WebIDE'));
const ResumeOptimizer = lazy(() => import('./pages/lab/ResumeOptimizer'));
const PacketSniffer = lazy(() => import('./pages/lab/PacketSniffer'));
const ProcessScheduler = lazy(() => import('./pages/lab/ProcessScheduler'));
const MemoryAllocator = lazy(() => import('./pages/lab/MemoryAllocator'));
const AssemblyDojo = lazy(() => import('./pages/lab/AssemblyDojo'));
const HexInspector = lazy(() => import('./pages/lab/HexInspector'));
const ComplexityAuditor = lazy(() => import('./pages/lab/ComplexityAuditor'));
const CommitSentinel = lazy(() => import('./pages/lab/CommitSentinel'));
const SubnetCalculator = lazy(() => import('./pages/lab/SubnetCalculator'));
const LinuxTerminal = lazy(() => import('./pages/lab/LinuxTerminal'));
const HashGenerator = lazy(() => import('./pages/lab/HashGenerator'));
const EpochConverter = lazy(() => import('./pages/lab/EpochConverter'));
const Base64Tool = lazy(() => import('./pages/lab/Base64Tool'));
const DiffChecker = lazy(() => import('./pages/lab/DiffChecker'));
const UUIDGenerator = lazy(() => import('./pages/lab/UUIDGenerator'));
const SonicArchitect = lazy(() => import('./pages/lab/SonicArchitect'));
const DNSResolver = lazy(() => import('./pages/lab/DNSResolver'));
const PortScanner = lazy(() => import('./pages/lab/PortScanner'));
const CronVisualizer = lazy(() => import('./pages/lab/CronVisualizer'));
const ContrastChecker = lazy(() => import('./pages/lab/ContrastChecker'));
const BezierEditor = lazy(() => import('./pages/lab/BezierEditor'));
const FlexDrill = lazy(() => import('./pages/lab/FlexDrill'));
const GridDrill = lazy(() => import('./pages/lab/GridDrill'));
const PomodoroTimer = lazy(() => import('./pages/lab/PomodoroTimer'));
const AmbientMixer = lazy(() => import('./pages/lab/AmbientMixer'));
const ToneShifter = lazy(() => import('./pages/lab/ToneShifter'));
const EliJunior = lazy(() => import('./pages/lab/EliJunior'));
const FlashcardSRS = lazy(() => import('./pages/lab/FlashcardSRS'));

const UniversalGenerator = lazy(() => import('./pages/lab/UniversalGenerator'));
const ToolPlaceholder = lazy(() => import('./pages/lab/ToolPlaceholder'));

const MotionDiv = motion.div as any;

// Smart PageLoader: Delays spinner to prevent flash on fast loads (Preload Strategy)
const PageLoader = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    
    useEffect(() => {
        // Wait 800ms before showing spinner. If load is faster (preloaded), spinner never shows.
        const timer = setTimeout(() => setShowSpinner(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex h-full w-full items-center justify-center bg-[#020617]">
            {showSpinner && (
                <div className="flex flex-col items-center gap-4 animate-fade-in">
                    <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                    <span className="text-xs font-mono text-blue-500/50 uppercase tracking-widest">Compiling Module...</span>
                </div>
            )}
        </div>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    
    // Extract all AI features that use the Universal Generator
    const universalFeatures = LAB_SECTORS.flatMap(s => s.features).filter(f => f.isAI && f.promptConfig);

    return (
        <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {/* CORE NAVIGATION */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/ai-arsenal" element={<AIArsenal />} />
                    <Route path="/lab" element={<EngineeringLab />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/blackbox" element={<BlackBox />} />
                    
                    {/* DYNAMIC CONTENT */}
                    <Route path="/pillar/:pillarId" element={<PillarView />} />
                    <Route path="/topic/:pillarId/:topicId" element={<TopicView />} />
                    <Route path="/lab/sector/:sectorId" element={<LabSectorView />} />
                    
                    {/* AI STUDIOS */}
                    <Route path="/chat" element={<AtlasChat />} />
                    <Route path="/veo" element={<VeoStudio />} />
                    <Route path="/imagine" element={<Imagine />} />
                    <Route path="/calibration" element={<Calibration />} />
                    <Route path="/oculus" element={<Oculus />} />

                    {/* FEATURE PAGES */}
                    <Route path="/architect" element={<Architect />} />
                    <Route path="/refiner" element={<Refiner />} />
                    <Route path="/scribe" element={<Scribe />} />
                    <Route path="/translator" element={<Translator />} />
                    <Route path="/testsuite" element={<TestSuite />} />
                    <Route path="/regex" element={<RegexEnforcer />} />
                    <Route path="/lab/commit" element={<CommitSentinel />} />
                    <Route path="/lab/jira" element={<JiraGenerator />} />
                    <Route path="/lab/wireframe" element={<WireframeToCode />} />
                    <Route path="/lab/screen-debug" element={<ScreenshotDebugger />} />
                    <Route path="/lab/ui-mod" element={<LegacyUIModernizer />} />
                    <Route path="/lab/db-digitize" element={<DBDigitizer />} />
                    <Route path="/lab/audio-gen" element={<SonicArchitect />} />
                    <Route path="/lab/eli5" element={<EliJunior />} />
                    <Route path="/lab/argue" element={<DevilsAdvocate />} />
                    <Route path="/lab/resume" element={<ATSResumeCompiler />} />
                    <Route path="/lab/salary" element={<SalaryScript />} />
                    <Route path="/lab/refactor" element={<LegacyRefactor />} />
                    <Route path="/lab/complexity" element={<ComplexityAuditor />} />
                    <Route path="/lab/tone" element={<ToneShifter />} />

                    {/* UNIVERSAL AI TOOLS */}
                    {universalFeatures.map(f => (
                        <Route 
                            key={f.id} 
                            path={f.path} 
                            element={
                                <UniversalGenerator 
                                    toolId={f.id}
                                    title={f.title}
                                    description={f.description}
                                    inputLabel={f.promptConfig!.label}
                                    inputPlaceholder={f.promptConfig!.placeholder}
                                    promptTemplate={f.promptConfig!.template}
                                    icon={f.icon}
                                    outputMode={f.promptConfig!.outputMode}
                                    language={f.promptConfig!.language}
                                />
                            } 
                        />
                    ))}

                    {/* MANUAL FORGE TOOLS */}
                    <Route path="/lab/packet" element={<PacketSniffer />} />
                    <Route path="/lab/subnet" element={<SubnetCalculator />} />
                    <Route path="/lab/dns" element={<DNSResolver />} />
                    <Route path="/lab/http" element={<HTTPInspector />} />
                    <Route path="/lab/jwt" element={<JWTInspector />} />
                    <Route path="/lab/ports" element={<PortScanner />} />
                    <Route path="/lab/term" element={<LinuxTerminal />} />
                    <Route path="/lab/cron-viz" element={<CronVisualizer />} />
                    <Route path="/lab/scheduler" element={<ProcessScheduler />} />
                    <Route path="/lab/memory" element={<MemoryAllocator />} />
                    <Route path="/lab/asm" element={<AssemblyDojo />} />
                    <Route path="/lab/hex" element={<HexInspector />} />
                    <Route path="/lab/cli" element={<CLIBuilder />} />
                    <Route path="/lab/sql" element={<SQLSandbox />} />
                    <Route path="/lab/db-arch" element={<DBSchemaArchitect />} />
                    <Route path="/lab/json" element={<JSONArchitect />} />
                    <Route path="/lab/diff" element={<DiffChecker />} />
                    <Route path="/lab/hash" element={<HashGenerator />} />
                    <Route path="/lab/uuid" element={<UUIDGenerator />} />
                    <Route path="/lab/base64" element={<Base64Tool />} />
                    <Route path="/lab/epoch" element={<EpochConverter />} />
                    <Route path="/lab/sys-design" element={<SystemDesignCanvas />} />
                    <Route path="/lab/pr-dojo" element={<PRDojo />} />
                    <Route path="/lab/on-call" element={<OnCallSimulator />} />
                    <Route path="/lab/shortcuts" element={<KeyboardDojo />} />
                    <Route path="/lab/regex-golf" element={<RegexGolf />} />
                    <Route path="/lab/algo-viz" element={<AlgoViz />} />
                    <Route path="/lab/chaos" element={<ChaosConsole />} />
                    <Route path="/lab/contrast" element={<ContrastChecker />} />
                    <Route path="/lab/bezier" element={<BezierEditor />} />
                    <Route path="/lab/flex" element={<FlexDrill />} />
                    <Route path="/lab/grid" element={<GridDrill />} />
                    <Route path="/lab/ide" element={<WebIDE />} />
                    <Route path="/lab/equity" element={<EquityCalculator />} />
                    <Route path="/lab/pomo" element={<PomodoroTimer />} />
                    <Route path="/lab/audio-mix" element={<AmbientMixer />} />
                    <Route path="/lab/flash" element={<FlashcardSRS />} />
                    
                    {/* Catch-All / Fallback */}
                    <Route path="/lab/:toolId" element={<ToolPlaceholder />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // --- PERFORMANCE PRELOAD ---
        // Start fetching the heavy Dashboard chunk immediately while intro plays.
        // This ensures Dashboard is ready by the time InitialLoader exits.
        const preloadDashboard = async () => {
            try {
                await import('./pages/Dashboard');
            } catch (e) {
                console.warn("Background preload failed", e);
            }
        };
        preloadDashboard();
    }, []);

    return (
        <ProgressProvider>
            <Router>
                <AnimatePresence>
                    {isLoading ? (
                        <InitialLoader onComplete={() => setIsLoading(false)} key="loader" />
                    ) : (
                        <Layout key="layout">
                            <AnimatedRoutes />
                        </Layout>
                    )}
                </AnimatePresence>
            </Router>
        </ProgressProvider>
    );
};

export default App;
