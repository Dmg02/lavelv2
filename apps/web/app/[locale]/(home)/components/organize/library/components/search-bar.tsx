import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { useLibrary } from '../context/library-context';

export function SearchBar() {
  const t = useTranslations('library');
  const { state, dispatch } = useLibrary();
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        placeholder={t('ui.search.placeholder')}
        value={state.searchTerm}
        onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
      />
    </div>
  );
} 