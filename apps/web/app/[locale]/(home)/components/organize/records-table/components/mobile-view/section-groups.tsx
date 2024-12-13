'use client';

import { Users, MapPin, FileText, AlertTriangle } from 'lucide-react';
import { Section } from '../../types/index';

export const sections: Section[] = [
  {
    key: 'parties',
    icon: <Users className="h-4 w-4 text-primary" />,
    title: 'sections.parties'
  },
  {
    key: 'location',
    icon: <MapPin className="h-4 w-4 text-primary" />,
    title: 'sections.location'
  },
  {
    key: 'caseDetails',
    icon: <FileText className="h-4 w-4 text-primary" />,
    title: 'sections.caseDetails'
  },
  {
    key: 'riskAndFinancial',
    icon: <AlertTriangle className="h-4 w-4 text-primary" />,
    title: 'sections.riskAndFinancial'
  },
  {
    key: 'teamMembers',
    icon: <Users className="h-4 w-4 text-primary" />,
    title: 'sections.teamMembers'
  }
];