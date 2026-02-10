
/*
 * ATLAS AI GATEWAY
 * 
 * This service acts as a centralized, resilient, and secure interface for all 
 * AI-powered features in the application. It orchestrates multiple AI providers,
 * handles fallbacks gracefully, and programmatically injects security warnings.
 */

// --- CONFIGURATION ---

// 1. Define your AI provider endpoints. 
// These would be the URLs for your backend proxies or serverless functions that call the actual AI APIs (e.g., Google AI, Anthropic, etc.).
// The idea is to have a primary (e.g., a more powerful model) and a fallback (e.g., a faster, lighter model).
const AI_PROVIDERS = [
    { name: 'PRIMARY_GEMINI', endpoint: 'https://your-google-ai-proxy.workers.dev' },
    // { name: 'FALLBACK_CLAUDE', endpoint: 'https://your-anthropic-proxy.workers.dev' }, 
    // Add more fallbacks as you set them up.
];

// 2. Standardized Security & Privacy Warning
// This message will be automatically prepended to every successful AI response.
const SECURITY_WARNING = `[ATTENTION] Information shared with AI models may not be 100% secure. Avoid sharing sensitive data. The AI operates with a stateless, privacy-first approach; no data is stored or used for training.`;

/**
 * Generates content using a chain of AI providers with fallback logic.
 *
 * @param {string} prompt The user's prompt for the AI.
 * @param {object} [options] Optional parameters for the request.
 * @param {boolean} [options.isJson=false] Whether to expect a JSON response.
 * @returns {Promise<string | object>} The AI-generated content (string or JSON object) with security warning.
 * @throws {Error} If all AI providers fail.
 */
export const generateWithFallback = async (prompt: string, options = { isJson: false }): Promise<string | object> => {
    let lastError: any = null;

    for (const provider of AI_PROVIDERS) {
        try {
            const response = await fetch(provider.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`Provider ${provider.name} failed with status: ${response.status}`);
            }

            const data = await response.json();
            const content = data.content; // Assuming the proxy returns a { content: "..." } object

            if (options.isJson) {
                // For JSON, we can't prepend the text warning directly into the object.
                // We will return the parsed object and expect the UI component to display the warning.
                // A better approach could be to wrap it: { warning: SECURITY_WARNING, data: parsedContent }
                try {
                    const parsedContent = JSON.parse(content);
                    return {
                        warning: SECURITY_WARNING,
                        data: parsedContent,
                    };
                } catch (e) {
                     throw new Error(`Provider ${provider.name} returned invalid JSON.`);
                }
            }
            
            // For text, prepend the warning.
            return `${SECURITY_WARNING}\n\n---\n\n${content}`;

        } catch (error) {
            console.error(`AtlasGateway: Provider ${provider.name} failed.`, error);
            lastError = error; // Store the error and try the next provider
        }
    }

    // If all providers have failed
    throw new Error('All AI services are currently unavailable. Please try again later. The local simulation engine remains active.');
};

// For simplicity in components, we can export a primary generation function.
export const Atlas = {
    generate: generateWithFallback,
};

