export interface ProjectExperience {
  slug: string;
  title: string;
  attribution: string;
  overview: string;
  details: string;
  industry: string;
  capabilities: string[];
  seoDescription: string;
  website: string;
  companyWebsite: string;
  imageUrl: string;
  order: number;
}

interface FirestoreValue {
  stringValue?: string;
  booleanValue?: boolean;
  integerValue?: string;
  arrayValue?: { values?: FirestoreValue[] };
}

interface FirestoreDocument {
  name: string;
  fields?: Record<string, FirestoreValue>;
}

interface FirestoreResponse {
  documents?: FirestoreDocument[];
  nextPageToken?: string;
}

function safeUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
  } catch {
    return '';
  }
}

export async function getProjectExperience(): Promise<ProjectExperience[]> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey) throw new Error('Firestore configuration is missing');

  const baseUrl = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/project-experience`;
  const projects: ProjectExperience[] = [];
  let pageToken = '';
  do {
    const params = new URLSearchParams({ key: apiKey, pageSize: '100' });
    if (pageToken) params.set('pageToken', pageToken);
    const response = await fetch(`${baseUrl}?${params}`, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`Firestore projects request failed: HTTP ${response.status}`);
    const data: FirestoreResponse = await response.json();

    for (const document of data.documents || []) {
      const fields = document.fields || {};
      if (fields.published?.booleanValue !== true) continue;
      const slug = fields.slug?.stringValue?.trim() || '';
      const title = fields.title?.stringValue?.trim() || '';
      const attribution = fields.attribution?.stringValue?.trim() || '';
      const overview = fields.overview?.stringValue?.trim() || '';
      const id = document.name.split('/').pop();
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || id !== slug || !title || !attribution || !overview) {
        console.error('Skipping invalid published project:', document.name.split('/').pop());
        continue;
      }
      const website = fields.website?.stringValue || '';
      const companyWebsite = fields.companyWebsite?.stringValue || '';
      const imageUrl = fields.imageUrl?.stringValue || '';
      if ((website && !safeUrl(website)) || (companyWebsite && !safeUrl(companyWebsite)) || (imageUrl && !safeUrl(imageUrl))) {
        console.error('Ignoring invalid project URL:', id);
      }
      const order = Number(fields.order?.integerValue);
      projects.push({
        slug,
        title,
        attribution,
        overview,
        details: fields.details?.stringValue?.trim() || '',
        industry: fields.industry?.stringValue?.trim() || '',
        capabilities: (fields.capabilities?.arrayValue?.values || [])
          .map((value) => value.stringValue?.trim() || '')
          .filter(Boolean),
        seoDescription: fields.seoDescription?.stringValue?.trim() || '',
        website: safeUrl(website),
        companyWebsite: safeUrl(companyWebsite),
        imageUrl: safeUrl(imageUrl),
        order: Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER,
      });
    }
    pageToken = data.nextPageToken || '';
  } while (pageToken);

  return projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
