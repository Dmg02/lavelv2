'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/design-system/components/ui/accordion';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import { DatePickerWithRange } from '@repo/design-system/components/ui/date-picker';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/design-system/components/ui/sheet';
import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import type {
  ConfidentialityLevel,
  DocumentType,
  FileStatus,
  FileType,
} from '@/types/library';
import { CaseStage } from '@/types/shared/case';
import { libraryUtils } from '@/data/library/utils';

interface FilterPanelProps {
  onFiltersChange: (filters: FilterState) => void;
}

interface FilterState {
  fileTypes: FileType[];
  status: FileStatus[];
  documentTypes: DocumentType[];
  confidentiality: ConfidentialityLevel[];
  caseStage: CaseStage[];
  dateRange?: DateRange;
  tags: string[];
  authors: string[];
}

// const fileTypeOptions: { value: FileType; label: string }[] = [
//   { value: FileType.PDF, label: 'PDF Documents' },
//   { value: FileType.DOC, label: 'Word Documents' },
//   { value: FileType.VIDEO, label: 'Video Files' },
//   { value: FileType.AUDIO, label: 'Audio Files' },
//   { value: FileType.IMAGE, label: 'Images' },
//   { value: FileType.TRANSCRIPT, label: 'Transcripts' },
// ];

// const statusOptions: { value: FileStatus; label: string }[] = [
//   { value: FileStatus.DRAFT, label: 'Draft' },
//   { value: FileStatus.FINAL, label: 'Final' },
//   { value: FileStatus.ARCHIVED, label: 'Archived' },
//   { value: FileStatus.PENDING_REVIEW, label: 'Pending Review' },
// ];

export function FilterPanel({
  onFiltersChange,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    fileTypes: [],
    status: [],
    documentTypes: [],
    confidentiality: [],
    caseStage: [],
    tags: [],
    authors: [],
  });
  const [date, setDate] = useState<DateRange | undefined>();

  const handleFilterChange = (
    category: keyof FilterState,
    value:
      | FileType
      | FileStatus
      | DocumentType
      | ConfidentialityLevel
      | string
      | DateRange
      | undefined
  ) => {
    const newFilters = {
      ...activeFilters,
      [category]: Array.isArray(activeFilters[category])
        ? (activeFilters[category] as any[]).includes(value)
          ? (activeFilters[category] as any[]).filter((v) => v !== value)
          : [...activeFilters[category], value]
        : value,
    };
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
    handleFilterChange('dateRange', range);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Filter Documents</SheetTitle>
            </SheetHeader>
            <ScrollArea className="mt-8 h-full pr-4">
              <Accordion type="multiple" className="space-y-4">
                {/* File Type Filter */}
                <AccordionItem value="fileType">
                  <AccordionTrigger>File Type</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {Object.values(FileType).map((type) => (
                        <div key={type} className="flex items-center gap-2">
                          <Checkbox
                            id={type}
                            checked={activeFilters.fileTypes.includes(type)}
                            onCheckedChange={() =>
                              handleFilterChange('fileTypes', type)
                            }
                          />
                          <label htmlFor={type} className="text-sm">
                            {/* {t(`ui.fileTypes.${type}`)} */}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Status Filter */}
                <AccordionItem value="status">
                  <AccordionTrigger>Status</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {Object.values(FileStatus).map((status) => (
                        <div key={status} className="flex items-center gap-2">
                          <Checkbox
                            id={status}
                            checked={activeFilters.status.includes(status)}
                            onCheckedChange={() =>
                              handleFilterChange('status', status)
                            }
                          />
                          <label htmlFor={status} className="text-sm">
                            {/* {t(`ui.status.${status}`)} */}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Date Range Filter */}
                <AccordionItem value="dateRange">
                  <AccordionTrigger>Date Range</AccordionTrigger>
                  <AccordionContent>
                    <DatePickerWithRange
                      date={date}
                      onChange={handleDateChange}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Active Filter Badges */}
        {Object.entries(activeFilters).map(([category, values]) => {
          if (!Array.isArray(values) || values.length === 0) return null;
          return values.map((value) => (
            <Badge
              key={`${category}-${value}`}
              variant="secondary"
              className="gap-1"
            >
              {value}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() =>
                  handleFilterChange(category as keyof FilterState, value)
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ));
        })}
      </div>
    </div>
  );
}
