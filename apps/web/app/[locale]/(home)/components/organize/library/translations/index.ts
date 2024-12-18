import { SmartPreview, WorkspaceContext, DocumentCategory, CaseStage, DocumentTag } from '../types';

export * from './en';
export * from './es';

// Define types for the translations
// export type LibraryTranslations = typeof import('./en').libraryDemoEn;

// Update LibraryFile interface to match the demo data structure
export interface DemoLibraryFile {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'video' | 'audio' | 'image';
  case: string;
  size: string;
  lastModified: string;
  tags: readonly string[];
  contentPreview?: {
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
  };

  // AI features
  aiSummary?: {
    summary: string;
    keyPoints: readonly string[];
  };

  // Related files
  relatedFiles?: Array<{
    id: string;
    name: string;
    relevance: number;
  }>;

  // Optional workspace data
  workspace?: {
    timeline?: Array<{
      id: string;
      description: string;
      actor: string;
      timestamp: string;
    }>;
    collaborators?: Array<{
      id: string;
      name: string;
    }>;
  };
}

export interface LibraryTranslations {
  search: {
    placeholder: string;
  };
  upload: {
    button: string;
    dragDrop: string;
  };
  fileTypes: {
    pdf: string;
    doc: string;
    video: string;
    audio: string;
    image: string;
  };
  actions: {
    download: string;
    share: string;
    delete: string;
  };
  preview: {
    aiInsights: string;
    summary: string;
    keyPoints: string;
    fileInfo: string;
  };
  filters: {
    all: string;
    evidence: string;
    documents: string;
    media: string;
    transcripts: string;
  };
  demoFiles: ReadonlyArray<DemoLibraryFile>;
} 