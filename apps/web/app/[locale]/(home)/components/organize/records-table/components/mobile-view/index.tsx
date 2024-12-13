import { RecordCard } from './record-card';
import type { Case } from '@/types/shared/case';
import type { Lawyer } from '@/types/shared/lawyer';

interface MobileViewProps {
  data: Case[];
  lawyers: Record<string, Lawyer>;
}

export function MobileView({ data, lawyers }: MobileViewProps) {
  return (
    <div className="space-y-4 p-4">
      {data.map((record) => (
        <RecordCard 
          key={record.id} 
          record={record}
          lawyers={lawyers}
        />
      ))}
    </div>
  );
}

export * from './record-card';
export * from './card-details';
export * from './section-groups';
export * from './card-header'; 