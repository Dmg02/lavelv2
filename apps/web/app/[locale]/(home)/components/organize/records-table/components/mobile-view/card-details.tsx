'use client';

import { useTranslations } from 'next-intl';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@repo/design-system/components/ui/avatar';
import { sections } from './section-groups';
import type { Case } from '@/types/shared/case';
import type { Lawyer } from '@/types/shared/lawyer';

interface CardDetailsProps {
  data: Case;
  lawyers: Record<string, Lawyer>;
}

export function CardDetails({ data, lawyers }: CardDetailsProps) {
  const t = useTranslations('organize.records');

  const renderSection = (sectionKey: string) => {
    const section = sections.find(s => s.key === sectionKey);
    if (!section) return null;

    switch (section.key) {
      case 'teamMembers':
        return (
          <div className="flex -space-x-2">
            {data.assignedLawyerIds.map((id) => {
              const lawyer = lawyers[id];
              if (!lawyer) return null;
              
              return (
                <Avatar key={lawyer.id} className="border-2 border-background">
                  <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                  <AvatarFallback className="bg-primary/10">
                    {lawyer.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              );
            })}
          </div>
        );

      case 'location':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {t('labels.courthouse')}
              </div>
              <div className="text-sm font-medium">{data.courthouse}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {t('labels.city')}
              </div>
              <div className="text-sm font-medium">{data.city}</div>
            </div>
          </div>
        );

      // Add other sections as needed
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="h-[400px]">
      <div className="divide-y divide-border">
        {sections.map((section) => (
          <div key={section.key} className="p-4">
            <div className="flex items-center gap-2 mb-4">
              {section.icon}
              <h4 className="text-sm font-medium">
                {t(`sections.${section.key}`)}
              </h4>
            </div>
            {renderSection(section.key)}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}