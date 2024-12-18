# Design System Guidelines

## Color System

### Core Colors
- **Primary (Notion Blue)**: `hsl(209 100% 47%)`
- **Background**: Pure white in light mode, 13% gray in dark mode
- **Subtle Background**: `hsla(60, 7%, 97%, 1.00)` - Used for hierarchical elements
- **Hover State**: `hsla(0, 0%, 97%, 1.00)` - Consistent hover effect

### Semantic Colors
- **Success**: Green for positive actions/states
- **Warning**: Orange for cautionary states
- **Destructive**: Red for dangerous actions
- **Muted**: Used for secondary text and subtle elements

### Dark Mode Colors
- **Background**: 13% gray (`hsl(0 0% 13%)`)
- **Elevated Surface**: 15% gray (`hsl(0 0% 15%)`)
- **Hover State**: 16% gray (`hsl(0 0% 16%)`)

## Interactive Effects

### Gradient Hover Effects
We provide several reusable gradient effects for interactive elements:

1. **Basic Bottom Gradient** - Subtle underline effect
```tsx
<div className="hover-gradient-bar">
  Hover me for bottom gradient
</div>
```

2. **Top Gradient** - Appears at the top of element
```tsx
<div className="hover-gradient-bar hover-gradient-bar-top">
  Hover me for top gradient
</div>
```

3. **Full Background** - Subtle gradient background
```tsx
<div className="hover-gradient-bar hover-gradient-bar-full">
  Hover me for full gradient effect
</div>
```

### Focus States
- Primary color ring with 20% opacity in light mode
- 40% opacity in dark mode
- 2px ring width with offset
- Smooth transitions (200ms duration)

## Typography

### Text Styles
- **Headers**: Bold, tracking-tight
- **Body**: Regular weight, optimal line height
- **Subtle Text**: Muted color, slightly lighter weight

### Font Sizes
- **Large Title**: text-4xl
- **Subtitle**: text-xl
- **Body**: text-base
- **Small**: text-sm

## Components

### Interactive Elements
```tsx
// Button with gradient hover
<Button className="hover-gradient-bar">
  Click me
</Button>

// Table header with gradient
<TableHead className="hover-gradient-bar">
  Column Title
</TableHead>
```

### Cards & Containers
- Subtle borders (40% opacity)
- Optional shadow for elevation
- Rounded corners (border-radius: 0.5rem)
```tsx
<div className="card-base">
  Card content
</div>
```

### Tables
```tsx
// Header with gradient hover
<TableHead className="hover-gradient-bar">
  Column Title
</TableHead>

// Row with hover state
<TableRow className="table-row-base">
  Row content
</TableRow>
```

## Visual Hierarchy

### Elevation Levels
1. **Base** (`--surface-base`): Background
2. **Subtle** (`--surface-subtle`): Sidebar, Headers
3. **Elevated** (`--surface-elevated`): Cards, Dropdowns
4. **Higher** (`--surface-higher`): Modals, Popovers

### Interactive States
1. **Default**: Base state
2. **Hover**: 
   - Light mode: Subtle gray (`--hover-bg`)
   - Dark mode: 16% gray
3. **Focus**: Primary color ring
4. **Active**: Slightly darker than hover

## Implementation

### CSS Variables Usage
```css
/* Example usage */
.element {
  /* Colors */
  background: hsl(var(--subtle-bg));
  color: hsl(var(--foreground));
  
  /* Transitions */
  transition: all 0.2s;
  
  /* Hover states */
  &:hover {
    background: hsl(var(--hover-bg));
  }
}
```

### Utility Classes
```css
/* Surface utilities */
.surface-base
.surface-elevated
.surface-higher

/* Interactive utilities */
.interactive-hover
.hover-gradient-bar
.hover-gradient-bar-top
.hover-gradient-bar-full
```

### Component Classes
```css
/* Base components */
.card-base
.header-base
.table-row-base

/* Feature components */
.feature-title
.feature-subtitle
.feature-description
```

## Best Practices

### Using Gradients
1. Use for interactive elements that need subtle emphasis
2. Keep transitions smooth (200ms is standard)
3. Maintain consistent opacity levels (40% is standard)
4. Consider dark mode adjustments

### Accessibility
- Ensure sufficient contrast ratios
- Provide focus indicators
- Support keyboard navigation
- Test with screen readers

### Performance
- Use CSS variables for dynamic values
- Leverage utility classes for common patterns
- Keep transitions performant (transform, opacity)
- Avoid heavy animations on frequent updates
