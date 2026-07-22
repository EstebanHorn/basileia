import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { hasLocale, locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { AuthProvider } from '@/lib/supabase/auth-context';
import { AppProvider } from '@/lib/app-context';
import AppChrome from '@/components/mateo/AppChrome';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${inter.variable} ${lora.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <AppProvider lang={lang}>
            <AppChrome>{children}</AppChrome>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
