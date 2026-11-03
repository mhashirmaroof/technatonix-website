# Technatonix Website

The Technatonix marketing website is a Next.js application for presenting the
company's services and KREVIX ERP product, publishing blog posts and case
studies, and collecting contact inquiries.

## Features

- Marketing pages for the company, services, and products
- Blog and case study listings and detail pages
- Contact form with a lead-submission API
- Admin pages and API routes for managing site content
- Firebase client and server-side integrations
- Sitemap, SEO metadata, and legal pages

## Tech stack

- Next.js 14 with the Pages Router
- React 18 and TypeScript
- Firebase / Firestore
- Sass modules and Tailwind CSS

## Getting started

### Prerequisites

- Node.js and npm
- A Firebase project for features that use Firebase

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment variables

Create a `.env.local` file in the project root. Add the Firebase web app values
used by the client, contact API, and data-upload script:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Server-side Firebase Admin SDK features also use a service account:

```dotenv
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

For `FIREBASE_ADMIN_PRIVATE_KEY`, provide the service account private key and
preserve its newline formatting (escaped `\n` sequences are supported). The
`RECAPTCHA_SECRET_KEY` variable is used for server-side reCAPTCHA verification.
Set `NEXT_PUBLIC_BASE_URL` to the site's absolute URL when building or
deploying; it defaults to `http://localhost:3000`. Copy `.env.example` to
`.env.local` as a starting template.

Firebase web configuration is used by browser-side code and is not a substitute
for securing Firestore with appropriate rules. Keep service-account credentials
private, and do not commit `.env.local` or other environment files.

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for Firebase project setup details.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run Next.js linting |
| `npm run type-check` | Check TypeScript types |

## Project layout

```text
components/   Shared layout, navigation, and UI components
data/         Site data and content helpers
lib/          Firebase and admin-related integrations
pages/        Public pages and API routes
public/       Static assets served from the site root
scripts/      Supporting data upload scripts
styles/       Global styles and Sass modules
types/        Shared TypeScript types
```

## Deployment

The project includes a `vercel.json` configuration and can be deployed to
Vercel. Configure the required environment variables in the deployment
environment before building. Keep Firebase service-account values server-side
and apply the appropriate Firebase security rules for the deployed application.
