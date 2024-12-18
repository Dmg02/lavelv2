'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Download,
  FileText,
  Grid,
  Image as ImageIcon,
  Kanban,
  List,
  Share2,
} from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import { cn } from '@repo/design-system/lib/utils';
import { LibraryProvider, useLibrary } from './context/library-context';
import { SearchBar } from './components/search-bar';
import { Filters } from './components/filters';
import { FileCard } from './components/file-card';
import { UploadCard } from './components/upload-card';
import { DocumentWorkspaceDialog } from './components/document-workspace-dialog';
import type { ViewMode } from '@/types/library/view';
import { libraryFiles } from '@/data/library/files';
import { FileStatus } from '@/types/library/index';

const viewOptions = [
  { id: 'grid', icon: Grid, label: 'Grid' },
  { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
  { id: 'list', icon: List, label: 'List' },
  { id: 'board', icon: Kanban, label: 'Board' },
] as const;

function LibraryContent({ caseId }: { caseId?: string }) {
  const t = useTranslations('library');
  const { state, dispatch } = useLibrary();

  useEffect(() => {
    const loadFiles = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Load mock files
        dispatch({ type: 'SET_FILES', payload: libraryFiles });

        // Set up mock folder structure
        const mockFolders = [
          {
            id: 'folder-1',
            name: 'Case Documents',
            type: 'case' as const,
            files: libraryFiles.filter(f => !f.category.includes('evidence')),
            metadata: {
              caseNumber: 'CASE-2024-001',
              createdAt: '2024-01-01',
              modifiedAt: '2024-01-20',
              totalFiles: libraryFiles.length
            }
          },
          {
            id: 'folder-2',
            name: 'Evidence',
            type: 'evidence' as const,
            files: libraryFiles.filter(f => f.category.includes('evidence')),
            metadata: {
              createdAt: '2024-01-15',
              modifiedAt: '2024-01-16',
              totalFiles: libraryFiles.filter(f => f.category.includes('evidence')).length
            }
          }
        ];

        dispatch({ type: 'SET_FOLDERS', payload: mockFolders });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadFiles();
  }, [caseId, dispatch]);

  const filteredFiles = state.files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(state.searchTerm.toLowerCase());
    const matchesType = state.filters.types.length === 0 || state.filters.types.includes(file.type);
    const matchesStatus = state.filters.statuses.length === 0 || state.filters.statuses.includes(file.coreProperties.status);
    const matchesCategory = state.filters.categories.length === 0 || state.filters.categories.includes(file.category);
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const handleViewModeChange = (mode: ViewMode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  };

  const handleFileSelect = (fileId: string) => {
    const selectedFile = state.files.find(f => f.id === fileId);
    if (selectedFile) {
      dispatch({ type: 'SET_PREVIEW_FILE', payload: selectedFile });
    }
  };

  // Board view columns should match FileStatus enum
  const boardColumns = [
    { id: FileStatus.DRAFT, label: 'Draft' },
    { id: FileStatus.PENDING_REVIEW, label: 'Review' },
    { id: FileStatus.FINAL, label: 'Final' },
    { id: FileStatus.ARCHIVED, label: 'Archived' }
  ];

  if (state.error) {
    return (
      <div className="flex items-center justify-center h-full text-destructive">
        {t('messages.error')}
      </div>
    );
  }

  const renderContent = () => {
    switch (state.viewMode) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UploadCard />
            {filteredFiles.map(file => (
              <FileCard
                key={file.id}
                file={file}
                selected={file.id === state.selectedFile}
                onClick={() => handleFileSelect(file.id)}
              />
            ))}
          </div>
        );
      case 'gallery':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map(file => (
              <div
                key={file.id}
                className={cn(
                  'group relative aspect-[4/3] rounded-xl overflow-hidden',
                  'border border-border/50',
                  'bg-muted/30 cursor-pointer'
                )}
                onClick={() => handleFileSelect(file.id)}
              >
                {/* Preview based on file type */}
                <div className="absolute inset-0">
                  {file.contentPreview?.imageUrl ? (
                    <img
                      src={file.contentPreview.imageUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {/* Overlay with file info */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t from-black/60 to-black/0',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  'p-4 flex flex-col justify-end'
                )}>
                  <h3 className="text-white font-medium truncate">{file.name}</h3>
                  <p className="text-white/70 text-sm">{file.size}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'list':
        return (
          <div className="divide-y">
            {filteredFiles.map(file => (
              <div
                key={file.id}
                className="flex items-center justify-between py-4 hover:bg-accent/50 cursor-pointer"
                onClick={() => handleFileSelect(file.id)}
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'board':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {boardColumns.map(column => (
              <div key={column.id} className="space-y-4">
                <h3 className="font-medium text-lg capitalize">
                  {column.label}
                </h3>
                <div className="space-y-3">
                  {filteredFiles
                    .filter(file => file.coreProperties.status === column.id)
                    .map(file => (
                      <FileCard
                        key={file.id}
                        file={file}
                        selected={file.id === state.selectedFile}
                        onClick={() => handleFileSelect(file.id)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r">
        <Filters />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2">
            {viewOptions.map(({ id, icon: Icon, label }) => (
              <Button
                key={id}
                variant={state.viewMode === id ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => handleViewModeChange(id as ViewMode)}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1">
          {state.isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>

      {/* Document Workspace Dialog */}
      <DocumentWorkspaceDialog
        file={state.previewFile}
        isOpen={!!state.previewFile}
        onClose={() => dispatch({ type: 'SET_PREVIEW_FILE', payload: null })}
      />
    </div>
  );
}

export function LibraryExplorer({ caseId }: { caseId?: string }) {
  return (
    <LibraryProvider>
      <LibraryContent caseId={caseId} />
    </LibraryProvider>
  );
} 
