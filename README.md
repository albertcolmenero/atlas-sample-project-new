# Atlas Sample Application

A comprehensive showcase of Atlas SDK capabilities for internal demo purposes and product testing.

## 🚀 Features

- **Authentication**: Clerk-powered authentication with sign-in/sign-up
- **Atlas Integration**: Full @runonatlas/next SDK integration
- **Dashboard**: Feature management and subscription overview
- **Components**: Atlas PricingComponent and CustomerPortalComponent demos
- **Feature Gating**: Role-based access control using Atlas features
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui
- **TypeScript**: Fully typed codebase with strict type checking

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk
- **Billing & Features**: Atlas SDK (@runonatlas/next)
- **Styling**: Tailwind CSS with Atlas purple theme
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Database**: Atlas-managed (no local database required)

## 📋 Prerequisites

- Node.js 18+ LTS
- npm or yarn package manager
- Clerk account and API keys
- Atlas account and API key

## ⚙️ Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Configure your environment variables in `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# Clerk Auth URLs (pre-configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Atlas Configuration
ATLAS_SECRET_KEY=your_atlas_secret_key
```

## 🚀 Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser** and navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Protected routes group
│   │   ├── dashboard/     # Main dashboard
│   │   ├── features/      # Feature management
│   │   ├── pricing/       # Atlas pricing demo
│   │   ├── portal/        # Customer portal
│   │   └── layout.tsx     # Protected layout
│   ├── api/
│   │   └── atlas-api/     # Atlas API routes
│   ├── sign-in/           # Clerk sign-in
│   ├── sign-up/           # Clerk sign-up
│   └── page.tsx           # Landing page
├── components/
│   ├── atlas/             # Atlas component wrappers
│   ├── dashboard/         # Dashboard components
│   ├── marketing/         # Landing page components
│   └── ui/                # shadcn/ui components
├── atlas/                 # Atlas configuration
└── lib/                   # Utilities
```

## 🎨 Design System

The application uses a custom Atlas purple theme:

- **Primary**: `atlas-600` (#9333EA)
- **Secondary**: `atlas-500` (#A855F7)
- **Dark**: `atlas-900` (#581C87)
- **Light**: `atlas-100` (#F3E8FF)

## 🧩 Atlas Components

### PricingComponent
Interactive pricing table that integrates with your Atlas pricing configuration.

```tsx
import { AtlasPricing } from "@/components/atlas/atlas-pricing";

<AtlasPricing />
```

### CustomerPortalComponent
Self-service customer portal for subscription and billing management.

```tsx
import { AtlasCustomerPortal } from "@/components/atlas/atlas-customer-portal";

<AtlasCustomerPortal />
```

### FeatureGate
Conditional rendering based on user's feature access.

```tsx
import { FeatureGate } from "@/components/atlas/feature-gate";

<FeatureGate feature="premium-analytics">
  <PremiumAnalytics />
</FeatureGate>
```

## 🔒 Authentication Flow

1. **Public Landing Page**: Showcases Atlas capabilities
2. **Sign-in/Sign-up**: Clerk-powered authentication
3. **Protected Dashboard**: Feature-gated application areas
4. **Role-based Access**: Atlas-controlled feature visibility

## 🧪 Development

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📚 Atlas Integration

This sample app demonstrates:

- ✅ **Frontend Integration**: Client-side Atlas provider setup
- ✅ **Backend Integration**: Server-side Atlas client configuration
- ✅ **API Routes**: Atlas-required API endpoints
- ✅ **Feature Protection**: Component-level feature gating
- ✅ **Hooks Usage**: `useCustomerFeatures` and related hooks
- ✅ **Component Integration**: PricingComponent and CustomerPortalComponent

## 🎯 Demo Sections

### 1. Dashboard
- Overview of active features
- Integration status
- Quick action buttons

### 2. Features
- List of all available features
- Feature access status
- Upgrade prompts for restricted features

### 3. Pricing
- Interactive Atlas PricingComponent
- Custom Atlas purple theming
- Subscription management

### 4. Customer Portal
- Atlas CustomerPortalComponent
- Billing management
- Subscription controls

## 🚀 Deployment

The application is ready for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically with git pushes

## 🤝 Contributing

This is an internal demo application. For Atlas SDK issues or feature requests, please refer to the Atlas documentation.

## 📄 License

Internal use only - Atlas SDK demonstration purposes.
