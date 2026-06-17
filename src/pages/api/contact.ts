import type { APIRoute } from 'astro';
import { verifyTurnstile } from '../../lib/turnstile';
import { notifyStaff } from '../../lib/email';
import { json, isEmail } from '../../lib/http';

// On-demand rendered (Worker endpoint). Reference pattern for all form handlers.
export const prerender = false;

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  const env = locals.runtime.env;
  const form = await request.formData();

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();
  const token = form.get('cf-turnstile-response');

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!isEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!message) errors.message = 'Please enter a message.';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 400);

  const human = await verifyTurnstile(
    typeof token === 'string' ? token : null,
    env.TURNSTILE_SECRET_KEY,
    clientAddress,
  );
  if (!human) {
    return json({ ok: false, errors: { form: 'Verification failed — please try again.' } }, 400);
  }

  await env.DB.prepare(
    `INSERT INTO contact_submissions (name, email, phone, message, created_at)
     VALUES (?, ?, ?, ?, ?)`,
  )
    .bind(name, email, phone || null, message, new Date().toISOString())
    .run();

  await notifyStaff(env, {
    subject: `New contact form submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\n\n${message}`,
  });

  return json({ ok: true });
};
