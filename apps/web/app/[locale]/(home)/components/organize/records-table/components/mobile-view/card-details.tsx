'use client';

import { useTranslations } from 'next-intl';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@repo/design-system/components/ui/avatar';
import { 
  FileText, 
  Users, 
  AlertTriangle, 
  MapPin, 
  UserCircle 
} from 'lucide-react';
import type { Case } from '@/types/shared/case';
import type { Lawyer } from '@/types/shared/lawyer';
import { StatusBadge } from '@repo/design-system/components/ui/status-badge';

interface CardDetailsProps {
  data: Case;
  lawyers: Record<string, Lawyer>;
}

export function CardDetails({ data, lawyers }: CardDetailsProps) {
  const t = useTranslations('organize');

  const renderField = (key: keyof Case, value: any) => {
    if (value === undefined || value === null) return null;

    return (
      <div key={key} className="mb-3">
        <div className="text-xs text-muted-foreground mb-1">
          {t(`records.table.columns.${key}`)}
        </div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    );
  };

  const renderTeamMembers = () => (
    <div className="flex flex-wrap gap-2">
      {data.assignedLawyerIds?.map((id) => {
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

  const renderParties = () => (
    <div className="space-y-3">
      {renderField('client', data.client)}
      {renderField('corporation', data.corporation)}
    </div>
  );

  const renderCaseInfo = () => (
    <div className="grid grid-cols-2 gap-4">
      {renderField('stage', data.stage)}
      {renderField('lawBranch', data.lawBranch)}
      {renderField('typeOfTrial', data.typeOfTrial)}
      {renderField('totalHours', data.totalHours ? `${data.totalHours} hrs` : null)}
    </div>
  );

  const renderRisk = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-muted-foreground mb-1">
          {t('records.table.columns.riskFactor')}
        </div>
        <StatusBadge 
          type="risk"
          value={data.riskFactor}
          className="mt-1"
        />
      </div>
      {renderField('contingencyCost', data.contingencyCost ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.contingencyCost) : null)}
    </div>
  );

  const renderLocation = () => (
    <div className="grid grid-cols-2 gap-4">
      {renderField('courthouse', data.courthouse)}
      {renderField('city', data.city)}
      {renderField('state', data.state)}
    </div>
  );

  const sections = [
    { 
      key: 'caseInfo', 
      render: renderCaseInfo,
      icon: <FileText className="w-4 h-4 text-notion-blue" />
    },
    { 
      key: 'parties', 
      render: renderParties,
      icon: <Users className="w-4 h-4 text-notion-blue" />
    },
    { 
      key: 'riskAndFinancial', 
      render: renderRisk,
      icon: <AlertTriangle className="w-4 h-4 text-notion-blue" />
    },
    { 
      key: 'location', 
      render: renderLocation,
      icon: <MapPin className="w-4 h-4 text-notion-blue" />
    },
    { 
      key: 'teamMembers', 
      render: renderTeamMembers,
      icon: <UserCircle className="w-4 h-4 text-notion-blue" />
    }
  ] as const;

  return (
    <ScrollArea className="h-[400px]">
      <div className="divide-y divide-border">
        {sections.map(({ key, render, icon }) => (
          <div key={key} className="p-4">
            <div className="flex items-center gap-2 mb-4">
              {icon}
              <h4 className="text-sm font-medium">
                {t(`records.mobile.sections.${key}`)}
              </h4>
            </div>
            {render()}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}