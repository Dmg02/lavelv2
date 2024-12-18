'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@repo/design-system/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
} from '@repo/design-system/components/ui/drawer';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/design-system/components/ui/tabs';
import { useMediaQuery } from '@repo/design-system/hooks/use-media-query';
import { cn } from '@repo/design-system/lib/utils';
import {
  Brain,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  File,
  FileStack,
  FileText,
  Hash,
  History,
  Image as ImageIcon,
  Info,
  MessageSquare,
  PanelRightClose,
  Play,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { libraryDemoEs as t } from '../translations/es';
import type { DemoLibraryFile } from '../translations/es';
import { DocumentPreview } from './document-preview';

// Define breakpoint for mobile/tablet
const MOBILE_BREAKPOINT = '(max-width: 1024px)';

// Add type helper for mutable types
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U>
    ? U[]
    : Mutable<T[P]>;
};

interface SmartPreviewProps {
  file: Mutable<DemoLibraryFile>;
  isOpen: boolean;
  onClose: () => void;
}

export function SmartPreview({ file, isOpen, onClose }: SmartPreviewProps) {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  // Handle tab scroll
  const handleTabScroll = (element: HTMLElement) => {
    if (!element) return;
    setCanScrollLeft(element.scrollLeft > 0);
    setCanScrollRight(
      element.scrollLeft < element.scrollWidth - element.clientWidth
    );
  };

  // Check scroll possibility on mount and resize
  useEffect(() => {
    const checkScroll = () => {
      const tabsList = document.querySelector(
        '[role="tablist"]'
      ) as HTMLElement;
      if (tabsList) {
        handleTabScroll(tabsList);
      }
    };

    // Initial check after a short delay to ensure content is rendered
    const timer = setTimeout(checkScroll, 100);

    // Check on window resize
    window.addEventListener('resize', checkScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [isOpen]); // Re-run when modal opens

  const scrollTabs = (direction: 'left' | 'right') => {
    const tabsList = document.querySelector('[role="tablist"]') as HTMLElement;
    if (!tabsList) return;

    const scrollAmount = 200;
    const newScrollLeft =
      direction === 'left'
        ? tabsList.scrollLeft - scrollAmount
        : tabsList.scrollLeft + scrollAmount;

    tabsList.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  // Function to render file preview based on type
  const renderPreview = () => {
    switch (file.type) {
      case 'pdf':
      case 'doc':
        return <DocumentPreview file={file} />;
      case 'image':
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
      case 'video':
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
                <p className="mt-4 text-white/70">
                  Video preview not available
                </p>
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

  // Shared file info content component
  const FileInfoContent = () => (
    <div className="space-y-6">
      {/* File Info */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 font-medium">
          <Info className="h-4 w-4" />
          {t.fileInfo.sections.details.title}
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {t.fileInfo.sections.details.lastModified}: {file.lastModified}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {t.fileInfo.sections.details.fileSize}: {file.size}
            </span>
          </div>
          {file.case && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="h-4 w-4" />
              <span>
                {t.fileInfo.sections.details.caseNumber}: {file.case}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 font-medium">
          <Hash className="h-4 w-4" />
          {t.fileInfo.sections.details.tags}
        </h4>
        <div className="flex flex-wrap gap-2">
          {file.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/5 hover:bg-primary/10"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Related Files */}
      {file.relatedFiles && (
        <div className="space-y-4">
          <h4 className="flex items-center gap-2 font-medium">
            <FileStack className="h-4 w-4" />
            {t.fileInfo.sections.relatedFiles.title}
          </h4>
          <div className="space-y-2">
            {file.relatedFiles.map((related) => (
              <Button
                key={related.id}
                variant="ghost"
                className="h-auto w-full justify-start gap-3 py-2"
              >
                <FileText className="h-4 w-4 shrink-0" />
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm">{related.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {Math.round(related.relevance * 100)}%{' '}
                    {t.fileInfo.sections.relatedFiles.relevance}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const PreviewContent = () => (
    <div className="relative flex h-full">
      {/* Main Content Area */}
      <div
        className={cn(
          'flex h-full flex-1 flex-col',
          'transition-all duration-300 ease-in-out',
          !isMobile && showSidebar ? 'mr-80' : 'mr-0'
        )}
      >
        {/* Top Bar */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-4 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5" />
            <h3 className="truncate font-medium">{file.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title={t.actions.download}>
              <Download className="h-4 w-4" />
            </Button>
            {!isMobile && (
              <>
                <Button variant="ghost" size="icon" title={t.actions.share}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <div className="h-4 w-px bg-border/50" />
              </>
            )}
            {!isMobile && !showSidebar && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(true)}
                className="hover:bg-transparent"
              >
                <PanelRightClose className="h-4 w-4 rotate-180" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Split View Container */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Document Preview */}
          <div
            className={cn(
              'overflow-hidden border-b',
              isMobile ? 'min-h-[40vh] flex-1' : 'h-[400px]'
            )}
          >
            {renderPreview()}
          </div>

          {/* Bottom Tabs Section */}
          <div
            className={cn(
              'flex flex-col bg-muted/5',
              isMobile ? 'h-[45vh]' : 'h-[300px]'
            )}
          >
            <Tabs
              defaultValue={isMobile ? 'ai-insights' : 'ai-insights'}
              className="flex h-full flex-col"
            >
              <div className="relative flex shrink-0 items-center border-b px-1">
                {isMobile && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'absolute left-0 z-10 aspect-square h-full rounded-none bg-gradient-to-r from-background/80 to-background/0 px-1',
                        !canScrollLeft && 'pointer-events-none opacity-0'
                      )}
                      onClick={() => scrollTabs('left')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'absolute right-0 z-10 aspect-square h-full rounded-none bg-gradient-to-l from-background/80 to-background/0 px-1',
                        !canScrollRight && 'pointer-events-none opacity-0'
                      )}
                      onClick={() => scrollTabs('right')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <TabsList
                  className="scrollbar-none mx-6 h-12 w-full overflow-x-auto"
                  onScroll={(e) => handleTabScroll(e.currentTarget)}
                >
                  <div className="flex min-w-full items-center gap-1 px-1">
                    <TabsTrigger
                      value="ai-insights"
                      className="min-w-fit gap-1.5 px-3"
                    >
                      <Brain className="h-3.5 w-3.5" />
                      <span className="truncate">{t.tabs.aiInsights}</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="changes"
                      className="min-w-fit gap-1.5 px-3"
                    >
                      <History className="h-3.5 w-3.5" />
                      <span className="truncate">{t.tabs.changes}</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="comments"
                      className="min-w-fit gap-1.5 px-3"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span className="truncate">{t.tabs.comments}</span>
                    </TabsTrigger>
                    {isMobile && (
                      <TabsTrigger
                        value="file-info"
                        className="min-w-fit gap-1.5 px-3"
                      >
                        <Info className="h-3.5 w-3.5" />
                        <span className="truncate">{t.fileInfo.title}</span>
                      </TabsTrigger>
                    )}
                  </div>
                </TabsList>
              </div>

              {/* Tab content */}
              <div className="min-h-0 flex-1">
                <ScrollArea className="h-full">
                  {isMobile && (
                    <TabsContent
                      value="file-info"
                      className="m-0 p-6 data-[state=active]:block"
                    >
                      <FileInfoContent />
                    </TabsContent>
                  )}

                  <TabsContent
                    value="ai-insights"
                    className="m-0 p-6 data-[state=active]:block"
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* AI Summary */}
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 font-medium">
                          <Brain className="h-4 w-4" />
                          {t.fileInfo.sections.aiSummary.summary}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {file.aiSummary?.summary}
                        </p>
                      </div>

                      {/* Key Points */}
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 font-medium">
                          <Sparkles className="h-4 w-4" />
                          {t.fileInfo.sections.aiSummary.keyPoints}
                        </h4>
                        <ul className="space-y-2">
                          {file.aiSummary?.keyPoints?.map((point, i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-muted-foreground text-sm"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="changes"
                    className="m-0 p-6 data-[state=active]:block"
                  >
                    <div className="space-y-4">
                      {file.workspace?.timeline?.map((event) => (
                        <div key={event.id} className="flex gap-3 text-sm">
                          <History className="mt-1 h-4 w-4 shrink-0" />
                          <div>
                            <p>{event.description}</p>
                            <p className="text-muted-foreground text-xs">
                              {event.actor} • {event.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      {!file.workspace?.timeline && (
                        <div className="text-muted-foreground text-sm">
                          No changes available
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="comments"
                    className="m-0 p-6 data-[state=active]:block"
                  >
                    <div className="space-y-4">
                      {file.workspace?.comments?.map((comment) => (
                        <div key={comment.id} className="flex gap-3 text-sm">
                          <MessageSquare className="mt-1 h-4 w-4 shrink-0" />
                          <div>
                            <p>{comment.content}</p>
                            <p className="text-muted-foreground text-xs">
                              {comment.author} • {comment.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      {!file.workspace?.comments && (
                        <div className="text-muted-foreground text-sm">
                          No comments available
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </ScrollArea>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Desktop Only */}
      {!isMobile && (
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-80',
            'flex flex-col border-l bg-muted/10',
            'transition-all duration-300 ease-in-out',
            showSidebar ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Sidebar Header with Toggle */}
          <div className="flex items-center justify-between border-b p-4">
            <h4 className="font-medium">{t.fileInfo.title}</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(false)}
              className="hover:bg-transparent"
            >
              <PanelRightClose className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6">
              <FileInfoContent />
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="h-[95vh]">
          <PreviewContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-7xl overflow-hidden p-0 [&>button]:hidden">
        <PreviewContent />
      </DialogContent>
    </Dialog>
  );
}
