# Firebase Setup Guide

This document outlines the steps to set up Firebase integration for the Technatonix website.

## Prerequisites

1. Google/Firebase account
2. Firebase CLI installed globally: `npm install -g firebase-tools`

## Step 1: Create Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `technatonix-website`
4. Enable Google Analytics (optional)
5. Select your Analytics account or create a new one

## Step 2: Enable Required Services

### Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location closest to your users

### Authentication (if needed for admin features)
1. Go to "Authentication" > "Sign-in method"
2. Enable desired providers (Email/Password recommended for admin)

### Storage (if needed for file uploads)
1. Go to "Storage"
2. Click "Get started"
3. Accept security rules
4. Choose same location as Firestore

## Step 3: Get Configuration Keys

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" > "Web"
4. Register app with name "Technatonix Website"
5. Copy the configuration object

## Step 4: Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin SDK (for server-side operations)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----"

# Admin login
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=use_a_strong_unique_password

# reCAPTCHA (for form protection)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Optional absolute site URL (defaults to http://localhost:3000)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Step 5: Service Account for Admin SDK

1. In Firebase Console, go to Project Settings > Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the required values for environment variables:
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY`

## Step 6: Firestore Security Rules

Update your Firestore rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to leads collection from server-side only
    match /leads/{document} {
      allow read, write: if false; // Only admin SDK can access
    }
    
    // Add other collections as needed
    match /{document=**} {
      allow read, write: if false; // Deny all by default
    }
  }
}
```

## Step 7: reCAPTCHA Setup

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Click "Admin Console"
3. Add a new site with:
   - Label: "Technatonix Website"
   - reCAPTCHA type: "v2 Checkbox"
   - Domains: Add your domain(s)
4. Copy the Site Key and Secret Key to your environment variables

## Step 8: Database Collections

Your Firestore will need these collections:

### `leads` Collection
```typescript
{
  name: string;
  email: string;
  company?: string;
  country: string;
  phone?: string;
  shortMessage: string;
  budgetBracket?: string;
  timeframe?: string;
  details?: string;
  source?: string;
  utm?: Record<string, string>;
  status: 'new' | 'qualified' | 'contacted' | 'converted';
  createdAt: Timestamp;
}
```

## Step 9: Testing

1. Replace the mock functions in `/pages/api/leads.ts` with actual Firebase calls
2. Test the contact form submission
3. Verify data appears in Firestore Console

## Step 10: Deployment Considerations

### Vercel Deployment
1. Add all environment variables to your Vercel project settings
2. Make sure to escape the private key properly in Vercel
3. Deploy and test in production

### Security Checklist
- [ ] Environment variables are not committed to git
- [ ] Firestore rules are properly configured
- [ ] reCAPTCHA is working
- [ ] Admin SDK credentials are secure
- [ ] API rate limiting is in place

## Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check that all environment variables are set correctly
   - Verify the configuration object matches your Firebase project

2. **"Permission denied" errors**
   - Review Firestore security rules
   - Ensure you're using admin SDK for server-side operations

3. **reCAPTCHA not working**
   - Verify domain is added to reCAPTCHA configuration
   - Check site key is correct in environment variables

4. **Admin SDK authentication failed**
   - Ensure private key is properly formatted with newlines
   - Verify service account has proper permissions

## Next Steps

1. Replace mock functions in API routes with actual Firebase calls
2. Set up monitoring and logging
3. Configure backup strategies
4. Set up proper error handling and user notifications

For additional help, refer to the [Firebase Documentation](https://firebase.google.com/docs) or contact the development team.
