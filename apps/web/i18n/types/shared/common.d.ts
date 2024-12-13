// apps/web/i18n/types/shared/common.d.ts

export type CityKey = 'mexicoCity' | 'monterrey' | 'cancun' | 'guadalajara';
export type StateKey = 'cdmx' | 'nuevoLeon' | 'quintanaRoo' | 'jalisco';
export type CurrencyKey = 'mxn' | 'usd';
export type StatusKey = 'active' | 'inactive';
export type RiskLevel = 'high' | 'medium' | 'low';
export type StageKey = 'initial' | 'discovery' | 'trial' | 'appeal' | 'closed';
export type CourthouseKey = '' | '' | '' | '';

export interface CommonTranslations {
  locations: {
    cities: Record<CityKey, string>;
    states: Record<StateKey, string>;
    country: string;
    address: string;
  };
  actions: {
    create: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    view: string;
    search: string;
    filter: string;
    export: string;
    import: string;
    share: string;
    print: string;
  };
  status: {
    loading: string;
    error: string;
    success: string;
    empty: string;
    pending: string;
    processing: string;
  };
  dateTime: {
    today: string;
    yesterday: string;
    tomorrow: string;
    days: string[];
    months: string[];
    formats: {
      short: string;
      medium: string;
      long: string;
    };
  };
  currency: Record<CurrencyKey, {
    symbol: string;
    name: string;
    format: string;
  }>;
}