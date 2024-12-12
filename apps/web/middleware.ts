import { authMiddleware } from '@repo/auth/middleware';
import { env } from '@repo/env';
import { parseError } from '@repo/observability/error';
import { secure } from '@repo/security';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { i18n } from './i18n.config';

// Create internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

// Combine auth and internationalization middleware
export default authMiddleware(async (_auth, request) => {
  // Handle internationalization first
  const response = await intlMiddleware(request);
  if (response) return response;

  if (!env.ARCJET_KEY) {
    return NextResponse.next();
  }

  try {
    await secure(
      [
        // See https://docs.arcjet.com/bot-protection/identifying-bots
        'CATEGORY:SEARCH_ENGINE', // Allow search engines
        'CATEGORY:PREVIEW', // Allow preview links to show OG images
        'CATEGORY:MONITOR', // Allow uptime monitoring services
      ],
      request
    );

    return NextResponse.next();
  } catch (error) {
    const message = parseError(error);

    return NextResponse.json({ error: message }, { status: 403 });
  }
});
