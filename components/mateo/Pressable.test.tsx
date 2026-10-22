import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pressable from './Pressable';

describe('Pressable', () => {
  it('dispara onClick al hacer click', () => {
    const onClick = vi.fn();
    render(<Pressable onClick={onClick}>Click</Pressable>);

    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('es un <button> enfocable por teclado (Enter lo activa de forma nativa)', () => {
    render(<Pressable>Click</Pressable>);
    const el = screen.getByText('Click');
    expect(el.tagName).toBe('BUTTON');
    expect(el).toHaveAttribute('type', 'button');
  });

  it('acepta aria-label y lo expone', () => {
    render(<Pressable aria-label="cerrar">×</Pressable>);
    expect(screen.getByLabelText('cerrar')).toBeInTheDocument();
  });
});
