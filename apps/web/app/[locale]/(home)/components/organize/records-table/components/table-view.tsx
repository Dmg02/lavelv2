// apps/web/app/[locale]/(home)/components/organize/records-table/components/table-view.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Star, StarOff } from 'lucide-react';
import { Button } from "@repo/design-system/components/ui/button";
import { cn } from "@repo/design-system/lib/utils";
import type { ColumnVisibility } from '../types';
import type { Case } from '@/types/shared/case';
import { CaseStatus } from '@/types/shared/case';

interface TableViewProps {
  data: Case[];
  columnVisibility: ColumnVisibility;
}

type ColumnKey = keyof ColumnVisibility;

export function TableView({ data, columnVisibility }: TableViewProps) {
  const t = useTranslations('organize.records.table.columns');

  // Render cell based on column type
  const renderCell = (item: Case, columnKey: ColumnKey) => {
    switch (columnKey) {
      case 'favorite':
        return (
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
        );
      case 'caseNumber':
        return (
          <span className="font-medium text-foreground">
            {item.caseNumber}
          </span>
        );
      case 'status':
        return (
          <Badge variant="outline" className={cn(
            "font-medium px-2.5 py-0.5 transition-colors",
            item.status === CaseStatus.ACTIVE ? 'bg-success/10 text-success hover:bg-success/20' :
            item.status === CaseStatus.INACTIVE ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' :
            'bg-muted/20 text-muted hover:bg-muted/30'
          )}>
            {item.status}
          </Badge>
        );
      case 'stage':
        return item.stage;
      case 'lawBranch':
        return (
          <Badge variant="secondary" className="font-normal">
            {item.lawBranch}
          </Badge>
        );
      case 'parties':
        return (
          <div>
            <div className="font-medium">{item.plaintiff}</div>
            <div className="text-muted-foreground text-sm">vs.</div>
            <div className="font-medium">{item.defendant}</div>
          </div>
        );
      case 'courthouse':
        return item.courthouse;
      case 'assignedTo':
        return (
          <div className="flex -space-x-2">
            {item.assignedLawyerIds.length} assigned
          </div>
        );
      default:
        const key = columnKey as keyof Case;
        return item[key]?.toString() || 'N/A';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {Object.keys(columnVisibility).map((key) => 
            columnVisibility[key as ColumnKey] && (
              <TableHead 
                key={key}
                className={cn(
                  "bg-muted/5 dark:bg-muted/10 h-14",
                  "text-sm font-semibold tracking-tight",
                  "text-muted-foreground/80",
                  "px-4 first:pl-6 last:pr-6",
                  "group transition-colors hover:text-foreground"
                )}
              >
                {t(key)}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow 
            key={item.id} 
            className={cn(
              "group/row",
              "hover:bg-muted/50 dark:hover:bg-muted/10",
              "transition-colors duration-200"
            )}
          >
            {Object.keys(columnVisibility).map((key) => 
              columnVisibility[key as ColumnKey] && (
                <TableCell 
                  key={key} 
                  className={cn(
                    "py-4 px-4 first:pl-6 last:pr-6",
                    "text-sm text-muted-foreground group-hover/row:text-foreground",
                    "transition-colors duration-200"
                  )}
                >
                  {renderCell(item, key as ColumnKey)}
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}