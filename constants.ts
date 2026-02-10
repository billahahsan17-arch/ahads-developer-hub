
import { BookOpen, PenTool, MessageSquare, BarChart2, Globe, Sparkles, Layout as LayoutIcon } from 'lucide-react';

// --- SIDEBAR NAVIGATION ---

export const CORE_MENU = [
    { id: '/', to: "/", icon: LayoutIcon, label: "Mission Control", color: "blue-500" },
    { id: 'ai-arsenal', to: "/ai-arsenal", icon: Sparkles, label: "AI Arsenal", color: "purple-500" },
    { id: 'engineering-lab', to: "/engineering-lab", icon: PenTool, label: "Engineering Lab", color: "amber-500" },
    { id: 'gemini-chat', to: "/gemini-chat", icon: MessageSquare, label: "Gemini Chat", color: "pink-500" },
    { id: 'community', to: "/community", icon: Globe, label: "Community Hub", color: "indigo-500" },
    { id: 'black-box', to: "/black-box", icon: BarChart2, label: "Black Box", color: "slate-500" },
];

// In a real application, this would come from a database or a more robust source.
export const PILLARS = [
    {
        id: 'foundation',
        code: 'FND',
        title: 'Foundation: Core Principles of Software Engineering',
        description: 'Build a strong base in software engineering fundamentals.',
        color: 'blue-500',
        sections: [] // Simplified for this example
    },
    {
        id: 'frontend',
        code: 'UIX',
        title: 'Frontend & UI/UX: Crafting User-Centric Experiences',
        description: 'Master the art of building beautiful and intuitive user interfaces.',
        color: 'purple-500',
        sections: []
    },
    {
        id: 'backend',
        code: 'API',
        title: 'Backend & APIs: Engineering Scalable Systems',
        description: 'Learn to design and build robust, scalable server-side applications.',
        color: 'green-500',
        sections: []
    },
    {
        id: 'devops',
        code: 'OPS',
        title: 'DevOps & Infrastructure: Automating the Development Lifecycle',
        description: 'Explore the tools and practices for automating software delivery.',
        color: 'amber-500',
        sections: []
    },
    {
        id: 'mastery',
        code: 'MST',
        title: 'Mastery: Advanced Topics & Leadership',
        description: 'Dive into advanced topics and cultivate leadership skills.',
        color: 'red-500',
        sections: []
    }
];
