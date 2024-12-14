import { Case, CaseStatus, CaseStage } from '@/types/shared/case';
import { Courthouses } from '@/types/shared/courthouses';
import { Cities } from '@/types/shared/location';
import { LawBranch } from '@/types/shared/law-branch';
import { States } from '@/types/shared/location';
import { RiskFactor } from '@/types/shared/case';
export const cases: Case[] = [
  {
    id: 'C001',
    caseNumber: '198/2024',
    status: CaseStatus.ACTIVE,
    stage: CaseStage.DISCOVERY,
    lawBranch: LawBranch.CIVIL,
    plaintiff: 'Empresa Constructora SA de CV',
    defendant: 'Desarrolladora Inmobiliaria SA de CV',
    courthouse: Courthouses.JPDMCM,
    city: Cities.CDMX,
    state: States.CDMX,
    dateCreated: '2024-01-15',
    favorite: true,
    leadLawyerId: 'L001',
    assignedLawyerIds: ['L001', 'L002'],
    relatedCase: 'C002',
    client: 'Cliente 1',
    corporation: 'Corporación 1',
    totalHours: 100,
    summary: 'Resumen de la demanda',
    riskFactor: RiskFactor.HIGH,
    contingencyCost: 10000,
    typeOfTrial: 'Juicio',
  },
  {
    id: 'C002',
    caseNumber: '27/12/2024',
    status: CaseStatus.ACTIVE,
    stage: CaseStage.TRIAL,
    lawBranch: LawBranch.CRIMINAL,
    plaintiff: 'Ministerio Público',
    defendant: 'Juan Pérez García',
    courthouse: Courthouses.JFCA,
    city: Cities.GDL,
    state: States.JAL,
    dateCreated: '2024-01-20',
    favorite: false,
    leadLawyerId: 'L003',
    assignedLawyerIds: ['L003', 'L005'],
    relatedCase: 'C003',
    client: 'Cliente 2',
    corporation: 'Corporación 2',
    totalHours: 150,
    summary: 'Resumen del juicio',
    riskFactor: RiskFactor.HIGH,
    contingencyCost: 10000,
    typeOfTrial: 'Juicio',
  },
  {
    id: 'C003',
    caseNumber: '321/2012',
    status: CaseStatus.INACTIVE,
    stage: CaseStage.SETTLEMENT,
    lawBranch: LawBranch.FAMILY,
    plaintiff: 'María González López',
    defendant: 'Roberto González Pérez',
    courthouse: Courthouses.JLCA,
    city: Cities.CDMX,
    state: States.CDMX,
    dateCreated: '2024-01-25',
    favorite: false,
    leadLawyerId: 'L004',
    assignedLawyerIds: ['L004'],
    relatedCase: 'C004',
    client: 'Cliente 3',
    corporation: 'Corporación 3',
    totalHours: 200,
    summary: 'Resumen del acuerdo',
    riskFactor: RiskFactor.HIGH,
    contingencyCost: 10000,
    typeOfTrial: 'Juicio',
  },
  {
    id: 'C004',
    caseNumber: '123/2024',
    status: CaseStatus.ACTIVE,
    stage: CaseStage.INITIAL,
    lawBranch: LawBranch.CORPORATE,
    plaintiff: 'Inversiones Globales SA de CV',
    defendant: 'Tecnología Avanzada SA de CV',
    courthouse: Courthouses.JFCA,
    city: Cities.MEX,
    state: States.MEX,
    dateCreated: '2024-02-01',
    favorite: true,
    leadLawyerId: 'L002',
    assignedLawyerIds: ['L002', 'L001'],
    relatedCase: 'C005',
    client: 'Cliente 4',
    corporation: 'Corporación 4',
    totalHours: 250,
    summary: 'Resumen del amparo',
    riskFactor: RiskFactor.HIGH,
    contingencyCost: 10000,
    typeOfTrial: 'Juicio',
  },
  {
    id: 'C005',
    caseNumber: '988/2018',
    status: CaseStatus.ACTIVE,
    stage: CaseStage.APPEAL,
    lawBranch: LawBranch.ADMINISTRATIVE,
    plaintiff: 'Servicios Municipales SA de CV',
    defendant: 'Gobierno Municipal de Puebla',
    courthouse: Courthouses.TFL,
    city: Cities.PUE,
    state: States.PUE,
    dateCreated: '2024-02-05',
    favorite: false,
    leadLawyerId: 'L005',
    assignedLawyerIds: ['L005', 'L003'],
    relatedCase: 'C006',
    client: 'Cliente 5',
    corporation: 'Corporación 5',
    totalHours: 300,
    summary: 'Resumen del recurso',
    riskFactor: RiskFactor.HIGH,
    contingencyCost: 10000,
    typeOfTrial: 'Juicio',
  }
]; 