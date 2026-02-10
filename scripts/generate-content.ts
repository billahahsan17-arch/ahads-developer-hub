
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { generateGuide } from '../services/genesisService'; // Assumed AI service

// --- Type Definitions ---

interface SubSubSection {
    id: string;
    title: string;
}

interface SubSection {
    id: string;
    title: string;
    subSubSections?: SubSubSection[];
}

interface Section {
    id: string;
    title: string;
    subSections: SubSection[];
}

interface Pillar {
    id: string;
    code: string;
    title: string;
    sections: Section[];
}

// --- AI-Powered Content Generation ---
async function generateMarkdownContent(title: string, id: string, pillarName: string): Promise<string> {
    console.log(`   -> Generating content for: ${title} in pillar ${pillarName}`);

    const prompt = `Generate a comprehensive, expert-level mastery guide on the topic of "${title}". The guide should be structured for a software engineer looking to master this concept. Use markdown formatting. Include headings, lists, and code examples where appropriate, and provide mental models to aid understanding. Start the content directly, without a main title heading.`;

    try {
        const aiContent = await generateGuide(prompt);
        if (!aiContent || aiContent.trim() === '') {
            throw new Error("Received empty content from AI service.");
        }
        return aiContent;
    } catch (error) {
        console.error(`   -> Failed to generate AI content for "${title}". Error: ${error.message}`);
        return `
# ${title}

_Content generation failed for this section._
`;
    }
}

// --- Main Processing Logic ---

async function processPillars() {
    console.log("Starting new content generation cycle...");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const pillarsDir = path.resolve(__dirname, '..', 'data', 'pillars');
    const contentDir = path.resolve(__dirname, '..', 'content');

    try {
        const pillarFiles = (await fs.readdir(pillarsDir)).filter(file => file.endsWith('.ts'));

        for (const pillarFile of pillarFiles) {
            const pillarName = path.basename(pillarFile, '.ts');
            const pillarFilePath = path.join(pillarsDir, pillarFile);
            
            console.log(`Processing pillar: ${pillarName}...`);

            const module = await import(pillarFilePath);
            const pillars: Pillar[] = Object.values(module).find(Array.isArray) as Pillar[] || [];
            
            if (!pillars || pillars.length === 0) {
                console.log(`   - No pillar data found in ${pillarFile}.`);
                continue;
            }
            
            const pillarContentDir = path.join(contentDir, pillarName);
            await fs.mkdir(pillarContentDir, { recursive: true });

            for (const pillar of pillars) {
                for (const section of pillar.sections) {
                    for (const subSection of section.subSections) {
                        if (subSection.subSubSections) {
                            for (const subSubSection of subSection.subSubSections) {
                                const markdownFilePath = path.join(pillarContentDir, `${subSubSection.id}.md`);
                                try {
                                    await fs.access(markdownFilePath);
                                    // File exists, so we skip it
                                } catch (e) {
                                    // File does not exist, generate it
                                    console.log(`   - Found missing guide: ${subSubSection.id}.md`);
                                    const markdownContent = await generateMarkdownContent(subSubSection.title, subSubSection.id, pillarName);
                                    await fs.writeFile(markdownFilePath, markdownContent);
                                    console.log(`   ✓ Successfully generated: ${subSubSection.id}.md`);
                                    // Delay to avoid overwhelming services
                                    await new Promise(resolve => setTimeout(resolve, 5000)); 
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log("Content generation cycle finished.");
    } catch (error) {
        console.error("\nAn error occurred during the content generation cycle:", error);
    }
}

// --- Autonomous Execution Loop ---

async function main() {
    console.log("Starting autonomous content generation process (24/7).");
    console.log("This script will now run indefinitely to generate missing guides.");

    while (true) {
        await processPillars();
        
        const oneHourInMs = 60 * 60 * 1000;
        console.log(`
Next cycle will begin in 1 hour. Waiting...`);
        await new Promise(resolve => setTimeout(resolve, oneHourInMs));
    }
}

main();
