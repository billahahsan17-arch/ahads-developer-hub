import { Pillar } from '../../types';

export const VISUAL_PILLARS: Pillar[] = [
  {
    id: 'pillar-h',
    code: 'H',
    title: 'UI, UX, Graphics, Animation & Visual Engineering',
    description: 'Visual Engineering + User Perception. Not just pixels.',
    color: 'text-pink-600',
    icon: 'Eye',
    sections: [
        {
            id: 'h-0',
            title: 'Visual Thinking & Human Perception',
            subSections: [
                { id: 'h-0-mind', title: 'Cognition', description: 'Psychology.', 
                  subSubSections: [
                      { id: 'h-0-att', title: 'Attention', description: 'Focus', contentPoints: ['Attention'] },
                      { id: 'h-0-load', title: 'Cognitive load', description: 'Effort', contentPoints: ['Cognitive load'] },
                      { id: 'h-0-hier', title: 'Visual hierarchy', description: 'Order', contentPoints: ['Visual hierarchy'] },
                      { id: 'h-0-con', title: 'Consistency', description: 'Patterns', contentPoints: ['Consistency'] },
                      { id: 'h-0-err', title: 'User confusion', description: 'Friction', contentPoints: ['User confusion patterns'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-1',
            title: 'UI Engineering Fundamentals',
            subSections: [
                { id: 'h-1-ui', title: 'Systems', description: 'Structure.', 
                  subSubSections: [
                      { id: 'h-1-lay', title: 'Layout systems', description: 'Grid, Spacing', contentPoints: ['Layout systems (grid, spacing)'] },
                      { id: 'h-1-type', title: 'Typography', description: 'Fonts', contentPoints: ['Typography systems'] },
                      { id: 'h-1-col', title: 'Color systems', description: 'Palette', contentPoints: ['Color systems'] },
                      { id: 'h-1-stat', title: 'Component states', description: 'Interactive', contentPoints: ['Component states'] },
                      { id: 'h-1-resp', title: 'Responsive logic', description: 'Adaptation', contentPoints: ['Responsive logic'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-2',
            title: 'UX Engineering Fundamentals',
            subSections: [
                { id: 'h-2-ux', title: 'Experience', description: 'Flow.', 
                  subSubSections: [
                      { id: 'h-2-flow', title: 'User flow', description: 'Journey', contentPoints: ['User flow'] },
                      { id: 'h-2-ia', title: 'Information architecture', description: 'Structure', contentPoints: ['Information architecture'] },
                      { id: 'h-2-nav', title: 'Navigation', description: 'Wayfinding', contentPoints: ['Navigation design'] },
                      { id: 'h-2-err', title: 'Error & feedback', description: 'Communication', contentPoints: ['Error & feedback UX'] },
                      { id: 'h-2-edge', title: 'Empty & edge states', description: 'Completeness', contentPoints: ['Empty & edge states'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-3',
            title: 'Interaction & Motion Design',
            subSections: [
                { id: 'h-3-ix', title: 'Interaction', description: 'Feel.', 
                  subSubSections: [
                      { id: 'h-3-mic', title: 'Micro-interactions', description: 'Detail', contentPoints: ['Micro-interactions'] },
                      { id: 'h-3-state', title: 'Hover/focus/active', description: 'Feedback', contentPoints: ['Hover/focus/active logic'] },
                      { id: 'h-3-purp', title: 'Motion purpose', description: 'Meaning', contentPoints: ['Motion purpose'] },
                      { id: 'h-3-time', title: 'Timing & easing', description: 'Feel', contentPoints: ['Timing & easing'] },
                      { id: 'h-3-dmg', title: 'Over-animation', description: 'Distraction', contentPoints: ['Over-animation damage'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-4',
            title: 'Brand, Identity & Visual Language',
            subSections: [
                { id: 'h-4-brand', title: 'Identity', description: 'Brand.', 
                  subSubSections: [
                      { id: 'h-4-sys', title: 'Brand systems', description: 'Rules', contentPoints: ['Brand systems'] },
                      { id: 'h-4-logo', title: 'Logo & icon systems', description: 'Assets', contentPoints: ['Logo & icon systems'] },
                      { id: 'h-4-col', title: 'Color identity', description: 'Recognition', contentPoints: ['Color identity'] },
                      { id: 'h-4-tone', title: 'Visual tone', description: 'Mood', contentPoints: ['Visual tone'] },
                      { id: 'h-4-cons', title: 'Consistency', description: 'Trust', contentPoints: ['Consistency across product'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-5',
            title: 'Graphics Engineering Basics',
            subSections: [
                { id: 'h-5-gfx', title: 'Tech', description: 'Pixels.', 
                  subSubSections: [
                      { id: 'h-5-ras', title: 'Raster vs vector', description: 'Types', contentPoints: ['Raster vs vector'] },
                      { id: 'h-5-dpi', title: 'Resolution & DPI', description: 'Sharpness', contentPoints: ['Resolution & DPI'] },
                      { id: 'h-5-col', title: 'Color models', description: 'RGB/CMYK', contentPoints: ['Color models'] },
                      { id: 'h-5-fmt', title: 'File formats', description: 'PNG/SVG/WebP', contentPoints: ['File formats (PNG, SVG, WebP)'] },
                      { id: 'h-5-opt', title: 'Image optimization', description: 'Size', contentPoints: ['Image optimization'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-6',
            title: '2D / 3D & Rendering Awareness',
            subSections: [
                { id: 'h-6-rend', title: 'Rendering', description: 'Pipeline.', 
                  subSubSections: [
                      { id: 'h-6-dim', title: '2D vs 3D graphics', description: 'Space', contentPoints: ['2D vs 3D graphics'] },
                      { id: 'h-6-pipe', title: 'Rendering pipeline', description: 'Flow', contentPoints: ['Rendering pipeline idea'] },
                      { id: 'h-6-gpu', title: 'GPU vs CPU', description: 'Processing', contentPoints: ['GPU vs CPU (basic)'] },
                      { id: 'h-6-real', title: 'Static vs real-time', description: 'Interactivity', contentPoints: ['Static vs real-time visuals'] },
                      { id: 'h-6-cost', title: 'Graphics cost', description: 'Performance', contentPoints: ['Where graphics cost comes from'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-7',
            title: 'Web Visual Standards & Frontend Bridge',
            subSections: [
                { id: 'h-7-web', title: 'Implementation', description: 'Code.', 
                  subSubSections: [
                      { id: 'h-7-html', title: 'HTML5 semantics', description: 'Structure', contentPoints: ['HTML5 semantics (real use)'] },
                      { id: 'h-7-css', title: 'CSS layout thinking', description: 'Box model', contentPoints: ['CSS layout thinking'] },
                      { id: 'h-7-scss', title: 'SCSS architecture', description: 'Scalability', contentPoints: ['SCSS architecture mindset'] },
                      { id: 'h-7-svg', title: 'SVG usage', description: 'Vector code', contentPoints: ['SVG usage'] },
                      { id: 'h-7-brow', title: 'Cross-browser', description: 'Compatibility', contentPoints: ['Cross-browser awareness'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-8',
            title: 'Animation in Production',
            subSections: [
                { id: 'h-8-anim', title: 'Motion', description: 'Performance.', 
                  subSubSections: [
                      { id: 'h-8-ui', title: 'UI vs Cinematic', description: 'Purpose', contentPoints: ['UI animation vs cinematic'] },
                      { id: 'h-8-tool', title: 'CSS vs Tools', description: 'Methods', contentPoints: ['CSS & tool-based animation'] },
                      { id: 'h-8-perf', title: 'Performance-aware', description: 'FPS', contentPoints: ['Performance-aware motion'] },
                      { id: 'h-8-hurt', title: 'When animation hurts', description: 'UX', contentPoints: ['When animation hurts UX'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-9',
            title: 'Asset Pipeline & Design → Dev Workflow',
            subSections: [
                { id: 'h-9-asset', title: 'Workflow', description: 'Handoff.', 
                  subSubSections: [
                      { id: 'h-9-exp', title: 'Asset export rules', description: 'Formats', contentPoints: ['Asset export rules'] },
                      { id: 'h-9-name', title: 'Naming & versioning', description: 'Organization', contentPoints: ['Naming/versioning'] },
                      { id: 'h-9-hand', title: 'Handoff mindset', description: 'Communication', contentPoints: ['Handoff mindset'] },
                      { id: 'h-9-tok', title: 'Design tokens', description: 'System', contentPoints: ['Design tokens'] },
                      { id: 'h-9-col', title: 'Dev collaboration', description: 'Team', contentPoints: ['Collaboration with developers'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-10',
            title: 'Accessibility & Inclusive Design',
            subSections: [
                { id: 'h-10-a11y', title: 'Inclusion', description: 'Access.', 
                  subSubSections: [
                      { id: 'h-10-cont', title: 'Contrast', description: 'Readability', contentPoints: ['Contrast'] },
                      { id: 'h-10-key', title: 'Keyboard navigation', description: 'Input', contentPoints: ['Keyboard navigation'] },
                      { id: 'h-10-sr', title: 'Screen readers', description: 'Audio', contentPoints: ['Screen readers awareness'] },
                      { id: 'h-10-inc', title: 'Inclusive UX', description: 'All users', contentPoints: ['Inclusive UX'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-11',
            title: 'Performance & Visual Cost',
            subSections: [
                { id: 'h-11-perf', title: 'Optimization', description: 'Cost.', 
                  subSubSections: [
                      { id: 'h-11-wgt', title: 'Image weight', description: 'Size', contentPoints: ['Image weight'] },
                      { id: 'h-11-cost', title: 'Animation cost', description: 'CPU/GPU', contentPoints: ['Animation cost'] },
                      { id: 'h-11-flow', title: 'Reflow & repaint', description: 'Rendering', contentPoints: ['Reflow/repaint awareness'] },
                      { id: 'h-11-trade', title: 'Visual vs performance', description: 'Balance', contentPoints: ['Visual vs performance trade-off'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-12',
            title: 'Platform-Specific Design Thinking',
            subSections: [
                { id: 'h-12-plat', title: 'Context', description: 'Device.', 
                  subSubSections: [
                      { id: 'h-12-dev', title: 'Web vs Mobile vs Desktop', description: 'Environment', contentPoints: ['Web vs mobile vs desktop'] },
                      { id: 'h-12-inp', title: 'Touch vs Mouse', description: 'Interaction', contentPoints: ['Touch vs mouse'] },
                      { id: 'h-12-den', title: 'Screen density', description: 'DPI', contentPoints: ['Screen density'] },
                      { id: 'h-12-rule', title: 'Platform UX rules', description: 'Guidelines', contentPoints: ['Platform UX rules'] }
                  ] 
                }
            ]
        },
        {
            id: 'h-13',
            title: 'Real-World Visual Judgment',
            subSections: [
                { id: 'h-13-judge', title: 'Decisions', description: 'Critique.', 
                  subSubSections: [
                      { id: 'h-13-beau', title: 'Beauty vs usability', description: 'Conflict', contentPoints: ['When beauty hurts usability'] },
                      { id: 'h-13-min', title: 'Minimalism failure', description: 'Clarity', contentPoints: ['When minimalism fails'] },
                      { id: 'h-13-biz', title: 'Business vs user', description: 'Goals', contentPoints: ['Business vs user conflict'] },
                      { id: 'h-13-red', title: 'Redesign decisions', description: 'Change', contentPoints: ['Redesign decision-making'] }
                  ] 
                }
            ]
        }
    ]
  }
];