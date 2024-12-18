'use client';

import { useTranslations } from 'next-intl';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/design-system/components/ui/accordion';
import { CardHeader } from './card-header';
import { CardDetails } from './card-details';
import type { Case } from '@/types/shared/case';
import type { Lawyer } from '@/types/shared/lawyer';

interface RecordCardProps {
  record: Case;
  lawyers: Record<string, Lawyer>;
}

export function RecordCard({ record, lawyers }: RecordCardProps) {
  const t = useTranslations('organize.records');

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="details" className="rounded-lg border surface-base backdrop-blur-sm">
        <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:pb-0">
          <CardHeader data={record} />
        </AccordionTrigger>
        <AccordionContent>
          <CardDetails data={record} lawyers={lawyers} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}