import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { LibraryFile } from '@/types/library';
import type { ViewMode, Folder, FilterState } from '@/types/library/view';
import { FileType, FileStatus, DocumentCategory } from '@/types/library/index';

interface LibraryState {
  files: LibraryFile[];
  selectedFile: string | null;
  folders: Folder[];
  currentFolder: string | null;
  filters: FilterState;
  viewMode: ViewMode;
  searchTerm: string;
  currentCase?: string;
  isLoading: boolean;
  error: string | null;
  previewFile: LibraryFile | null;
}

const initialState: LibraryState = {
  files: [],
  selectedFile: null,
  folders: [],
  currentFolder: null,
  filters: {
    types: [],
    statuses: [],
    categories: [],
  },
  viewMode: 'grid',
  searchTerm: '',
  isLoading: false,
  error: null,
  previewFile: null,
};

type LibraryAction =
  | { type: 'SET_FILES'; payload: LibraryFile[] }
  | { type: 'SELECT_FILE'; payload: string | null }
  | { type: 'SET_FOLDERS'; payload: Folder[] }
  | { type: 'SET_CURRENT_FOLDER'; payload: string | null }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_CURRENT_CASE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PREVIEW_FILE'; payload: LibraryFile | null };

function libraryReducer(state: LibraryState, action: LibraryAction): LibraryState {
  switch (action.type) {
    case 'SET_FILES':
      return {
        ...state,
        files: action.payload,
        isLoading: false,
      };
    case 'SELECT_FILE':
      return {
        ...state,
        selectedFile: action.payload,
      };
    case 'SET_FOLDERS':
      return {
        ...state,
        folders: action.payload,
      };
    case 'SET_CURRENT_FOLDER':
      return {
        ...state,
        currentFolder: action.payload,
      };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_CURRENT_CASE':
      return {
        ...state,
        currentCase: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'SET_PREVIEW_FILE':
      return {
        ...state,
        previewFile: action.payload,
        selectedFile: action.payload?.id || null,
      };
    default:
      return state;
  }
}

const LibraryContext = createContext<{
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
} | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(libraryReducer, initialState);
  
  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
} 