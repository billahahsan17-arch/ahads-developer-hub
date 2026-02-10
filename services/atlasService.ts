
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, LogEntry } from '../types';
import { 
    analyzeCodeLocally, 
    generateArchitectureLocally, 
    generateDocsLocally,
    translateCodeLocally,
    generateTestsLocally,
    generateRegexLocally,
    generateQuizLocally,
    generateResumeRefinement,
    generateNegotiationStrategy,
    analyzeComplexityLocally,
    generateCommitMessageLocally,
    simplifyConceptLocally,
    processLocalInput,
    generateJiraLocal,
    analyzeVisualLocal,
    generateWireframeLocal,
    generateCritiqueLocal,
    shiftToneLocal,
    analyzeArchitectureNodesLocally,
    analyzeSystemErrorLocal,
    streamLocalResponse,
    generateAutoDocsLocally,
    generateGenericLocal
} from './localAI'; 

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey.includes('PLACEHOLDER') || apiKey.length < 10) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// --- LOGGING ---
export const logToBlackBox = (content: string, tags: string[], level: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL' = 'INFO') => {
    const entry: LogEntry = {
        id: Date.now().toString(36),
        timestamp: Date.now(),
        content,
        tags,
        level
    };
    try {
        const saved = localStorage.getItem('atlas_blackbox_logs');
        const existing: LogEntry[] = saved ? JSON.parse(saved) : [];
        const updated = [entry, ...existing].slice(0, 100); // Keep last 100
        localStorage.setItem('atlas_blackbox_logs', JSON.stringify(updated));
    } catch (e) {
        console.warn("BlackBox Log Failed", e);
    }
};

// --- CHAT STREAM ---
export async function* streamMessageToAtlas(
    history: ChatMessage[], 
    newMessage: string, 
    context: string, 
    useSearch: boolean
): AsyncGenerator<string, void, unknown> {
    const client = getClient();
    
    if (client) {
        try {
            // Construct history for context
            // Note: For a stateless stream here we construct a prompt, or we could use `chats.create`
            // if we maintained the chat object. Since this is a utility function, we reconstruct context.
            let fullPrompt = `System Context: ${context}\n\nChat History:\n`;
            history.slice(-5).forEach(msg => { // Last 5 messages for context window
                fullPrompt += `${msg.role.toUpperCase()}: ${msg.text}\n`;
            });
            fullPrompt += `USER: ${newMessage}\nMODEL:`;

            const config: any = {
                systemInstruction: "You are Atlas, an elite engineering assistant. Be concise, technical, and precise.",
            };
            if (useSearch) {
                config.tools = [{ googleSearch: {} }];
            }

            const result = await client.models.generateContentStream({
                model: 'gemini-2.5-flash-latest',
                contents: fullPrompt,
                config
            });

            for await (const chunk of result) {
                yield chunk.text || '';
            }
            return;
        } catch (e) {
            console.error("Atlas Cloud Error", e);
            // Fallthrough to local on error
        }
    }

    // Local Fallback
    for await (const chunk of streamLocalResponse(newMessage)) {
        yield chunk;
    }
}

// --- UNIVERSAL GENERATOR (Online Priority) ---
export const generateGenericAI = async (toolId: string, promptTemplate: string, input: string) => {
    const client = getClient();
    
    if (client) {
        try {
            const systemContext = "Act as a Principal Staff Engineer. Provide high-quality, production-ready output.";
            const prompt = `${promptTemplate}\n\nInput Context:\n${input}`;
            
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: prompt,
                config: {
                    systemInstruction: systemContext,
                    temperature: 0.2
                }
            });
            return res.text || await generateGenericLocal(toolId, input);
        } catch (e) { 
            console.error("Cloud Gen Failed", e);
            return await generateGenericLocal(toolId, input); 
        }
    }

    return await generateGenericLocal(toolId, input); 
};

// --- SPECIFIC FUNCTIONS ---

export const auditCode = async (code: string, language: string) => {
    const client = getClient();
    if (client) {
        try {
            const prompt = `Audit this ${language} code for security vulnerabilities, performance issues, and code quality. Provide a refactored version.\n\nCode:\n${code}`;
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: prompt,
                config: { responseMimeType: 'application/json' } // Request JSON for structured output if possible, or parse text
            });
            
            // Try to parse if model returns JSON string, else format manually
            // For resilience, we'll ask for text and format it or assume the model follows instructions well.
            // Let's try to get a structured text response.
            
            // Re-prompting for structure without forcing JSON mode if schema not strict
            const textRes = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: `Audit this ${language} code. Return JSON with format: { "analysis": "markdown string", "code": "refactored string", "securityScore": number }.\n\nCode:\n${code}`,
                config: { responseMimeType: 'application/json' }
            });
            
            const data = JSON.parse(textRes.text || '{}');
            return {
                analysis: data.analysis || "Analysis failed to parse.",
                code: data.code || code,
                securityScore: data.securityScore || 50
            };
        } catch (e) {
            console.error(e);
        }
    }
    return await analyzeCodeLocally(code, language);
};

export const generateSystemArchitecture = async (requirements: string) => {
    const client = getClient();
    if (client) {
        try {
            const prompt = `Design a system architecture for: "${requirements}".
            Output JSON: { "diagram": "mermaid graph TD string...", "explanation": "markdown explanation" }`;
            
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });
            return JSON.parse(res.text || '{}');
        } catch (e) {
            console.error(e);
        }
    }
    return await generateArchitectureLocally(requirements);
};

export const analyzeSystemDesignHybrid = async (nodes: any[]) => {
    const client = getClient();
    if (client) {
        try {
            const prompt = `Analyze this system topology nodes: ${JSON.stringify(nodes)}. Identify single points of failure and bottlenecks.`;
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: prompt
            });
            return res.text || "Analysis unavailable.";
        } catch (e) { console.error(e); }
    }
    return await analyzeArchitectureNodesLocally(nodes);
};

export const generateAutoDocs = async (code: string) => {
    return generateGenericAI('code-doc', 'Generate comprehensive JSDoc/Docstrings for this code:', code);
};

export const translateCode = async (code: string, from: string, to: string) => {
    const client = getClient();
    if(client) {
        try {
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: `Translate this ${from} code to ${to}. Only return the code.\n\n${code}`
            });
            return res.text || "";
        } catch(e) {}
    }
    return await translateCodeLocally(code, from, to);
};

export const generateUnitTests = async (code: string, framework: string) => {
    return generateGenericAI('code-unit', `Generate ${framework} unit tests for this code. Cover edge cases.`, code);
};

export const generateRegex = async (description: string) => {
    return generateGenericAI('code-regex', 'Generate a Regex pattern for:', description);
};

export const generateCalibrationQuiz = async () => {
    const client = getClient();
    if(client) {
        try {
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: "Generate a hard engineering quiz question. JSON format: { \"topic\": string, \"difficulty\": string, \"question\": string, \"answer\": string }",
                config: { responseMimeType: 'application/json' }
            });
            return res.text || "";
        } catch(e) {}
    }
    return await generateQuizLocally();
};

export const analyzeComplexity = async (code: string) => {
    const client = getClient();
    if(client) {
        try {
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: `Analyze Big O Time and Space complexity. JSON: { "timeComplexity": "O(...)", "spaceComplexity": "O(...)", "explanation": "string" }\n\n${code}`,
                config: { responseMimeType: 'application/json' }
            });
            return JSON.parse(res.text || '{}');
        } catch(e) {}
    }
    return await analyzeComplexityLocally(code);
};

export const generateCommitMessage = async (diff: string) => {
    const client = getClient();
    if(client) {
        try {
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: `Generate a Conventional Commit message for this diff:\n${diff}`
            });
            return res.text || "update: changes";
        } catch(e) {}
    }
    return await generateCommitMessageLocally(diff);
};

export const simplifyConcept = async (topic: string) => {
    return generateGenericAI('dev-eli5', 'Explain this concept like I am 5, but use accurate engineering analogies:', topic);
};

export const refineResume = async (text: string) => {
    return generateGenericAI('soft-resume', 'Rewrite this resume content to be ATS-friendly, action-oriented, and quantified:', text);
};

export const generateNegotiation = async (offer: string, leverage: string) => {
    return generateGenericAI('soft-neg', `Generate a salary negotiation script. Offer: ${offer}. Leverage: ${leverage}.`, '');
};

// --- ELITE DEEP GUIDE GENERATOR (GENESIS PROTOCOL) ---
export const generateDeepGuide = async (title: string, desc: string, points: string[]) => {
    const client = getClient();
    if(client) {
        try {
            // Enhanced "Pacific Ocean Depth" Prompt
            const prompt = `
            Act as a Distinguished Fellow Engineer and Computer Science Professor.
            Your task: Create a definitive, encyclopedic mastery guide for the topic: "${title}".
            Context: ${desc}
            Core Concepts to Cover: ${points.join(', ')}

            REQUIREMENTS FOR DEPTH:
            1. **First Principles:** Start with the physics/math/logic foundation. Why does this exist?
            2. **Mental Models:** Provide a unique way to visualize this concept.
            3. **Architecture & Internals:** Don't just say what it is, explain how it works under the hood (memory layout, network packets, kernel calls, etc. where applicable).
            4. **Trade-offs:** Explain the cost of using this (Latency vs Throughput, Consistency vs Availability).
            5. **Production Reality:** How does this break in the real world? What are the "unknown unknowns"?
            6. **Code/Implementation:** Provide high-quality code snippets (if applicable) demonstrating the *pattern*, not just syntax.
            
            Format: High-quality Markdown.
            Tone: Professional, Dense, Elite. No fluff.
            `;
            
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: prompt,
                config: { 
                    tools: [{ googleSearch: {} }], // Grounding for fresh info
                    temperature: 0.3 // Precise
                } 
            });
            
            // Extract sources if available
            let sources: string[] = [];
            if(res.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                sources = res.candidates[0].groundingMetadata.groundingChunks
                    .map((c: any) => c.web?.uri)
                    .filter((u: any) => u);
            }

            return { content: res.text || '', sources };
        } catch(e) { 
            console.error("Genesis Generation Error", e);
            throw e; // Rethrow to let Genesis retry logic handle it
        }
    }
    // Fallback static guide
    return { 
        content: `### ${title}\n\n**Offline Mode**: Detailed guide unavailable. \n\nPoints covered:\n${points.map(p => `- ${p}`).join('\n')}`, 
        sources: [] 
    };
};

export const judgeSubmission = async (title: string, content: string) => {
    const client = getClient();
    if(client) {
        try {
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: `Judge this engineering post. JSON: { "approved": boolean, "reason": string }. Criteria: High technical depth, accuracy, no fluff.\n\nTitle: ${title}\nContent: ${content}`,
                config: { responseMimeType: 'application/json' }
            });
            return JSON.parse(res.text || '{"approved": false, "reason": "System Error"}');
        } catch(e) {}
    }
    return { approved: true, reason: "Offline Mode: Auto-approved" };
};

export const generateJiraTicket = async (type: string, context: string) => {
    return generateGenericAI('prod-user', `Generate a Jira ${type} ticket for:\n${context}`, '');
};

export const generateCritique = async (input: string) => {
    return generateGenericAI('dev-adv', 'Critique this architecture/stack ruthlessly looking for bottlenecks and risks:', input);
};

export const shiftTone = async (input: string, tone: string) => {
    return generateGenericAI('soft-tone', `Rewrite this text to be ${tone}:`, input);
};

export const generateReactFromWireframe = async (base64: string) => {
    return analyzeVisualData(base64, "Generate React Tailwind code for this UI.");
};

export const analyzeSystemError = async (err: string) => {
    const client = getClient();
    if(client) {
        try {
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: `Analyze this error stack trace and provide a root cause and fix:\n${err}`
            });
            return res.text || "Analysis failed.";
        } catch(e) {}
    }
    return await analyzeSystemErrorLocal(err);
};

export const analyzeEngineeringLog = async (log: string) => {
    return generateGenericAI('code-explain', 'Analyze this engineering log entry and extract key technical insights:', log);
};

export const generateVeoVideo = async (prompt: string, ar: '16:9'|'9:16', imgBase64?: string) => {
    const client = getClient();
    if(!client) throw new Error("KEY_NOT_FOUND");
    
    // Stub for Veo - Simulating the API structure described in prompt guidelines
    // In real implementation, this would use ai.models.generateVideos
    try {
        await new Promise(r => setTimeout(r, 2000));
        return "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // Mock result
    } catch(e) {
        return null;
    }
};

export const generateProImage = async (prompt: string, size: string, ar: string) => {
    const client = getClient();
    if(client) {
        try {
            // Using Imagen 3 via generateImages
            const res = await client.models.generateImages({
                model: 'imagen-3.0-generate-001',
                prompt,
                config: { numberOfImages: 1, aspectRatio: ar }
            });
            // Extract base64
            const b64 = res.generatedImages?.[0]?.image?.imageBytes;
            if(b64) return `data:image/png;base64,${b64}`;
        } catch(e) { console.error(e); }
    }
    return null; // Fail gracefully
};

export const analyzeVisualData = async (base64: string, prompt: string) => {
    const client = getClient();
    if(client) {
        try {
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest',
                contents: [
                    { inlineData: { mimeType: 'image/png', data: base64 } },
                    { text: prompt }
                ]
            });
            return res.text || "";
        } catch(e) { console.error(e); }
    }
    return await analyzeVisualLocal("Image analysis unavailable offline.");
};

export const generateSpeech = async (text: string, voice: string) => {
    const client = getClient();
    if(client) {
        try {
            const res = await client.models.generateContent({
                model: 'gemini-2.5-flash-latest', // Assuming TTS capability in flash or specific model
                contents: `Say this: ${text}`,
            });
            return null; 
        } catch(e) {}
    }
    return null;
};
