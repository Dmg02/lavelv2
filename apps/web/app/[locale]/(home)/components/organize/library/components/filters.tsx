import { useTranslations } from 'next-intl';
import { Filter } from 'lucide-react';
import { useLibrary } from '../context/library-context';
import { FileType, FileStatus, DocumentCategory } from '@/types/library/index';

export function Filters() {
  const t = useTranslations('library');
  const { state, dispatch } = useLibrary();

  const handleTypeChange = (type: FileType) => {
    const types = state.filters.types.includes(type)
      ? state.filters.types.filter(t => t !== type)
      : [...state.filters.types, type];
    
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { types }
    });
  };

  const handleStatusChange = (status: FileStatus) => {
    const statuses = state.filters.statuses.includes(status)
      ? state.filters.statuses.filter(s => s !== status)
      : [...state.filters.statuses, status];
    
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { statuses }
    });
  };

  const handleCategoryChange = (category: DocumentCategory) => {
    const categories = state.filters.categories.includes(category)
      ? state.filters.categories.filter(c => c !== category)
      : [...state.filters.categories, category];
    
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { categories }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <h2 className="font-medium">{t('ui.filters.title')}</h2>
      </div>

      {/* File Types */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {t('ui.filters.type')}
        </h3>
        <div className="space-y-1">
          {Object.values(FileType).map(type => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.filters.types.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{t(`ui.fileTypes.${type}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {t('ui.filters.status')}
        </h3>
        <div className="space-y-1">
          {Object.values(FileStatus).map(status => (
            <label key={status} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.filters.statuses.includes(status)}
                onChange={() => handleStatusChange(status)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{t(`ui.status.${status}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {t('ui.filters.category')}
        </h3>
        <div className="space-y-1">
          {Object.values(DocumentCategory).map(category => (
            <label key={category} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{t(`ui.categories.${category}`)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 