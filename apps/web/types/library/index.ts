import { CaseStage } from '@/types/shared/case';    

// Core enums based on existing data patterns list of allowed file types
export enum FileType {
  PDF = 'pdf',
  DOC = 'doc',
  VIDEO = 'video',
  AUDIO = 'audio',
  IMAGE = 'image',
  TRANSCRIPT = 'transcript',
  EXCEL = 'excel',
  POWERPOINT = 'powerpoint',
  OTHER = 'other'
}

export enum FileStatus {
  DRAFT = 'draft', // still in progress
  FINAL = 'final', // completed-
  ARCHIVED = 'archived', // not used
  PENDING_REVIEW = 'pending_review' // pending review
}

export enum DocumentCategory {
  COURT_PROCEEDINGS = 'Procedimientos Judiciales',
  CASE_DOCUMENTATION = 'Documentación del Caso',
  EVIDENCE_MATERIALS = 'Material Probatorio',
  ADMINISTRATIVE = 'Administrativo',
  CLIENT_COMMUNICATIONS = 'Comunicaciones con Cliente',
  CUSTOM = 'Custom'
}

export enum DocumentType {
  CONTRACT = 'Contrato',
  LETTER = 'Carta',
  PLEADING = 'Demanda',
  TESTIMONY = 'Testimonio',
  EXPERT_REPORT = 'Dictamen Pericial',
  COURT_ORDER = 'Orden Judicial',
  MOTION = 'Pliego Petitorio',
  INVOICE = 'Factura',
  EVIDENCE_RECORD = 'Acta de Prueba',
  OTHER = 'Otro'
}

export enum ConfidentialityLevel {
  PUBLIC = 'Público',
  CONFIDENTIAL = 'Confidencial',
  PRIVILEGED = 'Privado',
  SEALED = 'Sellado'
}

export interface CoreProperties {
  fileType: FileType;       // What kind of file is it?
  caseNumber: string;       // Which case does it belong to?
  createdAt: string;        // When was it added?
  modifiedAt: string;     // When was it last changed?
  author: string;           // Who created it?
  status: FileStatus;       // What's its current status?
  version: string;          // Which version is this?
}
// Metadata of the file
export interface CoreMetadata {
  caseNumber: string;
  filingDate: Date;
  dueDate: Date;
  author: string;
  lastModified: Date;
  version: string;
}

export interface LegalProperties {
  documentType: DocumentType;    // What kind of legal document?
  confidentiality: ConfidentialityLevel;  // Who can see it?
  isLastVersion: boolean;         // Is this the latest version?
  jurisdiction?: string;          // Which court/area?
}

export interface CustomProperty {
  id: string;
  name: string;
  value: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'select';
  options?: string[];
}

export interface ContentPreview {
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
}

export interface SmartPreview {
  thumbnail?: string;
  aiSummary?: {
    summary: string;
    keyPoints: string[];
    relatedCases?: string[];
  };
  contentPreview?: {
    excerpt: string;
    highlights: string[];
    pageCount?: number;
    duration?: string;
  };
  relatedFiles: {
    id: string;
    name: string;
    type: FileType;
    relevance: number;
  }[];
  context: {
    lastViewed?: string;
    lastEditor?: string;
    comments?: number;
    version?: string;
  };
}

export interface WorkspaceContext {
  mainDocument: LibraryFile | null;
  relatedDocuments: LibraryFile[];
  aiSummary: {
    summary: string;
    keyPoints: string[];
    relatedCases?: string[];
  };
  notes: {
    id: string;
    content: string;
    author: string;
    timestamp: string;
    attachments?: string[];
  }[];
  timeline: {
    id: string;
    type: 'creation' | 'modification' | 'comment' | 'share' | 'review';
    description: string;
    timestamp: string;
    actor: string;
  }[];
  collaborators: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    lastActive?: string;
  }[];
  activities: {
    id: string;
    type: 'view' | 'edit' | 'comment' | 'share';
    description: string;
    timestamp: string;
    user: string;
  }[];
}

export interface LibraryFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  preview?: string;
  coreProperties: CoreProperties;
  legalProperties: LegalProperties;
  customProperties: CustomProperty[];
  category: DocumentCategory;
  contentPreview?: ContentPreview;
  smartPreview?: SmartPreview;
  workspace?: WorkspaceContext;
  caseStage: CaseStage;
  metadata: {
    caseNumber?: string;
    createdAt?: string;
    dueDate?: string;
    author: string;
    lastModified: string;
    version: string;
  };
} 