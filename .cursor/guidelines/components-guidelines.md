# Component Development Guidelines

## Directory Structure

```
apps/web/
├── types/
│   ├── shared/          # Shared type definitions
│   │   ├── case.ts      # Core business types
│   │   ├── lawyer.ts    # Core business types
│   │   └── location.ts  # Common enums/types
│   └── ui/             # UI-specific types
│       └── case.ts     # UI component types
├── data/              # Static data
│   ├── lawyers.ts     # Lawyer records
│   └── cases.ts       # Case records
├── utils/            # Utility functions
│   └── data-utils.ts # Data manipulation functions
└── app/
    └── [locale]/
        └── (home)/
            └── components/
                └── organize/
                    └── records-table/
                        ├── index.tsx
                        └── components/
                            └── mobile-view/
                                ├── index.tsx
                                ├── record-card.tsx
                                ├── card-header.tsx
                                └── card-details.tsx
```

## Component Creation Process

1. **Type Definitions First**
   - Define shared types in `types/shared/`
   - Define UI-specific types in `types/ui/`
   - Use enums for fixed values (status, stages, etc.)
   - Example:
   ```typescript
   // types/shared/case.ts
   export interface BaseCase {
     id: string;
     status: CaseStatus;
     // ... other fields
   }
   ```

2. **Data Structure**
   - Place static data in `data/` directory
   - Use TypeScript for type safety
   - Organize by domain (lawyers.ts, cases.ts)
   - Example:
   ```typescript
   // data/lawyers.ts
   export const lawyers: Record<string, Lawyer> = {
     'L001': {
       id: 'L001',
       name: 'Carlos Rodríguez',
       // ... other fields
     }
   };
   ```

3. **Component Structure**
   - Use directory-based organization
   - Keep related components together
   - Split into logical sub-components
   ```
   mobile-view/
   ├── index.tsx      # Main component/exports
   ├── record-card.tsx # Container component
   ├── card-header.tsx # Presentational component
   └── card-details.tsx # Presentational component
   ```

4. **Translation Handling**
   - Use next-intl for translations
   - Keep translations in component scope
   - Example:
   ```typescript
   const t = useTranslations('records.mobile');
   return <h2>{t('sections.parties')}</h2>;
   ```

## Best Practices

1. **Type Safety**
   - Use TypeScript strictly
   - Define clear interfaces
   - Avoid type assertions (`as`)
   - Use enums for fixed values

2. **Data Management**
   - Keep data immutable
   - Use utility functions for data manipulation
   - Centralize data access patterns
   ```typescript
   export function getAssignedLawyers(caseData: BaseCase): Lawyer[] {
     return caseData.assignedLawyerIds
       .map(id => lawyers[id])
       .filter((lawyer): lawyer is Lawyer => lawyer !== undefined);
   }
   ```

3. **Component Props**
   - Clear prop interfaces
   - Document complex props
   - Use TypeScript for prop validation
   ```typescript
   interface RecordCardProps {
     record: BaseCase;
     lawyers: Record<string, Lawyer>;
   }
   ```

4. **File Organization**
   - One component per file
   - Clear file naming
   - Group related components
   - Export from index.tsx

## Translations

1. **Structure**
   ```json
   {
     "records": {
       "mobile": {
         "sections": {
           "parties": "Partes",
           "location": "Ubicación"
         }
       }
     }
   }
   ```

2. **Usage**
   - Use translation hooks in components
   - Keep translations close to usage
   - Follow naming conventions

## Data Flow

1. **Parent to Child**
   ```typescript
   // Parent
   const { cases, lawyers } = getCasesData();
   return <MobileView data={cases} lawyers={lawyers} />;
   ```

2. **Data Transformation**
   - Transform data at container level
   - Pass ready-to-use data to children
   - Use utility functions for common operations

## Testing Considerations

1. **Component Testing**
   - Test component rendering
   - Test data transformations
   - Test user interactions
   - Mock translations

2. **Data Testing**
   - Validate data structure
   - Test utility functions
   - Check edge cases

## Performance Considerations

1. **Data Management**
   - Use memoization for expensive operations
   - Avoid unnecessary re-renders
   - Consider pagination for large datasets

2. **Component Structure**
   - Split large components
   - Use lazy loading when appropriate
   - Consider component composition
