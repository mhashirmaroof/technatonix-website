# Firebase Dependencies Installation

To complete the Firebase setup, you need to install the Firebase SDK packages.

## Required Firebase Packages

Run these commands to install the necessary Firebase packages:

```bash
# Firebase client SDK (for frontend)
npm install firebase

# Firebase Admin SDK (for server-side operations)  
npm install firebase-admin

# Additional utilities (if needed)
npm install @types/node --save-dev
```

## Alternative: Update package.json directly

Add these dependencies to your `package.json` file:

```json
{
  "dependencies": {
    "firebase": "^10.7.1",
    "firebase-admin": "^12.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.5"
  }
}
```

Then run:
```bash
npm install
```

## Environment Variables Template

Create a `.env.local` file with these variables (fill in your actual values):

```bash
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----"

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

## After Installation

1. The Firebase configuration files are ready in:
   - `lib/firebase.ts` (client-side)
   - `lib/firebase-admin.ts` (server-side)

2. Update the API endpoint to use actual Firebase:
   - Replace mock functions in `pages/api/leads.ts`

3. Test the setup:
   - Try submitting the contact form
   - Check Firestore console for new leads

## Notes

- The Firebase configuration files will have import errors until the packages are installed
- Make sure to add `.env.local` to your `.gitignore` file
- The current `pages/api/leads.ts` uses mock functions that can be replaced once Firebase is set up
