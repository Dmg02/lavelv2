'use client';

import { cn } from '@repo/design-system/lib/utils';
import { motion } from 'framer-motion';
import type React from 'react';

interface DemoContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function DemoContainer({ children, className }: DemoContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={cn('relative', className)}
    >
      <div className="-z-10 absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 via-primary/20 to-transparent blur-xl" />
      <div
        className={cn(
          'relative z-10 overflow-hidden rounded-2xl shadow-2xl',
          'bg-background/95 backdrop-blur-sm',
          'border border-border/50',
          'max-h-[700px]' // Consistent max height for all demos
        )}
      >
        <div className="h-full w-full overflow-auto">{children}</div>
      </div>
    </motion.div>
  );
}
