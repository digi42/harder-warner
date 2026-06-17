// Server-side verification of a Cloudflare Turnstile token.
// https://developers.cloudflare.com/turnstile/

const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(
  token: string | null,
  secret: string,
  ip?: string,
): Promise<boolean> {
  // If no secret is configured yet (local dev), don't block submissions.
  if (!secret) return true;
  if (!token) return false;

  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  const res = await fetch(SITEVERIFY, { method: 'POST', body });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}
