'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useApp } from '@/lib/app-context';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSetLoginMode: () => void;
  onSetRegisterMode: () => void;
}

export default function AuthModal({ mode, onClose, onSetLoginMode, onSetRegisterMode }: AuthModalProps) {
  const { colors, dict } = useApp();
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 13px',
    marginBottom: 10,
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    background: colors.bg,
    color: colors.text,
    fontSize: 14,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.45)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.panel,
          borderRadius: 14,
          padding: '30px 28px',
          width: '100%',
          maxWidth: 380,
          boxShadow: '0 20px 50px rgba(0,0,0,.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--font-lora), serif', fontSize: 21, fontWeight: 600 }}>{title}</div>
          <div onClick={onClose} style={{ cursor: 'pointer', color: colors.muted, fontSize: 20, lineHeight: 1 }}>
            ×
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 4,
            background: colors.subtle,
            borderRadius: 9,
            padding: 4,
            marginBottom: 20,
          }}
        >
          <div
            onClick={() => switchMode(onSetLoginMode)}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: 8,
              borderRadius: 7,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              background: !isRegister ? colors.panel : 'transparent',
              color: !isRegister ? colors.accent : colors.muted,
            }}
          >
            {dict.auth.loginTab}
          </div>
          <div
            onClick={() => switchMode(onSetRegisterMode)}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: 8,
              borderRadius: 7,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              background: isRegister ? colors.panel : 'transparent',
              color: isRegister ? colors.accent : colors.muted,
            }}
          >
            {dict.auth.registerTab}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              placeholder={dict.auth.namePlaceholder}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder={dict.auth.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder={dict.auth.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ ...inputStyle, marginBottom: 18 }}
          />

          {error && (
            <div style={{ fontSize: 13, color: colors.accent, marginBottom: 14, lineHeight: 1.4 }}>{error}</div>
          )}
          {info && (
            <div style={{ fontSize: 13, color: colors.muted, marginBottom: 14, lineHeight: 1.4 }}>{info}</div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              textAlign: 'center',
              background: colors.accent,
              color: '#fff',
              padding: 12,
              borderRadius: 9,
              fontWeight: 600,
              fontSize: 14.5,
              cursor: submitting ? 'default' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              border: 'none',
            }}
          >
            {submitting ? dict.auth.submitting : cta}
          </button>
        </form>
      </div>
    </div>
  );
}
