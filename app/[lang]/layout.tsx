import type { Metadata } from "next";
import { Anton, Caveat, Inter, Lora, Playfair_Display, Special_Elite } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getSiteUrl } from "@/lib/site";
import { OG_LOCALE } from "@/lib/seo";
import { AuthProvider } from "@/lib/supabase/auth-context";
import { AppProvider } from "@/lib/app-context";
import AppChrome from "@/components/mateo/AppChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Tipografías del estilo "periódico": titulares condensados, titulares serif,
// máquina de escribir y notas a mano.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});
const typewriter = Special_Elite({ variable: "--font-typewriter", subsets: ["latin"], weight: "400" });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: { template: `%s - ${dict.meta.title}`, default: dict.meta.title },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `/${locale}`]),
      ),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: dict.meta.title,
      locale: OG_LOCALE[lang as keyof typeof OG_LOCALE] ?? "es_AR",
      images: ["/icon.png"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/icon.png"],
    },
  };
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
    <html lang={lang} className={`${inter.variable} ${lora.variable} ${anton.variable} ${playfair.variable} ${typewriter.variable} ${caveat.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <AppProvider lang={lang}>
            <AppChrome>{children}</AppChrome>
          </AppProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
