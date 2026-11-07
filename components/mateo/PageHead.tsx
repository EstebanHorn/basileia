import type { ReactNode } from 'react';

// Cabecera de sección estilo diario: antetítulo, título enorme y bajada.
export default function PageHead({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="np-pagehead">
      <div className="np-kicker">{kicker}</div>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}
