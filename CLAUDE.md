# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Atlas Sample Application

## Overview
This is an Atlas SDK demonstration application showcasing **frontend components only** for internal demo purposes. The project integrates Atlas billing/features SDK with Next.js 15, Clerk authentication, and a custom purple theme.

## Key Development Commands

### Start Development
```bash
npm run dev          # Start dev server with Turbopack
```

### Build & Quality Checks
```bash
npm run build        # Build for production
npm run lint         # Run ESLint
npm run start        # Start production server
```

### Type Checking
TypeScript configuration is strict mode enabled. Use `npm run build` to validate types since there's no dedicated `type-check` script.

## Architecture Overview

### Atlas Integration Pattern
The project uses a dual-architecture approach for Atlas SDK integration:

**Client-Side Integration** (`src/atlas/client.tsx`):
- Dynamic imports to avoid SSR issues with Atlas components
- Wraps `@runonatlas/next/client` AtlasProvider
- Integrates with Clerk authentication via `getToken`, `userId`, `userEmail`

**Server-Side Integration** (`src/atlas/server.ts`):
- Uses `AtlasNextServerClient` with Clerk auth integration
- Handles all Atlas API routing through `src/app/api/atlas-api/[[...slug]]/route.ts`

### Authentication Flow
- **Middleware**: Clerk middleware (`src/middleware.ts`) protects all routes except static files
- **Protected Routes**: Everything under `src/app/(auth)/` requires authentication
- **Redirect Logic**: Unauthenticated users redirect to `/sign-in`

### Component Architecture

**Atlas Component Wrappers** (`src/components/atlas/`):
- `atlas-pricing.tsx` - Wraps PricingComponent with dynamic imports
- `atlas-customer-portal.tsx` - Wraps CustomerPortalComponent 
- `feature-gate.tsx` - Wraps FeatureProtect with custom fallback UI

**Dynamic Loading Pattern**:
All Atlas components use dynamic imports with `useEffect` to prevent SSR issues:
```tsx
const [Component, setComponent] = useState<any>(null);
useEffect(() => {
  const load = async () => {
    const { ComponentName } = await import("@runonatlas/next/client");
    setComponent(() => ComponentName);
  };
  if (typeof window !== "undefined") load();
}, []);
```

### Route Structure
```
/ - Landing page (public)
/sign-in, /sign-up - Clerk auth pages
/(auth)/ - Protected route group:
  ├── /dashboard - Main app dashboard  
  ├── /features - Feature showcase with gates
  ├── /pricing - Atlas PricingComponent demo
  └── /portal - Atlas CustomerPortalComponent
/api/atlas-api/[...slug] - Atlas API proxy routes
```

## Environment Configuration

### Required Variables
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Atlas SDK
ATLAS_API_KEY=your_atlas_api_key
```

### Deployment Considerations
- `DEPLOYMENT.md` contains platform-specific deployment instructions
- Update `NEXT_PUBLIC_APP_URL` for deployed environments
- Verify Clerk domain configuration matches deployment URL

## Styling & Theming

### Atlas Purple Theme
Custom color palette defined in `tailwind.config.js`:
```javascript
atlas: {
  50: '#f5f3ff',   // Lightest purple
  600: '#7c3aed',  // Primary Atlas purple
  900: '#4c1d95',  // Darkest purple
}
```

### Component Library
- Uses shadcn/ui components (`src/components/ui/`)
- Tailwind CSS with custom Atlas purple theme
- Responsive design patterns throughout

## Development Patterns

### Atlas Component Integration
When adding new Atlas components:
1. Create wrapper in `src/components/atlas/`
2. Use dynamic import pattern to avoid SSR issues
3. Provide loading states and error handling
4. Apply Atlas purple theming consistently

### Feature Gating
Use `FeatureGate` component for conditional rendering:
```tsx
<FeatureGate feature="feature-name" fallback={<UpgradePrompt />}>
  <PremiumFeature />
</FeatureGate>
```

### Authentication Integration
- Server components: Use `auth()` from `@clerk/nextjs/server`
- Client components: Use `useAuth()` and `useUser()` hooks
- Atlas integration automatically syncs with Clerk user data

## Project Conventions

### File Organization
- Atlas-specific code isolated in `src/atlas/`
- Reusable components in `src/components/` with subdirectories by purpose
- API routes follow Next.js App Router patterns

### Import Aliases
- `@/*` maps to `src/*` (configured in `tsconfig.json`)
- Use absolute imports for all internal modules

### Error Handling
- Atlas components include try/catch blocks for dynamic imports
- Loading states provided for all async operations
- Graceful fallbacks for missing Atlas functionality

## Testing & Quality

### Current Setup
- ESLint configured with Next.js rules
- TypeScript strict mode enabled
- No dedicated testing framework currently configured

### Adding Tests
If implementing tests, consider:
- Atlas component mocking strategies for dynamic imports
- Clerk authentication mocking for protected routes
- Environment variable mocking for different configurations

## Common Issues & Solutions

### Atlas Component Loading
If Atlas components don't load:
- Verify `ATLAS_API_KEY` is set correctly
- Check browser console for import errors
- Ensure Atlas API routes are accessible

### Authentication Issues
- Verify all Clerk environment variables are set
- Check Clerk dashboard domain configuration
- Ensure middleware configuration matches route structure

### Build Issues
- Atlas dynamic imports can cause build warnings - this is expected
- TypeScript strict mode may require explicit typing for Atlas components
- Tailwind CSS purging may need Atlas color classes to be included