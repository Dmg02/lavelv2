// apps/web/app/[locale]/(home)/components/organize/records-table/components/mobile-view/index.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@repo/design-system/components/ui/card';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/design-system/components/ui/accordion';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@repo/design-system/components/ui/avatar';
import { Star, MapPin, FileText, Users, AlertTriangle } from 'lucide-react';
import { cn } from '@repo/design-system/lib/utils';
import type { EnrichedCase } from '@/i18n/types/shared/case';

interface MobileViewProps {
  data: EnrichedCase[];
}

export function MobileView({ data }: MobileViewProps) {
  const t = useTranslations('case');
  const tMobile = useTranslations('case.mobile');

  return (
    <div className="md:hidden relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/20 to-transparent -z-10 rounded-lg blur-xl" />
      <Card className="bg-card/95 backdrop-blur-sm border-0 shadow-lg">
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 space-y-6">
            {data.map((item) => (
              <Accordion type="single" collapsible key={item.id}>
                <AccordionItem value="details" className="border rounded-lg bg-background/80 backdrop-blur-sm">
                  {/* Card Preview - Most Important Information */}
                  <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div]:pb-0">
                    <div className="flex flex-col w-full space-y-4">
                      {/* Primary Info: Case Number & Status */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          {item.favorite && (
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          )}
                          <span className="text-base font-medium">
                            {item.caseNumber}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "px-3 py-1 text-sm font-medium",
                            item.status === 'active' ? 'bg-success/10 text-success' :
                            item.status === 'inactive' ? 'bg-destructive/10 text-destructive' :
                            'bg-muted text-muted-foreground'
                          )}
                        >
                          {t(`labels.status.${item.status}`)}
                        </Badge>
                      </div>

                      {/* Stage & Type */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                          <span className="text-sm text-muted-foreground">
                            {t(`labels.stage.${item.stage}`)}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {t(`labels.lawBranch.${item.lawBranch}`)}
                        </Badge>
                      </div>

                      {/* Parties */}
                      <div className="text-sm">
                        <span className="font-medium">{item.plaintiff}</span>
                        <span className="text-muted-foreground mx-2">vs</span>
                        <span className="font-medium">{item.defendant}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.courthouse}</span>
                      </div>
                    </div>
                  </AccordionTrigger>

                  {/* Expanded Details */}
                  <AccordionContent>
                    <ScrollArea className="h-[400px]">
                      <div className="divide-y divide-border">
                        {/* Team Members */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <Users className="h-4 w-4 text-primary" />
                            <h4 className="text-sm font-medium">
                              {tMobile('sections.teamMembers')}
                            </h4>
                          </div>
                          <div className="flex -space-x-2">
                            {item.assignedTo.map((member) => (
                              <Avatar key={member.id} className="border-2 border-background">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback className="bg-primary/10">
                                  {member.name.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>

                        {/* Add other sections as needed */}
                      </div>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}