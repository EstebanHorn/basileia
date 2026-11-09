import type { Metadata } from 'next';
import { hasLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { buildMetadata } from '@/lib/seo';
import PageLd from '@/components/mateo/PageLd';
import { getChapterMeta, getSections, isCompleted, MAX_CHAPTER } from '@/lib/content/editorial';
import IndiceScreen from '@/components/mateo/IndiceScreen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({ lang, path: '/indice', title: dict.seo.indice.title, description: dict.seo.indice.description, siteName: dict.meta.title });
}

export default async function IndicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const titles: Record<number, string> = {};
  for (let n = 1; n <= MAX_CHAPTER; n++) {
    const meta = getChapterMeta(lang, n);
    if (meta) titles[n] = meta.title;
  }

  return (
    <>
      <PageLd
        lang={lang}
        path="/indice"
        seoKey="indice"
        items={Object.entries(titles)
          .filter(([n]) => isCompleted(Number(n)))
          .map(([n, name]) => ({ name: `${lang === 'pt' ? 'Mateus' : 'Mateo'} ${n}: ${name}`, path: `/${lang}/capitulo/${n}` }))}
      />
      <IndiceScreen sections={getSections(lang)} titles={titles} />
    </>
  );
}
