// apps/web/app/[locale]/(home)/components/organize/records-table/components/table-header.tsx
'use client';

import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Input } from "@repo/design-system/components/ui/input";
import { Button } from "@repo/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@repo/design-system/components/ui/dropdown-menu";
import { useTranslations } from 'next-intl';
import type { ColumnVisibility } from '../types';

interface TableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  columnVisibility: ColumnVisibility;
  onColumnVisibilityChange: (visibility: ColumnVisibility) => void;
}


export function TableHeader({
  searchTerm,
  onSearchChange,
  columnVisibility,
  onColumnVisibilityChange,
}: TableHeaderProps) {
  const t = useTranslations('organize.records.table');

  return (
    <div className="border-border/50 border-b bg-muted/20 p-6 ">
      <div className="flex gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="-translate-y-1/2 absolute left-3 top-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('ui.search.placeholder')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-full rounded-xl transition-colors"
          />
        </div>

        {/* Column Visibility Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 shrink-0 rounded-xl"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">{t('ui.filters.columns')}</span>
              <ChevronDown className="h-4 w-4 sm:ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-[200px]" 
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {Object.keys(columnVisibility).map((key) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={columnVisibility[key as keyof ColumnVisibility]}
                onCheckedChange={(checked) => {
                  onColumnVisibilityChange({
                    ...columnVisibility,
                    [key]: checked
                  });
                }}
                onSelect={(e) => e.preventDefault()}
              >
                {t(`columns.${key}`)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}