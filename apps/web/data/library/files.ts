import type { LibraryFile } from '@/types/library';
import { FileType, FileStatus, DocumentCategory, DocumentType, ConfidentialityLevel } from '@/types/library';
import { CaseStage } from '@/types/shared/case';
import { lawyers } from '@/data/lawyers';

export const mockLibraryFiles: LibraryFile[] = [
  {
    id: 'doc-1',
    name: 'Demanda Laboral - García vs Industrias XYZ.pdf',
    type: FileType.PDF,
    size: '3.8 MB',
    preview: 'JUNTA LOCAL DE CONCILIACIÓN Y ARBITRAJE\nCIUDAD DE MÉXICO\nEXPEDIENTE: LAB/2024/0123\n\nDEMANDA LABORAL\n\nH. JUNTA LOCAL DE CONCILIACIÓN Y ARBITRAJE\nPRESENTE\n\nPEDRO GARCÍA LÓPEZ, por mi propio derecho...',
    coreProperties: {
      fileType: FileType.PDF,
      caseNumber: 'LAB/2024/0123',
      createdAt: '2024-03-20',
      modifiedAt: '2024-03-20',
      author: lawyers['L001'].name,
      status: FileStatus.DRAFT,
      version: '1.0'
    },
    legalProperties: {
      documentType: DocumentType.PLEADING,
      confidentiality: ConfidentialityLevel.CONFIDENTIAL,
      jurisdiction: 'Ciudad de México',
      isLastVersion: true,
    },
    customProperties: [],
    category: DocumentCategory.COURT_PROCEEDINGS,
    contentPreview: {
      text: 'JUNTA LOCAL DE CONCILIACIÓN Y ARBITRAJE\nCIUDAD DE MÉXICO\nEXPEDIENTE: LAB/2024/0123\n\nDEMANDA LABORAL\n\nH. JUNTA LOCAL DE CONCILIACIÓN Y ARBITRAJE\nPRESENTE\n\nPEDRO GARCÍA LÓPEZ, por mi propio derecho...',
      imageUrl: 'https://placehold.co/600x400/png'
    },
    smartPreview: {
      thumbnail: 'https://placehold.co/600x400/png',
      aiSummary: {
        summary: 'Análisis de demanda laboral que revela elementos sólidos para acreditar despido injustificado. La estructura y prestaciones reclamadas cumplen con los requisitos del Art. 123 Constitucional y LFT.',
        keyPoints: [
          'Cumple requisitos formales de demanda según Art. 872 LFT',
          'Alta probabilidad de éxito basada en jurisprudencia similar',
          'Riesgo identificado: Posible oferta de reinstalación',
          'Oportunidad de negociación favorable'
        ],
        relatedCases: ['LAB/2023/0892']
      },
      relatedFiles: [
        {
          id: 'related-1',
          name: 'Carta de Despido.pdf',
          type: FileType.PDF,
          relevance: 0.95
        },
        {
          id: 'related-2',
          name: 'Contrato Individual de Trabajo.pdf',
          type: FileType.PDF,
          relevance: 0.90
        }
      ],
      context: {
        lastViewed: '2024-03-20T15:30:00Z',
        lastEditor: lawyers['L001'].name,
        comments: 2,
        version: '1.0'
      }
    },
    workspace: {
      mainDocument: null,
      relatedDocuments: [],
      aiSummary: {
        summary: 'Análisis de demanda laboral que revela elementos sólidos para acreditar despido injustificado...',
        keyPoints: [
          'Cumple requisitos formales de demanda según Art. 872 LFT',
          'Alta probabilidad de éxito basada en jurisprudencia similar',
          'Riesgo identificado: Posible oferta de reinstalación',
          'Oportunidad de negociación favorable'
        ],
        relatedCases: ['LAB/2023/0892']
      },
      notes: [
        {
          id: 'note-1',
          content: 'Revisión inicial de la demanda completada. Se requiere ajustar montos de prestaciones.',
          author: lawyers['L001'].name,
          timestamp: '2024-03-20 10:30 AM',
          attachments: ['Cálculos preliminares.xlsx']
        }
      ],
      timeline: [
        {
          id: 'event-1',
          type: 'creation',
          description: 'Documento creado',
          timestamp: '2024-03-20 09:00 AM',
          actor: lawyers['L001'].name
        },
        {
          id: 'event-2',
          type: 'modification',
          description: 'Actualización de prestaciones reclamadas',
          timestamp: '2024-03-20 11:15 AM',
          actor: lawyers['L001'].name
        }
      ],
      collaborators: [
        {
          id: 'L001',
          name: lawyers['L001'].name,
          avatar: 'https://placehold.co/100x100/png',
          role: 'Abogado Principal',
          lastActive: '2024-03-20 11:30 AM'
        }
      ],
      activities: [
        {
          id: 'activity-1',
          type: 'edit',
          description: 'Revisión inicial completada',
          timestamp: '2024-03-20 10:30 AM',
          user: lawyers['L001'].name
        }
      ]
    },
    caseStage: CaseStage.INITIAL,
    metadata: {
      caseNumber: 'LAB/2024/0123',
      createdAt: '2024-03-20',
      author: lawyers['L001'].name,
      lastModified: '2024-03-20',
      version: '1.0'
    }
  }
];

// Helper function to prepare files for workspace
export function prepareFilesForWorkspace(files: LibraryFile[]): LibraryFile[] {
  return files.map(file => ({
    ...file,
    workspace: {
      ...file.workspace,
      mainDocument: file,
      relatedDocuments: files.filter(f => 
        f.id !== file.id && 
        f.coreProperties.caseNumber === file.coreProperties.caseNumber
      )
    }
  }));
}

// Export prepared files
export const libraryFiles = prepareFilesForWorkspace(mockLibraryFiles);
