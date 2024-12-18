'use client';

import { cn } from "@repo/design-system/lib/utils";
import { FileText, Image, Video, FileAudio, FileIcon, Download, Trash2, MoreVertical, Eye, Clock, Calendar } from 'lucide-react';
import { Badge } from '@repo/design-system/components/ui/badge';
import type { LibraryFile } from '@/types/library';
import { FileType } from '@/types/library';
import { Button } from '@repo/design-system/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@repo/design-system/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { libraryUtils } from '@/data/library/utils';
import { formatDate } from 'date-fns';

interface FileCardProps {
  file: LibraryFile;
  selected?: boolean;
  onClick?: () => void;
}

const FileTypeIcon = ({ type }: { type: FileType }) => {
  switch (type) {
    case FileType.PDF:
    case FileType.DOC:
      return <FileText className="h-5 w-5" />;
    case FileType.IMAGE:
      return <Image className="h-5 w-5" />;
    case FileType.VIDEO:
      return <Video className="h-5 w-5" />;
    case FileType.AUDIO:
      return <FileAudio className="h-5 w-5" />;
    default:
      return <FileIcon className="h-5 w-5" />;
  }
};

export function FileCard({ file, onClick }: FileCardProps) {
  const Icon = FileTypeIcon({ type: file.type });
  const { determineFileType } = libraryUtils;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        'group relative cursor-pointer rounded-lg p-4',
        'border border-border',
        'bg-card',
        'hover:bg-muted dark:hover:bg-hover',
        'transition-all duration-200 ease-in-out'
      )}
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Primary Information */}
        <div className="flex items-start gap-3">
          {/* File Type Icon */}
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center',
              'rounded-lg',
              'bg-primary/5',
              'text-primary'
            )}
          >
            {Icon}
          </div>

          {/* Title and Type */}
          <div className="min-w-0 flex-1">
            <h3 className="mb-2 truncate font-medium text-base">{file.name}</h3>
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary"
            >
              {determineFileType(file.type)}
            </Badge>
          </div>
        </div>

        {/* Document Metadata */}
        <div className="space-y-3 text-sm">
          {/* Dates Section */}
          <div className="space-y-1.5">
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              Fechas
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Fecha:</span>
                <span>{formatDate(file.metadata.createdAt || '', 'dd/MM/yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Modificado:</span>
                <span>{formatDate(file.metadata.lastModified || '', 'dd/MM/yyyy')}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between border-border/50 border-t pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={onClick}
            >
              <Eye className="mr-2 h-3.5 w-3.5" />
              Ver documento
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Más acciones</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Descargar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  );
}