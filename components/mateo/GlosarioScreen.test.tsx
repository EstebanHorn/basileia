import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '@/lib/app-context';
import GlosarioScreen from './GlosarioScreen';
import type { GlosarioTermino } from '@/lib/content/types';

const terminos: GlosarioTermino[] = [
  {
    id: 'g1',
    griego: 'μακάριος',
    lema: 'μακάριος',
    morfologia: 'adjetivo, nominativo singular masculino',
    transliteracion: 'makarios',
    significado: 'dichoso',
    palabra: 'dichosos',
    nota: '',
    capitulos: [5],
  },
  {
    id: 'g2',
    griego: 'βασιλεία',
    lema: 'βασιλεία',
    morfologia: 'sustantivo, nominativo singular femenino',
    transliteracion: 'basileia',
    significado: 'reino',
    palabra: 'reino',
    nota: '',
    capitulos: [5, 6],
  },
];

function renderWithApp(ui: React.ReactElement) {
  return render(<AppProvider lang="es">{ui}</AppProvider>);
}

describe('GlosarioScreen', () => {
  it('lista todos los términos sin filtro', () => {
    renderWithApp(<GlosarioScreen terminos={terminos} />);
    expect(screen.getByText('makarios')).toBeInTheDocument();
    expect(screen.getByText('basileia')).toBeInTheDocument();
  });

  it('filtra por el texto de búsqueda', () => {
    renderWithApp(<GlosarioScreen terminos={terminos} />);
    const input = screen.getByPlaceholderText('Buscar término...');

    fireEvent.change(input, { target: { value: 'basileia' } });

    expect(screen.getByText('basileia')).toBeInTheDocument();
    expect(screen.queryByText('makarios')).not.toBeInTheDocument();
  });
});
