
export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ELITE';
export type CompletionStatus = 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';

export interface SubSubSection {
  id: string;
  title: string;
  description: string;
  contentPoints: string[];
  relatedIds?: string[]; // IDs of other SubSubSections to link to
  
  // New Metadata for Scalability
  difficulty?: DifficultyLevel;
  tags?: string[];
  estimatedMinutes?: number;
}

export interface SubSection {
  id: string;
  title: string;
  description: string;
  subSubSections: SubSubSection[];
}

export interface Section {
  id: string;
  title: string;
  subSections: SubSection[];
}

export interface Pillar {
  id: string;
  code: string; // A, B, C...
  title: string;
  description: string;
  sections: Section[];
  color: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AtlasMode {
  MENTOR = 'MENTOR',
  REVIEWER = 'REVIEWER',
  JUDGE = 'JUDGE'
}

// Flattened Index Interface for O(1) Lookups
export interface KnowledgeNode {
  id: string;
  type: 'PILLAR' | 'SECTION' | 'SUBSECTION' | 'TOPIC';
  title: string;
  data: Pillar | Section | SubSection | SubSubSection;
  parentId?: string;
  pillarId?: string; // Root ancestor
  path: string; // Breadcrumbs
}

// System Logging Interface
export interface LogEntry {
    id: string;
    timestamp: number;
    content: string;
    analysis?: string;
    tags: string[];
    level?: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
}

// Community Types
export interface SiteReview {
    id: string;
    user: string;
    rating: number; // 1-5
    comment: string;
    timestamp: number;
}

export interface CodexPost {
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: number;
    votes: number;
    tags: string[];
    atlasVerdict: 'APPROVED' | 'PENDING'; // Only approved posts are shown permanently
}
