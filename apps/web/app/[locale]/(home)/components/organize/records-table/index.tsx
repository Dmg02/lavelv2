'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TableHeader } from './components/table-header';
import { TableView } from './components/table-view';
import { MobileView } from './components/mobile-view';
import { useMediaQuery } from '@/app/hooks/use-media-query';
import type { ColumnVisibility } from './types';
import type { Case } from '@/types/shared/case';
import type { Lawyer } from '@/types/shared/lawyer';
import { defaultColumnVisibility } from './types';

interface RecordsTableProps {
  data: Case[];
  lawyers: Record<string, Lawyer>;
}

export function RecordsTable({ data, lawyers }: RecordsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Filter function
  const filteredData = data.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.caseNumber.toLowerCase().includes(searchLower) ||
      record.plaintiff.toLowerCase().includes(searchLower) ||
      record.defendant.toLowerCase().includes(searchLower) ||
      record.courthouse.toLowerCase().includes(searchLower) ||
      lawyers[record.leadLawyerId]?.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-background dark:bg-card rounded-xl border">
      <TableHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />

      {isMobile ? (
        <MobileView 
          data={filteredData}
          lawyers={lawyers}
        />
      ) : (
        <TableView 
          data={filteredData}
          columnVisibility={columnVisibility}
        />
      )}
    </div>
  );
}