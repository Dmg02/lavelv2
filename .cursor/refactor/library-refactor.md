# Library Component Implementation Guide

## Introduction

This guide outlines the complete process for refactoring our library component to implement a hybrid approach for handling data and translations. We'll leverage existing mock data from our cases and lawyers while maintaining a clear separation between static data and translatable UI elements.

## Architecture Overview

Our library component uses a three-layer architecture:

1. Mock Data Layer: Handles all static data, integrating with our existing case and lawyer data.
2. Translation Layer: Manages all user-facing text, supporting multiple languages.
3. State Management Layer: Coordinates data flow using React's Context API.

## Project Structure

Our implementation will follow this directory structure:
```
/apps/web/
├── data/
│   └── library/
│       ├── mock-data.ts      # Transforms from existing mock data
│       └── utils.ts          # Data utility functions
├── types/
│   └── library/
│       ├── index.ts          # Core type definitions
│       ├── mock.ts           # Mock data types
│       └── translations.ts   # Translation types
├── i18n/
│   └── components/
│       └── library/
│           ├── en.json       # English translations
│           └── es.json       # Spanish translations
└── app/
    └── [locale]/
        └── (home)/
            └── components/
                └── organize/
                    └── library/
                        ├── context/        # State management
                        ├── components/     # Sub-components
                        └── library-explorer.tsx
```

## Implementation Process

### Phase 1: Foundation and Analysis

#### Step 1: Data Analysis
First, examine our existing data structures in `/data/cases.ts` and `/data/lawyers.ts`. Look for:
- Document structure and metadata
- Relationships between entities
- Fields that need translation
- Common patterns and types

#### Step 2: Type System Setup
Create the core type definitions in `/types/library/index.ts`:

```typescript
// Core enums based on existing data patterns
export enum FileType {
  PDF = 'pdf',
  DOC = 'doc',
  VIDEO = 'video',
  AUDIO = 'audio',
  IMAGE = 'image',
  TRANSCRIPT = 'transcript'
}

// Status types inferred from case data
export enum FileStatus {
  DRAFT = 'draft',
  FINAL = 'final',
  ARCHIVED = 'archived',
  PENDING_REVIEW = 'pending_review'
}

// Document categories from existing case types
export enum DocumentCategory {
  PLEADING = 'pleading',
  EVIDENCE = 'evidence',
  DISCOVERY = 'discovery',
  CORRESPONDENCE = 'correspondence',
  MOTION = 'motion',
  TRANSCRIPT = 'transcript',
  EXHIBIT = 'exhibit',
  CONTRACT = 'contract',
  CUSTOM = 'custom'
}

// Core interfaces
export interface CoreMetadata {
  caseNumber?: string;
  filingDate?: string;
  dueDate?: string;
  author: string;
  lastModified: string;
  version: string;
}

export interface ContentPreview {
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
}
```

Create mock data types in `/types/library/mock.ts`:

```typescript
import type { Case } from '@/types/shared/case';
import type { Lawyer } from '@/types/shared/lawyer';
import type {
  FileType,
  FileStatus,
  DocumentCategory,
  CoreMetadata,
  ContentPreview
} from './index';

export interface MockFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  status: FileStatus;
  category: DocumentCategory;
  metadata: CoreMetadata;
  contentPreview?: ContentPreview;
  tags: string[];
  caseId: Case['id'];
  assignedLawyers: Array<Lawyer['id']>;
}
```

### Phase 2: Data Layer Setup

#### Step 3: Data Transformation
Create `/data/library/utils.ts` to handle data transformation:

```typescript
import { cases } from '@/data/cases';
import { lawyers } from '@/data/lawyers';
import type { MockFile } from '@/types/library/mock';

export const libraryUtils = {
  transformCaseDocuments(caseData: Case): MockFile[] {
    return caseData.documents.map(doc => ({
      id: doc.id,
      name: doc.title,
      type: this.determineFileType(doc.type),
      size: doc.size,
      status: this.determineFileStatus(doc.status),
      category: this.determineDocumentCategory(doc.type),
      metadata: {
        caseNumber: caseData.caseNumber,
        author: this.getAuthorName(doc.authorId),
        lastModified: doc.lastModified,
        version: doc.version
      },
      caseId: caseData.id,
      assignedLawyers: caseData.assignedLawyerIds,
    }));
  },

  getAuthorName(lawyerId: string): string {
    const lawyer = lawyers[lawyerId];
    return lawyer ? `${lawyer.firstName} ${lawyer.lastName}` : 'Unknown';
  },

  // Add type determination helpers...
}
```

### Phase 3: State Management Implementation

#### Step 4: Context Setup
Create `/app/[locale]/(home)/components/organize/library/context/library-context.tsx`:

```typescript
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { MockFile } from '@/types/library/mock';

interface LibraryState {
  files: MockFile[];
  selectedFile: string | null;
  filters: FilterState;
  viewMode: ViewMode;
  searchTerm: string;
  currentCase?: string;
  isLoading: boolean;
  error: string | null;
}

type LibraryAction =
  | { type: 'SET_FILES'; payload: MockFile[] }
  | { type: 'SELECT_FILE'; payload: string | null }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

function libraryReducer(state: LibraryState, action: LibraryAction): LibraryState {
  switch (action.type) {
    case 'SET_FILES':
      return {
        ...state,
        files: action.payload,
        isLoading: false,
      };
    // Add other cases...
  }
}

export const LibraryContext = createContext<{
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
} | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(libraryReducer, initialState);
  
  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
}
```

### Phase 4: Translation Integration

#### Step 5: Translation Setup
Create `/i18n/components/library/en.json`:

```json
{
  "ui": {
    "search": {
      "placeholder": "Search files..."
    },
    "fileTypes": {
      "pdf": "PDF Document",
      "doc": "Word Document",
      "video": "Video Recording"
    },
    "status": {
      "draft": "Draft",
      "final": "Final",
      "archived": "Archived"
    },
    "actions": {
      "upload": "Upload Files",
      "download": "Download",
      "share": "Share"
    }
  }
}
```

### Phase 5: Component Implementation

#### Step 6: Core Components
Example of FileCard component:

```typescript
interface FileCardProps {
  file: MockFile;
  selected?: boolean;
  onClick?: () => void;
}

export function FileCard({ file, selected, onClick }: FileCardProps) {
  const t = useTranslations('library');
  
  return (
    <div 
      className={cn(
        'relative p-4 rounded-xl border',
        selected && 'border-primary'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <FileIcon type={file.type} />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{file.name}</h3>
          <p className="text-sm text-muted-foreground">
            {t.ui.fileTypes[file.type]}
          </p>
        </div>
      </div>
    </div>
  );
}
```

#### Step 7: Main Component
Implement LibraryExplorer:

```typescript
export function LibraryExplorer({ caseId }: { caseId?: string }) {
  const t = useTranslations('library');
  const { state, dispatch } = useLibrary();
  
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const files = caseId 
        ? libraryUtils.getCaseFiles(caseId)
        : libraryUtils.getLawyerFiles(currentUserId);
        
      dispatch({ type: 'SET_FILES', payload: files });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [caseId]);
  
  // Implement render logic...
}
```

### Phase 6: Testing

1. Type Safety Testing:
   - Test type inference from existing data
   - Verify transformation functions maintain types
   - Check component prop type safety

2. Integration Testing:
   - Test data flow through components
   - Verify state updates work correctly
   - Check translation rendering

3. UI Testing:
   - Test different view modes
   - Verify filter and search functionality
   - Test file selection and preview

## Implementation Notes

1. Always start with types when adding new features
2. Use existing data structures where possible
3. Keep translations and static data separate
4. Test each layer independently before integration

## Common Pitfalls to Avoid

1. Mixing static data with translations
2. Incomplete type coverage
3. Inconsistent state updates
4. Missing translation keys

Would you like more detail about any particular phase or specific implementation examples?