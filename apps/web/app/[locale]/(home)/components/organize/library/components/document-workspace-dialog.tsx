'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@repo/design-system/components/ui/dialog';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/design-system/components/ui/tabs';
import {
  Brain,
  Calendar,
  Clock,
  Download,
  File,
  FileStack,
  FileText,
  Hash,
  History,
  Image as ImageIcon,
  Info,
  MessageSquare,
  Play,
  Share2,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { LibraryFile } from '@/types/library';
import { FileType } from '@/types/library';

interface DocumentWorkspaceDialogProps {
  file: LibraryFile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentWorkspaceDialog({ file, isOpen, onClose }: DocumentWorkspaceDialogProps) {
  const t = useTranslations('library');

  if (!file) return null;

  const renderPreview = () => {
    switch (file.type) {
      case FileType.PDF:
      case FileType.DOC:
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <pre className="whitespace-pre-wrap text-sm">
              {file.contentPreview?.text || t('ui.workspace.noPreview')}
            </pre>
          </div>
        );
      case FileType.IMAGE:
        return (
          <div className="flex h-full items-center justify-center rounded-lg bg-black/5">
            {file.contentPreview?.imageUrl ? (
              <img
                src={file.contentPreview.imageUrl}
                alt={file.name}
                className="max-h-full object-contain"
              />
            ) : (
              <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
            )}
          </div>
        );
      case FileType.VIDEO:
        return (
          <div className="flex h-full items-center justify-center rounded-lg bg-black">
            {file.contentPreview?.videoUrl ? (
              <video
                src={file.contentPreview.videoUrl}
                controls
                className="max-h-full"
              />
            ) : (
              <div className="text-center">
                <Play className="mx-auto h-16 w-16 text-white/50" />
                <p className="mt-4 text-white/70">Video preview not available</p>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex h-full items-center justify-center">
            <File className="h-16 w-16 text-muted-foreground/50" />
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <div className="flex h-full">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 border-b bg-background z-10">
            <div>
              <h2 className="text-lg font-medium">{file.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>{t(`ui.fileTypes.${file.type}`)}</span>
                <span>•</span>
                <span>{file.size}</span>
                <span>•</span>
                <span>Expediente: {file.metadata.caseNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 mt-20">
            {/* Document Preview */}
            <div className="flex-1 p-6 border-r">
              {renderPreview()}
            </div>

            {/* Info Panel */}
            <div className="w-80">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* File Info */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-medium">
                      <Info className="h-4 w-4" />
                      {t('ui.workspace.fileInfo')}
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Modificado: {file.metadata.lastModified}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Autor: {file.metadata.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Hash className="h-4 w-4" />
                        <span>Versión: {file.metadata.version}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Related Files */}
                  {file.smartPreview?.relatedFiles && (
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-medium">
                        <FileStack className="h-4 w-4" />
                        {t('ui.workspace.relatedFiles')}
                      </h4>
                      <div className="space-y-2">
                        {file.smartPreview.relatedFiles.map((related) => (
                          <Button
                            key={related.id}
                            variant="ghost"
                            className="h-auto w-full justify-start gap-3 py-2"
                          >
                            <FileText className="h-4 w-4 shrink-0" />
                            <div className="min-w-0 flex-1 text-left">
                              <p className="truncate text-sm">{related.name}</p>
                              <p className="text-muted-foreground text-xs">
                                {Math.round(related.relevance * 100)}% {t('ui.workspace.relevance')}
                              </p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="absolute bottom-0 left-0 right-0 border-t bg-background">
            <Tabs defaultValue="ai-insights" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="ai-insights"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  IA Insights
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                >
                  <History className="h-4 w-4 mr-2" />
                  Cambios
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comentarios
                </TabsTrigger>
              </TabsList>

              <div className="p-4 h-48">
                <TabsContent value="ai-insights" className="m-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Resumen</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {file.smartPreview?.aiSummary?.summary || t('ui.workspace.noSummary')}
                      </p>
                    </div>
                    {file.smartPreview?.aiSummary?.keyPoints && (
                      <div>
                        <h3 className="text-sm font-medium">Puntos Clave</h3>
                        <ul className="mt-1 space-y-1">
                          {file.smartPreview.aiSummary.keyPoints.map((point, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="m-0">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {file.workspace?.timeline.map((event) => (
                        <div key={event.id} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <History className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm">{event.description}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{event.actor}</span>
                              <span>•</span>
                              <span>{event.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="comments" className="m-0">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {file.workspace?.notes.map((note) => (
                        <div key={note.id} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm">{note.content}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{note.author}</span>
                              <span>•</span>
                              <span>{note.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 