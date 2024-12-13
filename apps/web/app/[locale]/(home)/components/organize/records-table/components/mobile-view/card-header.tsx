'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { cn } from '@repo/design-system/lib/utils';
import type { Case } from '@/types/shared/case';
import { CaseStatus } from '@/types/shared/case';

interface CardHeaderProps {
  data: Case;
}

export function CardHeader({ data }: CardHeaderProps) {
  const t = useTranslations('organize');

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Primary Info: Case Number & Status */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          {data.favorite && (
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          )}
          <span className="text-base font-medium">
            {data.caseNumber}
          </span>
        </div>
        <Badge
          variant="secondary"
          className={cn(
            "px-3 py-1 text-sm font-medium",
            data.status === CaseStatus.ACTIVE ? 'bg-success/10 text-success' :
            data.status === CaseStatus.INACTIVE ? 'bg-destructive/10 text-destructive' :
            'bg-muted text-muted-foreground'
          )}
        >
          {data.status}
        </Badge>
      </div>

      {/* Stage & Type */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          <span className="text-sm text-muted-foreground">
            {data.stage}
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          {data.lawBranch}
        </Badge>
      </div>

      {/* Parties */}
      <div className="text-sm">
        <span className="font-medium">{data.plaintiff}</span>
        <span className="text-muted-foreground mx-2">{t('records.labels.vs')}</span>
        <span className="font-medium">{data.defendant}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>{data.courthouse}</span>
      </div>
    </div>
  );
}