const ZAPIER_REGISTRATION_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/22576273/uqtzyqb/';
const N8N_REGISTRATION_WEBHOOK = 'https://nathanfsa44.app.n8n.cloud/webhook/phil-workshop-registration';

/**
 * Returns the registration webhook URL for the current page.
 * /webinarn8n posts to n8n; every other funnel keeps using Zapier.
 */
export const getRegistrationWebhookUrl = (): string => {
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') : '';
  if (path === '/webinarn8n') return N8N_REGISTRATION_WEBHOOK;
  return ZAPIER_REGISTRATION_WEBHOOK;
};

/**
 * Dedicated Zapier webhook for the /base44 coach-callback funnel.
 * Intentionally separate from the workshop Zap (which sends workshop reminders).
 * Swap the placeholder for the real URL — nothing else needs to change.
 */
export const BASE44_ZAPIER_WEBHOOK = '[PLACEHOLDER — base44 Zapier webhook URL]';

export const isBase44WebhookConfigured = (): boolean =>
  /^https?:\/\//i.test(BASE44_ZAPIER_WEBHOOK);
