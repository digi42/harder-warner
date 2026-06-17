// Staff notifications for form/order submissions.
//
// TODO: wire up Cloudflare Email Sending once the EMAIL binding is provisioned.
//   - Add `send_email` binding in wrangler.jsonc
//   - Compose with mimetext + cloudflare:email EmailMessage
// Until then this logs the notification. The submission itself is always
// persisted to D1 first, so nothing is lost if email isn't configured.

export interface EmailNotification {
  subject: string;
  text: string;
  /** override the default NOTIFY_EMAIL recipient */
  to?: string;
}

export async function notifyStaff(env: Env, n: EmailNotification): Promise<void> {
  const to = n.to ?? env.NOTIFY_EMAIL;
  try {
    // if (env.EMAIL) { ...send via Cloudflare Email Sending... }
    console.log(`[notify → ${to}] ${n.subject}\n${n.text}`);
  } catch (err) {
    // Never let a notification failure break the user's submission.
    console.error('notifyStaff failed:', err);
  }
}
