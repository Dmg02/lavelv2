// apps/web/app/[locale]/(home)/components/organize/records-table/components/table-columns.tsx

import { Star, StarOff } from 'lucide-react';
import { Button } from "@repo/design-system/components/ui/button";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/design-system/components/ui/avatar";
import { cn } from "@repo/design-system/lib/utils";
import type { ColumnDef } from '../types/columns';

export const createColumns = (t: any): ColumnDef[] => [
  {
    key: 'favorite',
    title: t('favorite'),
    width: '48px',
    align: 'center',
    render: (item) => (
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "h-8 w-8 rounded-full",
          "hover:bg-yellow-50 dark:hover:bg-yellow-500/10",
          "transition-colors duration-200"
        )}
      >
        {item.favorite ? (
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ) : (
          <StarOff className="h-4 w-4 text-muted-foreground/50" />
        )}
      </Button>
    )
  },
  {
    key: 'caseNumber',
    title: t('caseNumber'),
    render: (item) => (
      <span className="font-medium text-foreground">
        {item.caseNumber}
      </span>
    )
  },
  // Add other column definitions...
];