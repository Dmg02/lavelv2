# Translation System Guidelines

## Directory Structure

```
apps/web/
├── i18n/
│ ├── types/
│ │ ├── shared/                # Shared, reusable types
│ │ │ ├── common.d.ts         # Base shared types (status, dates, etc.)
│ │ │ ├── entities.d.ts       # Core entity types (person, organization)
│ │ │ ├── ui.d.ts            # UI component types
│ │ │ └── forms.d.ts         # Form-related types
│ │ └── features/            # Feature-specific types
│ │   ├── records.d.ts       # Extends and uses shared types
│ │   └── team.d.ts          # Extends and uses shared types
│ ├── shared/                # Shared translations
│ │ ├── en/
│ │ │ ├── common.json        # Base translations
│ │ │ ├── entities.json      # Entity translations
│ │ │ ├── ui.json           # UI translations
│ │ │ └── forms.json        # Form translations
│ │ └── es/
│ │   └── [same structure as en]
│ └── i18n.config.ts
```

## Core Principles

1. **Separation of Concerns**
   - Base types and translations (common.d.ts)
   - Entity-related types and translations (entities.d.ts)
   - UI-specific types and translations (ui.d.ts)
   - Feature-specific types and translations (in features/)

2. **Type Hierarchy**
   ```typescript
   // Base types (common.d.ts)
   export type StatusKey = 'active' | 'inactive' | 'pending';
   export type RiskLevelKey = 'high' | 'medium' | 'low';
   
   // Entity types (entities.d.ts)
   export interface PersonBase {
     id: string;
     name: string;
     email: string;
   }
   
   // Feature types (features/records.d.ts)
   import { StatusKey, PersonBase } from '../shared';
   
   export interface Case {
     status: StatusKey;      // Reuse base type
     client: PersonBase;     // Reuse entity type
     // Feature-specific fields...
   }
   ```

3. **Translation Organization**
   ```json
   // common.json
   {
     "status": {
       "active": "Active",
       "inactive": "Inactive"
     }
   }
   
   // entities.json
   {
     "person": {
       "name": "Name",
       "email": "Email"
     }
   }
   
   // features/records.json
   {
     "case": {
       "title": "Case Details"
     }
   }
   ```

## Best Practices

1. **Type Reusability**
   - Define base types in shared directories
   - Extend base types for specific features
   - Use composition over repetition
   - Keep types DRY (Don't Repeat Yourself)

2. **Translation Keys**
   - Use consistent naming patterns
   - Group related translations logically
   - Keep paths shallow when possible
   ```typescript
   // Good
   status: Record<StatusKey, string>
   
   // Avoid deep nesting
   deeply: {
     nested: {
       translations: string
     }
   }
   ```

3. **Component Usage**
   ```typescript
   function MyComponent() {
     // Import only needed translations
     const commonT = useTranslations('common');
     const recordsT = useTranslations('records');
     
     return (
       <div>
         <p>{commonT(`status.${status}`)}</p>
         <p>{recordsT('case.title')}</p>
       </div>
     );
   }
   ```

4. **Data vs Translations**
   - Data: Values that don't need translation
     ```typescript
     const person = {
       id: "123",
       name: "John Doe",     // Actual data
       status: "active"      // Key for translation
     }
     ```
   - Translations: UI text and data values that change by language
     ```json
     {
       "status": {
         "active": "Active",    // English
         "active": "Activo"     // Spanish
       }
     }
     ```

5. **Adding New Features**
   1. Identify reusable elements from shared types
   2. Create feature-specific types extending shared ones
   3. Add necessary translations following the structure
   4. Use composition to build complex types

6. **Performance Considerations**
   - Import only needed translations
   - Use code splitting for large translation files
   - Consider lazy loading for rarely used translations

## Examples

1. **Creating a New Feature**
   ```typescript
   // 1. Use shared types
   import { StatusKey, PersonBase } from '../shared';
   
   // 2. Define feature-specific types
   export interface MyFeature {
     status: StatusKey;
     owner: PersonBase;
     // Feature-specific fields...
   }
   
   // 3. Define feature translations
   export interface MyFeatureTranslations {
     labels: {
       title: string;
       description: string;
     }
   }
   ```

2. **Using in Components**
   ```typescript
   function FeatureComponent() {
     // Use translations from different namespaces
     const commonT = useTranslations('common');
     const featureT = useTranslations('myFeature');
     
     return (
       <div>
         <h1>{featureT('labels.title')}</h1>
         <p>{commonT(`status.${data.status}`)}</p>
       </div>
     );
   }
   ```

## Maintenance

1. **Regular Review**
   - Review shared types for reusability
   - Check for duplicate translations
   - Ensure consistent naming patterns

2. **Documentation**
   - Keep type definitions documented
   - Document translation structure
   - Maintain examples for common patterns

3. **Version Control**
   - Track changes to translation files
   - Review translation changes carefully
   - Consider translation management tools