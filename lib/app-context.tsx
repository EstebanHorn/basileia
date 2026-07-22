'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Colors, DARK, LIGHT } from '@/lib/theme';
import { usePersistedState, writePersistedState } from '@/lib/persisted-state';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary-type';
import esDict from '@/lib/i18n/dictionaries/es';
import ptDict from '@/lib/i18n/dictionaries/pt';

// Los diccionarios contienen funciones (strings parametrizados), así que no pueden
// cruzar el límite servidor→cliente como prop — se importan directamente acá.
const DICTIONARIES: Record<Locale, Dictionary> = { es: esDict, pt: ptDict };

interface AppContextValue {
  colors: Colors;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isMobile: boolean;
  lang: Locale;
  dict: Dictionary;
  authModal: boolean;
  authMode: 'login' | 'register';
  openAuthModal: (mode: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const dict = DICTIONARIES[lang];
  const { theme } = usePersistedState();
  const [isMobile, setIsMobile] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 860);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const colors = theme === 'dark' ? DARK : LIGHT;
  const toggleTheme = () => writePersistedState({ theme: theme === 'dark' ? 'light' : 'dark' });
  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModal(true);
  };
  const closeAuthModal = () => setAuthModal(false);

  return (
    <AppContext.Provider
      value={{ colors, theme, toggleTheme, isMobile, lang, dict, authModal, authMode, openAuthModal, closeAuthModal }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return ctx;
}
