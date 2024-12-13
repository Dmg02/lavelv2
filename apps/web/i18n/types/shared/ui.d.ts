// apps/web/i18n/types/shared/ui.d.ts

// Common UI element translations that can be reused across components
export interface UITranslations {
  search: {
    placeholder: string;
    noResults: string;
    searching: string;
  };
  filters: {
    title: string;
    clear: string;
    apply: string;
    selected: string;
    clearAll: string;
  };
  table: {
    empty: string;
    loading: string;
    rowsPerPage: string;
    showing: string;
    of: string;
  };
  pagination: {
    previous: string;
    next: string;
    of: string;
  };
  mobile: {
    showMore: string;
    showLess: string;
    details: string;
  };
  sorting: {
    asc: string;
    desc: string;
  };
}