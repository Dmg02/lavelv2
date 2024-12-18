'use client';

import { cn } from '@repo/design-system/lib/utils';
import type { DemoLibraryFile } from '../translations/es';

interface DocumentPreviewProps {
  file: DemoLibraryFile;
  className?: string;
}

export function DocumentPreview({ file, className }: DocumentPreviewProps) {
  const previewText = file.contentPreview?.text ?? 'No preview available';

  return (
    <div
      className={cn(
        'h-full overflow-auto bg-white dark:bg-zinc-900',
        className
      )}
    >
      <div className="p-8">
        <pre
          className={cn(
            'font-mono text-[13px] leading-relaxed',
            'text-zinc-900 dark:text-zinc-100',
            'whitespace-pre-wrap'
          )}
        >
          {previewText}
        </pre>
      </div>
    </div>
  );
}
