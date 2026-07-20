'use client';

import { useEffect, useState } from 'react';
import { DARK, LIGHT, Screen } from '@/lib/theme';
import { MapPlace } from '@/lib/mateo-data';
import { usePersistedState, writePersistedState } from '@/lib/persisted-state';
import { useAuth } from '@/lib/supabase/auth-context';
import { useNotes } from '@/lib/supabase/use-notes';
import TopNav from './TopNav';
import AuthModal from './AuthModal';
import InicioScreen from './InicioScreen';
import IndiceScreen from './IndiceScreen';
import CapituloScreen from './CapituloScreen';
import MapaScreen from './MapaScreen';
import PersonajesScreen from './PersonajesScreen';
import GlosarioScreen from './GlosarioScreen';
import ContextoScreen from './ContextoScreen';
import NotasScreen from './NotasScreen';

export default function MateoApp() {
  const persisted = usePersistedState();
  const { theme, lastChapter, readChapters } = persisted;
  const { user, signOut } = useAuth();
  const { notes, saveNote, locked: notesLocked } = useNotes();

  const [screen, setScreen] = useState<Screen>('inicio');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [indexFilter, setIndexFilter] = useState('all');
  const [soloTexto, setSoloTexto] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const [openTerm, setOpenTerm] = useState<string | null>(null);
  const [personajeFilter, setPersonajeFilter] = useState('todos');
  const [openCharacter, setOpenCharacter] = useState<string | null>(null);
  const [mapSelected, setMapSelected] = useState<MapPlace | null>(null);
  const [glosarioQuery, setGlosarioQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 860);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const colors = theme === 'dark' ? DARK : LIGHT;

  const goTo = (s: Screen) => {
    setScreen(s);
    setMapSelected(null);
    setMobileMenuOpen(false);
  };

  const goToChapter = (n: number) => {
    setScreen('capitulo');
    setCurrentChapter(n);
    setContextOpen(false);
    setOpenTerm(null);
    writePersistedState({ lastChapter: n });
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: 'var(--font-inter), sans-serif', transition: 'background .2s,color .2s' }}>
      <TopNav
        colors={colors}
        screen={screen}
        onNavigate={goTo}
        onGoInicio={() => goTo('inicio')}
        theme={theme}
        onToggleTheme={() => writePersistedState({ theme: theme === 'dark' ? 'light' : 'dark' })}
        isMobile={isMobile}
        mobileMenuOpen={isMobile && mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
        onOpenLogin={() => {
          setAuthModal(true);
          setAuthMode('login');
          setMobileMenuOpen(false);
        }}
        onOpenRegister={() => {
          setAuthModal(true);
          setAuthMode('register');
          setMobileMenuOpen(false);
        }}
        userLabel={user ? user.user_metadata?.nombre || user.email || null : null}
        onLogout={signOut}
      />

      {authModal && (
        <AuthModal
          colors={colors}
          mode={authMode}
          onClose={() => setAuthModal(false)}
          onSetLoginMode={() => setAuthMode('login')}
          onSetRegisterMode={() => setAuthMode('register')}
        />
      )}

      {screen === 'inicio' && (
        <InicioScreen
          colors={colors}
          lastChapter={lastChapter}
          onContinue={() => goToChapter(lastChapter)}
          onGoToChapter={goToChapter}
          onGoMapa={() => goTo('mapa')}
          onGoPersonajes={() => goTo('personajes')}
          onGoGlosario={() => goTo('glosario')}
          onGoContexto={() => goTo('contexto')}
        />
      )}

      {screen === 'indice' && (
        <IndiceScreen colors={colors} indexFilter={indexFilter} onSetIndexFilter={setIndexFilter} onGoToChapter={goToChapter} />
      )}

      {screen === 'capitulo' && (
        <CapituloScreen
          colors={colors}
          currentChapter={currentChapter}
          onGoToChapter={goToChapter}
          isMobile={isMobile}
          soloTexto={soloTexto}
          onToggleSoloTexto={() => setSoloTexto((v) => !v)}
          openTerm={openTerm}
          onSetOpenTerm={setOpenTerm}
          contextOpen={contextOpen}
          onToggleContext={() => setContextOpen((v) => !v)}
          notes={notes[currentChapter] || ''}
          onNotesChange={(value) => saveNote(currentChapter, value)}
          notesLocked={notesLocked}
          onOpenLogin={() => {
            setAuthModal(true);
            setAuthMode('login');
          }}
          onOpenRegister={() => {
            setAuthModal(true);
            setAuthMode('register');
          }}
        />
      )}

      {screen === 'mapa' && (
        <MapaScreen colors={colors} mapSelected={mapSelected} onSelect={setMapSelected} onGoToChapter={goToChapter} />
      )}

      {screen === 'personajes' && (
        <PersonajesScreen
          colors={colors}
          filter={personajeFilter}
          onSetFilter={setPersonajeFilter}
          openCharacter={openCharacter}
          onSetOpenCharacter={setOpenCharacter}
          onGoToChapter={goToChapter}
        />
      )}

      {screen === 'glosario' && (
        <GlosarioScreen colors={colors} query={glosarioQuery} onQueryChange={setGlosarioQuery} onGoToChapter={goToChapter} />
      )}

      {screen === 'contexto' && <ContextoScreen colors={colors} />}

      {screen === 'notas' && (
        <NotasScreen
          colors={colors}
          readChapters={readChapters}
          onToggleRead={(n) => writePersistedState({ readChapters: { ...readChapters, [n]: !readChapters[n] } })}
          notes={notes}
          onGoToChapter={goToChapter}
        />
      )}
    </div>
  );
}
