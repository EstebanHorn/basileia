import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppProvider } from '@/lib/app-context';
import ParalelosScreen from './ParalelosScreen';
import type { CitaAT, Paralelo } from '@/lib/content/types';

const citas: CitaAT[] = [{ id: 'cita-1-23', referencia: 'Isaías 7:14', nota: 'Nota de prueba', capitulos: [1] }];
const paralelos: Paralelo[] = [{ id: 'par-3-1', referencia: 'Marcos 1:1-8; Lucas 3:1-18', nota: 'Otra nota', capitulos: [3] }];

function renderWithApp(ui: React.ReactElement) {
  return render(<AppProvider lang="es">{ui}</AppProvider>);
}

describe('ParalelosScreen', () => {
  it('agrupa citas y paralelos por capítulo', () => {
    renderWithApp(<ParalelosScreen citas={citas} paralelos={paralelos} />);

    expect(screen.getByText('Isaías 7:14')).toBeInTheDocument();
    expect(screen.getByText('Marcos 1:1-8; Lucas 3:1-18')).toBeInTheDocument();
    expect(screen.getByText('Mateo 1 →')).toBeInTheDocument();
    expect(screen.getByText('Mateo 3 →')).toBeInTheDocument();
  });
});
