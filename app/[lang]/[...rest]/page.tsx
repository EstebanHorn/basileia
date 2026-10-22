import type { Metadata } from 'next';
import NotFoundScreen from '@/components/mateo/NotFoundScreen';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function CatchAll() {
  return <NotFoundScreen />;
}
