import { Resend } from 'resend';

export interface LeadNotificationInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  stateCountry?: string;
  projectType?: string;
  message: string;
  details?: string;
  submittedAt: Date;
}

const EMAIL_TIMEOUT_MS = 5000;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Header values must never contain line breaks
const singleLine = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Karachi'
  }).format(date);

const buildHtml = (lead: LeadNotificationInput): string => {
  const rows: Array<[string, string, boolean?]> = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone || ''],
    ['Company', lead.company || ''],
    ['State & Country', lead.stateCountry || ''],
    ['Project Type', lead.projectType || ''],
    ['Submitted', formatDate(lead.submittedAt)]
  ];

  const rowsHtml = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  const block = (title: string, text: string) => `
    <div style="padding:20px 24px 0;">
      <div style="font-size:13px;color:#6b7280;margin-bottom:6px;">${escapeHtml(title)}</div>
      <div style="background:#f3f4f6;border-radius:8px;padding:14px 16px;color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(text)}</div>
    </div>`;

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#0b1220;padding:24px;">
        <div style="color:#34d399;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Technatonix</div>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;">New Website Enquiry</h1>
        <div style="margin-top:6px;color:#9ca3af;font-size:13px;">A new enquiry has been submitted through the Technatonix contact form.</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsHtml}</table>
      ${block('Message', lead.message)}
      ${lead.details ? block('Additional Details', lead.details) : ''}
      <div style="padding:24px;color:#6b7280;font-size:12px;">
        Reply to this email to respond directly to ${escapeHtml(lead.name)}.<br />
        Technatonix &middot; Lahore, Pakistan &middot; technatonix.com
      </div>
    </div>
  </body>
</html>`;
};

const buildText = (lead: LeadNotificationInput): string =>
  [
    'New Website Enquiry',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.company && `Company: ${lead.company}`,
    lead.stateCountry && `State & Country: ${lead.stateCountry}`,
    lead.projectType && `Project Type: ${lead.projectType}`,
    `Submitted: ${formatDate(lead.submittedAt)}`,
    '',
    'Message:',
    lead.message,
    lead.details && `\nAdditional Details:\n${lead.details}`
  ]
    .filter((line): line is string => typeof line === 'string' && line !== '')
    .join('\n');

export type NotificationResult = { status: 'sent' | 'failed'; error?: string };

// Never throws: a failed email must not affect the already-saved lead
export const sendLeadNotification = async (lead: LeadNotificationInput): Promise<NotificationResult> => {
  const apiKey = process.env.API_KEY_Resend;

  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !to) {
    return {
      status: 'failed',
      error: 'Email is not configured (API_KEY_Resend, RESEND_FROM_EMAIL, LEAD_NOTIFICATION_EMAIL)'
    };
  }

  try {
    const resend = new Resend(apiKey);

    const sendPromise = resend.emails.send({
      from,
      to: [to],
      replyTo: lead.email,
      subject: `New Website Enquiry – ${singleLine(lead.name).slice(0, 80)}`,
      html: buildHtml(lead),
      text: buildText(lead)
    });

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Email request timed out')), EMAIL_TIMEOUT_MS)
    );

    const { error } = await Promise.race([sendPromise, timeout]);

    if (error) {
      return { status: 'failed', error: `${error.name}: ${error.message}` };
    }

    return { status: 'sent' };
  } catch (err: any) {
    return { status: 'failed', error: err?.message || 'Unknown email error' };
  }
};
