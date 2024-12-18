'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/design-system/components/ui/tabs';
import { cn } from '@repo/design-system/lib/utils';
import { FileText, History, Plus, Send } from 'lucide-react';
import type { LibraryFile } from '@/types/library';
interface DocumentWorkspaceProps {
  file: LibraryFile;
}

export function DocumentWorkspace({ file }: DocumentWorkspaceProps) {
  return (
    
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Document Preview */}
        <div className="min-h-0 flex-1 border-b p-6">
          <div className="flex h-full items-center justify-center rounded-lg border bg-muted/30">
            {/* File type specific preview implementation */}
            <div className="text-muted-foreground">Document Preview</div>
          </div>
        </div>

        
        {/* Notes and Comments */}
        <div className="flex h-80 flex-col">
          <Tabs defaultValue="notes" className="flex-1">
            <div className="border-b px-4">
              <TabsList>
                <TabsTrigger value="aiSummary">AI Summary</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="notes" className="mt-0 flex-1">
              <ScrollArea className="h-full">
                <div className="space-y-4 p-4">
                  {file.workspace?.notes.map((note) => (
                    <div key={note.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {note.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">
                            {note.author}
                          </span>
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {note.timestamp}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {note.content}
                      </p>
                      {note.attachments && note.attachments.length > 0 && (
                        <div className="flex gap-2">
                          {note.attachments.map((attachment) => (
                            <Badge key={attachment} variant="secondary">
                              {attachment}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input placeholder="Add a note..." className="flex-1" />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-0 flex-1">
              {/* Comments implementation */}
            </TabsContent>

            <TabsContent value="history" className="mt-0 flex-1">
              <ScrollArea className="h-full">
                <div className="space-y-4 p-4">
                  {file.workspace?.timeline.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full',
                          'bg-muted'
                        )}
                      >
                        <History className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p>{event.description}</p>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
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
          </Tabs>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex w-80 flex-col border-l">
        {/* File Info */}
        <div className="border-b p-6">
          <h3 className="mb-4 font-medium">File Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm">Case</label>
              <p className="font-medium">{file.metadata.caseNumber}</p>
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm">
                Last Modified
              </label>
              <p className="font-medium">{file.metadata.lastModified}</p>
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm">Size</label>
              {/* <p className="font-medium">{file.metadata.size}</p> */}
            </div>
          </div>
        </div>

        {/* Collaborators */}
        <div className="border-b p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Collaborators</h3>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {file.workspace?.collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={collaborator.avatar} />
                  <AvatarFallback>
                    {collaborator.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">
                    {collaborator.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {collaborator.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Files */}
        <div className="flex-1 p-6">
          <h3 className="mb-4 font-medium">Related Files</h3>
          <ScrollArea className="h-full">
            <div className="space-y-3 pr-4">
              {file.smartPreview?.relatedFiles.map((related) => (
                <Button
                  key={related.id}
                  variant="ghost"
                  className="w-full justify-start gap-3"
                >
                  <FileText className="h-4 w-4" />
                  <span className="truncate">{related.name}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
