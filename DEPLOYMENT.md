# Deployment Guide

## Environment Variables

Before deploying, ensure all environment variables are set in your hosting platform:

### Required Environment Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bmV1dHJhbC1jcmF3ZGFkLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_SqMmkoyrCn3JvusrygGK4qLJdHPwZ7McToM44B9Cda
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Atlas SDK
ATLAS_API_KEY=1d7d8294-8cb6-4d99-aed9-36a4f9d2d6e8

# Application URL (UPDATE THIS TO YOUR DEPLOYED URL)
NEXT_PUBLIC_APP_URL=https://your-deployed-domain.com
```

## Platform-Specific Deployment Instructions

### Vercel
1. Connect your GitHub repository
2. Set environment variables in Project Settings → Environment Variables
3. Deploy

### Netlify
1. Connect your GitHub repository  
2. Set environment variables in Site Settings → Environment Variables
3. Deploy

### Other Platforms
Ensure your platform:
- Runs `npm run build` during build
- Serves from the `.next` directory
- Has Node.js 18+ support

## Troubleshooting Deployment Issues

### 404 NOT_FOUND Error
This typically occurs due to:

1. **Missing Environment Variables**: Ensure all variables above are set
2. **Wrong App URL**: Update `NEXT_PUBLIC_APP_URL` to your deployed domain
3. **Clerk Domain Configuration**: Verify your Clerk app is configured for the deployed domain
4. **Atlas API Key**: Ensure the Atlas API key is valid and has proper permissions

### Build Errors
- Check that all dependencies are in `package.json`
- Verify TypeScript compilation with `npm run build` locally
- Ensure environment variables are available during build

### Authentication Issues
- Verify Clerk publishable key matches your environment
- Check that sign-in/sign-up URLs are correctly configured
- Ensure Clerk domain settings include your deployed URL

## Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] App loads without 404 errors
- [ ] Authentication flow works
- [ ] Atlas components render properly
- [ ] Pricing and features display correctly