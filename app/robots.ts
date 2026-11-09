import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

// Además del allow genérico, se listan explícitamente los crawlers de motores de IA/respuesta
// generativa (GEO): no cambian el resultado (el '*' ya los permite), pero señalan intención.
const AI_USER_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...AI_USER_AGENTS.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
