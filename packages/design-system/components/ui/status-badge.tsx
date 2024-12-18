'use client';

import { Badge } from './badge';
import { cn } from '../../lib/utils';

type StatusType = 'risk' | 'priority' | 'stage';
type StatusValue = string | undefined | null;

interface StatusBadgeProps {
  type: StatusType;
  value: StatusValue;
  className?: string;
}

const STATUS_CONFIGS: Record<StatusType, Record<string, { translations: string[], style: string }>> = {
  risk: {
    high: {
      translations: ['high', 'alto'],
      style: 'bg-destructive/15 text-destructive border-destructive/30 font-medium'
    },
    medium: {
      translations: ['medium', 'medio'],
      style: 'bg-warning/15 text-warning border-warning/30 font-medium'
    },
    low: {
      translations: ['low', 'bajo'],
      style: 'bg-success/15 text-success border-success/30 font-medium'
    }
  },
  priority: {
    high: {
      translations: ['high', 'alta'],
      style: 'bg-destructive/15 text-destructive border-destructive/30 font-medium'
    },
    medium: {
      translations: ['medium', 'media'],
      style: 'bg-warning/15 text-warning border-warning/30 font-medium'
    },
    low: {
      translations: ['low', 'baja'],
      style: 'bg-success/15 text-success border-success/30 font-medium'
    }
  },
  stage: {
    completed: {
      translations: ['completed', 'completado'],
      style: 'bg-success/15 text-success border-success/30 font-medium'
    },
    'in-progress': {
      translations: ['in progress', 'en proceso'],
      style: 'bg-warning/15 text-warning border-warning/30 font-medium'
    },
    pending: {
      translations: ['pending', 'pendiente'],
      style: 'bg-muted text-muted-foreground border-muted-foreground/30 font-medium'
    }
  }
};

function getStatusStyle(type: StatusType, value: StatusValue): string {
  if (!value) return 'bg-muted text-muted-foreground';

  const normalizedValue = value.toLowerCase();
  const config = STATUS_CONFIGS[type];

  for (const [, { translations, style }] of Object.entries(config)) {
    if (translations.includes(normalizedValue)) {
      return style;
    }
  }

  return 'bg-muted text-muted-foreground';
}

export function StatusBadge({ type, value, className }: StatusBadgeProps) {
  if (!value) return null;

  const badgeStyle = getStatusStyle(type, value);

  return (
    <Badge 
      className={cn(badgeStyle, className)}
      variant="outline"
    >
      {value}
    </Badge>
  );
} 