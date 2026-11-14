# Technatonix Website

The Technatonix marketing website is a Next.js application for presenting the
company's services and KREVIX ERP product, publishing blog posts and case
studies, and collecting contact inquiries.

## Features

- Marketing pages for the company, services, and products
- A dedicated AI automation offering at `/ai-automation`, with an automation-specific contact prompt
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

## Projects and case studies

The homepage, project listing, detail pages and sitemap read published documents
from the Firestore collection `project-experience` on each request. To add or
edit a project, use the Firebase console; no website deployment is needed.
Create a document with these fields:

| Field | Firestore type | Description |
| --- | --- | --- |
| Document ID | — | A unique lowercase hyphenated slug, e.g. `example-project` |
| `slug` | string | Must match the document ID exactly |
| `title` | string | Project title |
| `attribution` | string | Relationship, e.g. `Personal experience` or `Technatonix project` |
| `overview` | string | Project description |
| `details` | string | Optional longer description displayed on the project page |
| `industry` | string | Optional industry or target market |
| `capabilities` | array of strings | Optional product capabilities displayed on the project page |
| `seoDescription` | string | Optional concise search-engine description; defaults to `overview` |
| `published` | boolean | Set to `true` to show the project |
| `order` | number | Optional integer; lower numbers appear first. The first three appear on the homepage. |
| `website` | string | Optional public `https://` or `http://` project link |
| `companyWebsite` | string | Optional public `https://` or `http://` company link |
| `imageUrl` | string | Optional public `https://` or `http://` image link; leave empty to show a placeholder |

Use an image with a 1920 × 1080 (16:9) aspect ratio. The responsive image frame
shows the entire image without cropping. Firebase Storage download URLs must be
publicly accessible to visitors. Existing `case-studies` records are not shown
on the public project pages; their unverified claims have not been deleted.

The Firestore rules must permit public reads of `project-experience` while
restricting writes to authorized administrators. Firebase web API keys are not
authentication and do not protect the collection.

## Search indexing

`/sitemap.xml` lists canonical public pages, the service detail routes, and
published entries from the Firestore `project-experience` and `blogs`
collections. It returns an error rather than a partial sitemap if a data source
is unavailable. Large sitemaps are split into indexed parts. The existing
`public/robots.txt` directives advertise the production sitemap.

The KREVIX ERP and EFWRSX Cloud views are tabs on `/products`, not separate
routes. Project modification dates use Firestore document update times; blog
dates use their stored `updatedAt` values when available. Keep the Google
verification file in `public/` so ownership verification remains valid.

## Social sharing metadata

The shared `SEOHead` component uses `lib/site-metadata.ts` for canonical
production URLs, page-specific sharing text, and the branded 1200 x 630 images
in `public/images/og/`. Public page metadata is rendered in the initial HTML.
Published blog posts use validated featured images when available; otherwise
`/social-image/blog/[slug]` generates a title-specific preview. Project pages
use a validated featured image when available and the default image otherwise.
Featured images must be publicly accessible JPEG or PNG files of at least
600 x 315 pixels, hosted in the site's `/images/` directory or Firebase
Storage. Check image availability after changing or deleting an asset.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run Next.js linting |
| `npm run type-check` | Check TypeScript types |
| `node --test tests/sitemap-xml.test.cjs` | Test sitemap XML generation and limits |

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
