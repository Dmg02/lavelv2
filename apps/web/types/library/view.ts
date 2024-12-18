
import type { FileType, FileStatus, DocumentCategory, LibraryFile } from './index';

export type ViewMode = 'grid' | 'gallery' | 'list' | 'board';

export interface Folder {
  id: string;
  name: string;
  type: 'case' | 'evidence' | 'discovery' | 'pleadings' | 'correspondence' | 'custom';
  files: LibraryFile[];
  subfolders?: Folder[];
  metadata?: {
    caseNumber?: string;
    createdAt: string;
    modifiedAt: string;
    totalFiles: number;
  };
}

export interface ViewOption {
  id: ViewMode;
  label: string;
  icon: string;
}

export interface FilterState {
  types: FileType[];
  statuses: FileStatus[];
  categories: DocumentCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface Tag {
  id: string;
  name: string;
  color: string;
} 