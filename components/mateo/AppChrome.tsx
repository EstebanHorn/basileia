'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import TopNav from './TopNav';
import AuthModal from './AuthModal';
import Footer from './Footer';

export default function AppChrome({ children }: { children: ReactNode }) {
  const { colors, theme, lang, authModal, authMode, openAuthModal, closeAuthModal } = useApp();
  const pathname = usePathname();
  const isFullBleed = pathname === `/${lang}/mapa`;
  const isHome = pathname === `/${lang}`;

  return (
    <div
      // El mapa ya es una ilustración antigua; el grano encima lo lavaba.
      className={`${theme === 'dark' ? 'np-dark' : 'np-light'}${isFullBleed ? '' : ' np-grain'}`}
      style={{
        height: isFullBleed ? '100vh' : undefined,
        minHeight: isFullBleed ? undefined : '100vh',
        overflow: isFullBleed ? 'hidden' : undefined,
        display: 'flex',
        flexDirection: 'column',
        background: colors.bg,
        color: colors.text,
        fontFamily: 'var(--font-lora), Georgia, serif',
        transition: 'background .3s,color .3s',
      }}
    >
      {/* Portada: cabecera gigante. Mapa: sin cabecera. Resto: cabecera mediana. */}
      <TopNav variant={isHome ? 'home' : isFullBleed ? 'compact' : 'page'} />

      {authModal && (
        <AuthModal
          mode={authMode}
          onClose={closeAuthModal}
          onSetLoginMode={() => openAuthModal('login')}
          onSetRegisterMode={() => openAuthModal('register')}
        />
      )}

      <main style={{ flex: 1, display: isFullBleed ? 'flex' : undefined, minHeight: 0 }}>{children}</main>

      {!isFullBleed && <Footer />}
    </div>
  );
}
