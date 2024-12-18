import type { FileType, FileStatus, DocumentCategory } from './index';

export interface LibraryTranslations {
  ui: {
    search: {
      placeholder: string;
      noResults: string;
    };
    fileTypes: Record<FileType, string>;
    status: Record<FileStatus, string>;
    categories: Record<DocumentCategory, string>;
    actions: {
      upload: string;
      download: string;
      share: string;
      delete: string;
      rename: string;
      move: string;
    };
    filters: {
      title: string;
      type: string;
      status: string;
      category: string;
      date: string;
    };
    sort: {
      title: string;
      name: string;
      date: string;
      size: string;
      type: string;
    };
    workspace: {
      preview: string;
      aiInsights: string;
      history: string;
      comments: string;
      fileInfo: string;
      tags: string;
      relatedFiles: string;
      noPreview: string;
      noSummary: string;
      relevance: string;
    };
  };
  messages: {
    loading: string;
    error: string;
    success: string;
    confirmDelete: string;
  };
} 