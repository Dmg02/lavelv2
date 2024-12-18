'use client';

import { useTranslations } from 'next-intl';
import { Upload } from 'lucide-react';
import { cn } from '@repo/design-system/lib/utils';

export function UploadCard() {
  const t = useTranslations('library');
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // TODO: Implement file upload logic
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        'group relative p-6 rounded-xl cursor-pointer',
        'border-2 border-dashed hover:border-primary/40',
        'bg-gradient-to-br from-background to-muted/10',
        'flex flex-col items-center justify-center gap-4',
        'min-h-[200px] transition-all duration-200'
      )}
    >
      <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
        <Upload className="h-6 w-6 text-primary" />
      </div>
      <div className="text-center">
        <p className="font-medium text-primary">
          {t('ui.actions.upload')}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Drag & drop files here or click to browse
        </p>
      </div>
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        multiple
        onChange={(e) => {
          // TODO: Implement file upload logic
          console.log(e.target.files);
        }}
      />
    </div>
  );
} 