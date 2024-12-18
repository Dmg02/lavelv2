'use client';

import { Dialog, DialogContent } from '@repo/design-system/components/ui/dialog';
import { useTranslations } from 'next-intl';
import { FileText, Image as ImageIcon, Play, X } from 'lucide-react';
import { FileType } from '@/types/library/index';
import { LibraryFile } from '@/types/library/index';

interface FilePreviewProps {
  file: LibraryFile | null;
  onClose: () => void;
}

export function FilePreview({ file, onClose }: FilePreviewProps) {
  const t = useTranslations('library');

  if (!file) return null;

  const renderPreview = () => {
    switch (file.type) {
      case FileType.IMAGE:
        return file.contentPreview?.imageUrl ? (
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${file.contentPreview.imageUrl})` }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="h-16 w-16 text-muted-foreground" />
          </div>
        );
      case FileType.PDF:
      case FileType.DOC:
        return (
          <div className="p-6 text-sm text-muted-foreground">
            {file.contentPreview?.text || t('ui.workspace.noPreview')}
          </div>
        );
      case FileType.VIDEO:
        return file.contentPreview?.videoUrl ? (
          <video
            src={file.contentPreview.videoUrl}
            controls
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Play className="h-16 w-16 text-muted-foreground" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <FileText className="h-16 w-16 text-muted-foreground" />
          </div>
        );
    }
  };

  return (
    <Dialog open={!!file} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium">{file.name}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{t(`ui.fileTypes.${file.type}`)}</span>
              <span>•</span>
              <span>{file.size}</span>
              <span>•</span>
              <span>Modified {file.metadata.lastModified}</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            {renderPreview()}
          </div>
          
          <div className="px-6 py-4 border-t bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Author: {file.metadata.author}
                </span>
                <span className="text-sm text-muted-foreground">
                  Version: {file.metadata.version}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Add action buttons here */}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 