'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useApp } from '@/lib/app-context';
import Pressable from './Pressable';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSetLoginMode: () => void;
  onSetRegisterMode: () => void;
}

export default function AuthModal({ mode, onClose, onSetLoginMode, onSetRegisterMode }: AuthModalProps) {
  const { colors, dict, lang } = useApp();
  const { signIn, signUp } = useAuth();
  const isRegister = mode === 'register';
  const title = isRegister ? dict.auth.registerTitle : dict.auth.loginTitle;
  const cta = isRegister ? dict.auth.registerCta : dict.auth.loginCta;

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (fn: () => void) => {
    setError(null);
    setInfo(null);
    fn();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setInfo(null);
    setSubmitting(true);

    if (isRegister) {
      const { error: err, needsConfirmation } = await signUp(email, password, nombre);
      setSubmitting(false);
      if (err) {
        setError(err);
        return;
      }
      if (needsConfirmation) {
        setInfo(dict.auth.confirmationMessage);
        return;
      }
      onClose();
      return;
    }

    const { error: err } = await signIn(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    onClose();
  };

  const kicker = lang === 'pt' ? 'Ficha de assinatura' : 'Ficha de suscripción';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20,15,10,.55)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'popIn .2s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="np-card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          padding: '24px 24px 26px',
          width: '100%',
          maxWidth: 400,
          boxShadow: `8px 8px 0 ${colors.orange}`,
          animation: 'npPress .35s ease-out backwards',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div className="np-kicker">{kicker}</div>
          <Pressable onClick={onClose} aria-label={dict.ui.cerrar} style={{ color: colors.muted, fontSize: 24, lineHeight: 1, marginTop: -6 }}>
            ×
          </Pressable>
        </div>
        <div className="np-headline" style={{ fontSize: 30, marginBottom: 16, paddingBottom: 12, borderBottom: '4px double var(--rule)' }}>
          {title}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          <Pressable onClick={() => switchMode(onSetLoginMode)} aria-pressed={!isRegister} className="np-chip" style={{ flex: 1, textAlign: 'center' }}>
            {dict.auth.loginTab}
          </Pressable>
          <Pressable onClick={() => switchMode(onSetRegisterMode)} aria-pressed={isRegister} className="np-chip" style={{ flex: 1, textAlign: 'center' }}>
            {dict.auth.registerTab}
          </Pressable>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {isRegister && (
            <input className="np-input" placeholder={dict.auth.namePlaceholder} value={nombre} onChange={(e) => setNombre(e.target.value)} />
          )}
          <input
            className="np-input"
            type="email"
            placeholder={dict.auth.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="np-input"
            type="password"
            placeholder={dict.auth.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          {error && <div style={{ fontSize: 14, color: colors.accent, lineHeight: 1.4 }}>{error}</div>}
          {info && <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.4 }}>{info}</div>}

          <button type="submit" disabled={submitting} className="np-btn" style={{ width: '100%', marginTop: 8 }}>
            {submitting ? dict.auth.submitting : cta}
          </button>
        </form>
      </div>
    </div>
  );
}
