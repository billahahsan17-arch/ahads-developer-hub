
import { lazy } from 'react';

// Helper for lazy loading. It's crucial that the import path is a static string literal.
const lazyLoad = (path: string) => {
    // This is a bit of a hack to make the bundler happy.
    // We are essentially creating a map of all possible paths.
    switch (path) {
        // Main Pages
        case './pages/Dashboard.tsx': return lazy(() => import('./pages/Dashboard.tsx'));
        case './pages/AIArsenal.tsx': return lazy(() => import('./pages/AIArsenal.tsx'));
        case './pages/EngineeringLab.tsx': return lazy(() => import('./pages/EngineeringLab.tsx'));
        case './pages/Community.tsx': return lazy(() => import('./pages/Community.tsx'));
        case './pages/BlackBox.tsx': return lazy(() => import('./pages/BlackBox.tsx'));
        case './pages/PillarView.tsx': return lazy(() => import('./pages/PillarView.tsx'));
        case './pages/TopicView.tsx': return lazy(() => import('./pages/TopicView.tsx'));
        case './pages/GeminiChat.tsx': return lazy(() => import('./pages/GeminiChat.tsx'));
        case './pages/Architect.tsx': return lazy(() => import('./pages/Architect.tsx'));
        case './pages/Calibration.tsx': return lazy(() => import('./pages/Calibration.tsx'));
        case './pages/Imagine.tsx': return lazy(() => import('./pages/Imagine.tsx'));
        case './pages/Oculus.tsx': return lazy(() => import('./pages/Oculus.tsx'));
        case './pages/Refiner.tsx': return lazy(() => import('./pages/Refiner.tsx'));
        case './pages/RegexEnforcer.tsx': return lazy(() => import('./pages/RegexEnforcer.tsx'));
        case './pages/Scribe.tsx': return lazy(() => import('./pages/Scribe.tsx'));
        case './pages/TestSuite.tsx': return lazy(() => import('./pages/TestSuite.tsx'));
        case './pages/Translator.tsx': return lazy(() => import('./pages/Translator.tsx'));
        case './pages/VeoStudio.tsx': return lazy(() => import('./pages/VeoStudio.tsx'));

        // Lab Sector View
        case './pages/lab/LabSectorView.tsx': return lazy(() => import('./pages/lab/LabSectorView.tsx'));

        // Lab Tools
        case './pages/lab/A11yAuditor.tsx': return lazy(() => import('./pages/lab/A11yAuditor.tsx'));
        case './pages/lab/ATSResumeCompiler.tsx': return lazy(() => import('./pages/lab/ATSResumeCompiler.tsx'));
        case './pages/lab/AlgoDojo.tsx': return lazy(() => import('./pages/lab/AlgoDojo.tsx'));
        case './pages/lab/AlgoViz.tsx': return lazy(() => import('./pages/lab/AlgoViz.tsx'));
        case './pages/lab/AmbientMixer.tsx': return lazy(() => import('./pages/lab/AmbientMixer.tsx'));
        case './pages/lab/AssemblyDojo.tsx': return lazy(() => import('./pages/lab/AssemblyDojo.tsx'));
        case './pages/lab/Base64Tool.tsx': return lazy(() => import('./pages/lab/Base64Tool.tsx'));
        case './pages/lab/BezierEditor.tsx': return lazy(() => import('./pages/lab/BezierEditor.tsx'));
        case './pages/lab/BigOPlotter.tsx': return lazy(() => import('./pages/lab/BigOPlotter.tsx'));
        case './pages/lab/CLIBuilder.tsx': return lazy(() => import('./pages/lab/CLIBuilder.tsx'));
        case './pages/lab/ChaosConsole.tsx': return lazy(() => import('./pages/lab/ChaosConsole.tsx'));
        case './pages/lab/CommitSentinel.tsx': return lazy(() => import('./pages/lab/CommitSentinel.tsx'));
        case './pages/lab/ComplexityAuditor.tsx': return lazy(() => import('./pages/lab/ComplexityAuditor.tsx'));
        case './pages/lab/ContrastChecker.tsx': return lazy(() => import('./pages/lab/ContrastChecker.tsx'));
        case './pages/lab/CronVisualizer.tsx': return lazy(() => import('./pages/lab/CronVisualizer.tsx'));
        case './pages/lab/DBDigitizer.tsx': return lazy(() => import('./pages/lab/DBDigitizer.tsx'));
        case './pages/lab/DBSchemaArchitect.tsx': return lazy(() => import('./pages/lab/DBSchemaArchitect.tsx'));
        case './pages/lab/DNSResolver.tsx': return lazy(() => import('./pages/lab/DNSResolver.tsx'));
        case './pages/lab/DevilsAdvocate.tsx': return lazy(() => import('./pages/lab/DevilsAdvocate.tsx'));
        case './pages/lab/DiffChecker.tsx': return lazy(() => import('./pages/lab/DiffChecker.tsx'));
        case './pages/lab/EliJunior.tsx': return lazy(() => import('./pages/lab/EliJunior.tsx'));
        case './pages/lab/EpochConverter.tsx': return lazy(() => import('./pages/lab/EpochConverter.tsx'));
        case './pages/lab/EquityCalculator.tsx': return lazy(() => import('./pages/lab/EquityCalculator.tsx'));
        case './pages/lab/FlashcardSRS.tsx': return lazy(() => import('./pages/lab/FlashcardSRS.tsx'));
        case './pages/lab/FlexDrill.tsx': return lazy(() => import('./pages/lab/FlexDrill.tsx'));
        case './pages/lab/GitConflictResolver.tsx': return lazy(() => import('./pages/lab/GitConflictResolver.tsx'));
        case './pages/lab/GridDrill.tsx': return lazy(() => import('./pages/lab/GridDrill.tsx'));
        case './pages/lab/HTTPInspector.tsx': return lazy(() => import('./pages/lab/HTTPInspector.tsx'));
        case './pages/lab/HashGenerator.tsx': return lazy(() => import('./pages/lab/HashGenerator.tsx'));
        case './pages/lab/HexInspector.tsx': return lazy(() => import('./pages/lab/HexInspector.tsx'));
        case './pages/lab/JSONArchitect.tsx': return lazy(() => import('./pages/lab/JSONArchitect.tsx'));
        case './pages/lab/JWTInspector.tsx': return lazy(() => import('./pages/lab/JWTInspector.tsx'));
        case './pages/lab/JiraGenerator.tsx': return lazy(() => import('./pages/lab/JiraGenerator.tsx'));
        case './pages/lab/KeyboardDojo.tsx': return lazy(() => import('./pages/lab/KeyboardDojo.tsx'));
        case './pages/lab/LegacyRefactor.tsx': return lazy(() => import('./pages/lab/LegacyRefactor.tsx'));
        case './pages/lab/LegacyUIModernizer.tsx': return lazy(() => import('./pages/lab/LegacyUIModernizer.tsx'));
        case './pages/lab/LinuxTerminal.tsx': return lazy(() => import('./pages/lab/LinuxTerminal.tsx'));
        case './pages/lab/MemoryAllocator.tsx': return lazy(() => import('./pages/lab/MemoryAllocator.tsx'));
        case './pages/lab/MistakeGenome.tsx': return lazy(() => import('./pages/lab/MistakeGenome.tsx'));
        case './pages/lab/MockInterview.tsx': return lazy(() => import('./pages/lab/MockInterview.tsx'));
        case './pages/lab/OLEDOptimizer.tsx': return lazy(() => import('./pages/lab/OLEDOptimizer.tsx'));
        case './pages/lab/OnCallSimulator.tsx': return lazy(() => import('./pages/lab/OnCallSimulator.tsx'));
        case './pages/lab/PRDojo.tsx': return lazy(() => import('./pages/lab/PRDojo.tsx'));
        case './pages/lab/PacketSniffer.tsx': return lazy(() => import('./pages/lab/PacketSniffer.tsx'));
        case './pages/lab/PomodoroTimer.tsx': return lazy(() => import('./pages/lab/PomodoroTimer.tsx'));
        case './pages/lab/PortScanner.tsx': return lazy(() => import('./pages/lab/PortScanner.tsx'));
        case './pages/lab/ProcessScheduler.tsx': return lazy(() => import('./pages/lab/ProcessScheduler.tsx'));
        case './pages/lab/RegexGolf.tsx': return lazy(() => import('./pages/lab/RegexGolf.tsx'));
        case './pages/lab/RegexVisualizer.tsx': return lazy(() => import('./pages/lab/RegexVisualizer.tsx'));
        case './pages/lab/ResumeOptimizer.tsx': return lazy(() => import('./pages/lab/ResumeOptimizer.tsx'));
        case './pages/lab/SQLSandbox.tsx': return lazy(() => import('./pages/lab/SQLSandbox.tsx'));
        case './pages/lab/SalaryScript.tsx': return lazy(() => import('./pages/lab/SalaryScript.tsx'));
        case './pages/lab/ScreenshotDebugger.tsx': return lazy(() => import('./pages/lab/ScreenshotDebugger.tsx'));
        case './pages/lab/SnippetLibrary.tsx': return lazy(() => import('./pages/lab/SnippetLibrary.tsx'));
        case './pages/lab/SonicArchitect.tsx': return lazy(() => import('./pages/lab/SonicArchitect.tsx'));
        case './pages/lab/SubnetCalculator.tsx': return lazy(() => import('./pages/lab/SubnetCalculator.tsx'));
        case './pages/lab/SyntaxRacer.tsx': return lazy(() => import('./pages/lab/SyntaxRacer.tsx'));
        case './pages/lab/SystemDesignCanvas.tsx': return lazy(() => import('./pages/lab/SystemDesignCanvas.tsx'));
        case './pages/lab/TechStackMatrix.tsx': return lazy(() => import('./pages/lab/TechStackMatrix.tsx'));
        case './pages/lab/ToneShifter.tsx': return lazy(() => import('./pages/lab/ToneShifter.tsx'));
        case './pages/lab/ToolPlaceholder.tsx': return lazy(() => import('./pages/lab/ToolPlaceholder.tsx'));
        case './pages/lab/UUIDGenerator.tsx': return lazy(() => import('./pages/lab/UUIDGenerator.tsx'));
        case './pages/lab/UniversalGenerator.tsx': return lazy(() => import('./pages/lab/UniversalGenerator.tsx'));
        case './pages/lab/WebIDE.tsx': return lazy(() => import('./pages/lab/WebIDE.tsx'));
        case './pages/lab/WireframeToCode.tsx': return lazy(() => import('./pages/lab/WireframeToCode.tsx'));
        default: return lazy(() => import('./pages/Dashboard.tsx')); // Fallback
    }
};

const toKebabCase = (str: string) => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

const pages = [
    'Dashboard.tsx', 'AIArsenal.tsx', 'EngineeringLab.tsx', 'Community.tsx', 'BlackBox.tsx', 'GeminiChat.tsx',
    'Architect.tsx', 'Calibration.tsx', 'Imagine.tsx', 'Oculus.tsx', 'Refiner.tsx', 'RegexEnforcer.tsx',
    'Scribe.tsx', 'TestSuite.tsx', 'Translator.tsx', 'VeoStudio.tsx'
];

const labPages = [
    'A11yAuditor.tsx', 'ATSResumeCompiler.tsx', 'AlgoDojo.tsx', 'AlgoViz.tsx', 'AmbientMixer.tsx',
    'AssemblyDojo.tsx', 'Base64Tool.tsx', 'BezierEditor.tsx', 'BigOPlotter.tsx', 'CLIBuilder.tsx',
    'ChaosConsole.tsx', 'CommitSentinel.tsx', 'ComplexityAuditor.tsx', 'ContrastChecker.tsx', 'CronVisualizer.tsx',
    'DBDigitizer.tsx', 'DBSchemaArchitect.tsx', 'DNSResolver.tsx', 'DevilsAdvocate.tsx', 'DiffChecker.tsx',
    'EliJunior.tsx', 'EpochConverter.tsx', 'EquityCalculator.tsx', 'FlashcardSRS.tsx', 'FlexDrill.tsx',
    'GitConflictResolver.tsx', 'GridDrill.tsx', 'HTTPInspector.tsx', 'HashGenerator.tsx', 'HexInspector.tsx',
    'JSONArchitect.tsx', 'JWTInspector.tsx', 'JiraGenerator.tsx', 'KeyboardDojo.tsx', 'LegacyRefactor.tsx',
    'LegacyUIModernizer.tsx', 'LinuxTerminal.tsx', 'MemoryAllocator.tsx', 'MistakeGenome.tsx', 'MockInterview.tsx',
    'OLEDOptimizer.tsx', 'OnCallSimulator.tsx', 'PRDojo.tsx', 'PacketSniffer.tsx', 'PomodoroTimer.tsx',
    'PortScanner.tsx', 'ProcessScheduler.tsx', 'RegexGolf.tsx', 'RegexVisualizer.tsx', 'ResumeOptimizer.tsx',
    'SQLSandbox.tsx', 'SalaryScript.tsx', 'ScreenshotDebugger.tsx', 'SnippetLibrary.tsx', 'SonicArchitect.tsx',
    'SubnetCalculator.tsx', 'SyntaxRacer.tsx', 'SystemDesignCanvas.tsx', 'TechStackMatrix.tsx', 'ToneShifter.tsx',
    'ToolPlaceholder.tsx', 'UUIDGenerator.tsx', 'UniversalGenerator.tsx', 'WebIDE.tsx', 'WireframeToCode.tsx'
];

export const appRoutes = [
    // Static Main Pages
    ...pages.map(page => ({
        path: page === 'Dashboard.tsx' ? '/' : `/${toKebabCase(page.replace('.tsx', ''))}`,
        component: lazyLoad(`./pages/${page}`)
    })),
    // Dynamic Main Pages
    { path: '/pillar/:pillarId', component: lazyLoad('./pages/PillarView.tsx') },
    { path: '/topic/:topicId', component: lazyLoad('./pages/TopicView.tsx') },
    { path: '/lab/:sectorId', component: lazyLoad('./pages/lab/LabSectorView.tsx') },

    // Lab Tool Pages
    ...labPages.map(page => ({
        path: `/lab/${toKebabCase(page.replace('.tsx', ''))}`,
        component: lazyLoad(`./pages/lab/${page}`)
    }))
];

export const universalRoutes: any[] = [];
