
// ---This file is being updated to use the new hybrid connection model everywhere.---

import { generateGenericAI } from './atlasService'; // Use the resilient cloud function

// All functions that previously had their own local implementation will now be wrappers
// around the centralized `generateGenericAI` function. This ensures that every
// tool benefits from the primary -> secondary -> local fallback logic.

export const auditCode = (code: string, language: string) => {
    const prompt = `Audit this ${language} code for security, performance, and quality. Provide a refactored version.`;
    return generateGenericAI('code-audit', prompt, code);
};

export const generateSystemArchitecture = (requirements: string) => {
    const prompt = `Design a system architecture for: "${requirements}". Output Mermaid diagram code.`;
    return generateGenericAI('arch-design', prompt, requirements);
};

export const generateAutoDocs = (code: string) => {
    return generateGenericAI('code-doc', 'Generate comprehensive documentation for this code:', code);
};

export const translateCode = (code: string, from: string, to: string) => {
    const prompt = `Translate this ${from} code to ${to}. Only return the code.`;
    return generateGenericAI('code-translate', prompt, code);
};

export const generateUnitTests = (code: string, framework: string) => {
    return generateGenericAI('code-unit', `Generate ${framework} unit tests for this code:`, code);
};

export const generateRegex = (description: string) => {
    return generateGenericAI('code-regex', 'Generate a Regex pattern for:', description);
};

export const analyzeComplexity = (code: string) => {
    return generateGenericAI('code-complexity', 'Analyze the Big O Time and Space complexity of this code:', code);
};

export const generateCommitMessage = (diff: string) => {
    return generateGenericAI('git-commit', 'Generate a Conventional Commit message for this diff:', diff);
};

export const simplifyConcept = (topic: string) => {
    return generateGenericAI('dev-eli5', 'Explain this concept like I am 5:', topic);
};

export const refineResume = (text: string) => {
    return generateGenericAI('soft-resume', 'Rewrite this resume content to be ATS-friendly and action-oriented:', text);
};

export const generateNegotiation = (offer: string, leverage: string) => {
    const context = `Offer: ${offer}, Leverage: ${leverage}`;
    return generateGenericAI('soft-neg', 'Generate a salary negotiation script based on this context:', context);
};

export const generateJiraTicket = (type: string, context: string) => {
    const prompt = `Generate a Jira ${type} ticket for the following context:`;
    return generateGenericAI('prod-jira', prompt, context);
};

export const generateCritique = (input: string) => {
    return generateGenericAI('dev-adv', 'Critique this architecture/stack ruthlessly:', input);
};

export const shiftTone = (input: string, tone: string) => {
    return generateGenericAI('soft-tone', `Rewrite this text to be ${tone}:`, input);
};

// Functions that were already calling generateGenericAI or are purely local can remain.
export * from './localAI.original'; // Assuming original local-only functions are preserved elsewhere.
