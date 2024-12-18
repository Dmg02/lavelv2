import type { Case, CaseDocument } from '@/types/shared/case';
import { FileType, FileStatus, DocumentCategory, ContentPreview, LibraryFile, ConfidentialityLevel, DocumentType, SmartPreview } from '@/types/library/index';
import { CaseStage } from '@/types/shared/case';
import { lawyers } from '@/data/lawyers';

export const libraryUtils = {
  transformCaseDocuments(caseData: Case): LibraryFile[] {
    return caseData.documents.map(doc => ({
      id: doc.id,
      name: doc.title,
      size: doc.size,
      preview: doc.preview,
      status: this.determineFileStatus(doc.status),
      category: this.determineDocumentCategory(doc.type),
      coreProperties: {
        fileType: this.determineFileType(doc.type),
        caseNumber: caseData.caseNumber,
        author: this.getAuthorName(doc.authorId),
        status: this.determineFileStatus(doc.status),
        version: doc.version
      },
      legalProperties: {
        documentType: this.determineDocumentType(doc.type),
        confidentiality: this.determineConfidentialityLevel(doc.confidentiality),
        caseStage: this.determineCaseStage(doc.caseStage),
        dueDate: doc.dueDate,
        assignedLawyers: caseData.assignedLawyerIds,
      },
      customProperties: [],
      metadata: {
        caseNumber: caseData.caseNumber,
        createdAt: doc.filingDate,
        dueDate: doc.dueDate,
        author: this.getAuthorName(doc.authorId),
        lastModified: doc.lastModified,
        version: doc.version
      },
      contentPreview: this.generateContentPreview(doc),
      caseId: caseData.id,
      assignedLawyers: caseData.assignedLawyerIds,
    }));
  },

  determineFileType(type: string): FileType {
    const typeMap: Record<string, FileType> = {
      'application/pdf': FileType.PDF,
      'application/msword': FileType.DOC,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileType.DOC,
      'video/mp4': FileType.VIDEO,
      'audio/mpeg': FileType.AUDIO,
      'image/jpeg': FileType.IMAGE,
      'image/png': FileType.IMAGE,
      'text/plain': FileType.TRANSCRIPT,
    };
    return typeMap[type] || FileType.DOC;
  },

  determineFileStatus(status: string): FileStatus {
    const statusMap: Record<string, FileStatus> = {
      'draft': FileStatus.DRAFT,
      'final': FileStatus.FINAL,
      'archived': FileStatus.ARCHIVED,
      'review': FileStatus.PENDING_REVIEW,
    };
    return statusMap[status.toLowerCase()] || FileStatus.DRAFT;
  },

  determineDocumentCategory(type: string): DocumentCategory {
    const categoryMap: Record<string, DocumentCategory> = {
      'COURT_PROCEEDINGS': DocumentCategory.COURT_PROCEEDINGS,
      'CASE_DOCUMENTATION': DocumentCategory.CASE_DOCUMENTATION,
      'EVIDENCE_MATERIALS': DocumentCategory.EVIDENCE_MATERIALS,
      'ADMINISTRATIVE': DocumentCategory.ADMINISTRATIVE,
      'CLIENT_COMMUNICATIONS': DocumentCategory.CLIENT_COMMUNICATIONS,
    };
    return categoryMap[type.toLowerCase()] || DocumentCategory.CUSTOM;
  },
  determineDocumentType(type: string): DocumentType {
    const typeMap: Record<string, DocumentType> = {
      'CONTRACT': DocumentType.CONTRACT,
      'LETTER': DocumentType.LETTER,
      'PLEADING': DocumentType.PLEADING,
      'TESTIMONY': DocumentType.TESTIMONY,
    };
    return typeMap[type.toLowerCase()] || DocumentType.OTHER;
  },

  determineConfidentialityLevel(confidentiality: string): ConfidentialityLevel {
    const levelMap: Record<string, ConfidentialityLevel> = {
      'PUBLIC': ConfidentialityLevel.PUBLIC,
      'CONFIDENTIAL': ConfidentialityLevel.CONFIDENTIAL,
      'PRIVILEGED': ConfidentialityLevel.PRIVILEGED,
      'SEALED': ConfidentialityLevel.SEALED,
    };
    return levelMap[confidentiality.toLowerCase()] || ConfidentialityLevel.PUBLIC;
  },

  determineCaseStage(stage: string): CaseStage {
    const stageMap: Record<string, CaseStage> = {
      'INITIAL': CaseStage.INITIAL,
      'DISCOVERY': CaseStage.DISCOVERY,
      'TRIAL': CaseStage.TRIAL,
      'APPEAL': CaseStage.APPEAL,
      'SETTLEMENT': CaseStage.SETTLEMENT,
    };
    return stageMap[stage.toLowerCase()] || CaseStage.DISCOVERY;
  },


  getAuthorName(lawyerId: string): string {
    const lawyer = lawyers[lawyerId];
    return lawyer ? lawyer.name : 'Unknown';
  },

  generateContentPreview(doc: CaseDocument): ContentPreview {
    return {
      text: doc.preview?.text,
      imageUrl: doc.preview?.imageUrl,
      videoUrl: doc.preview?.videoUrl,
      audioUrl: doc.preview?.audioUrl,
    };
  },

  formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
  }
}; 