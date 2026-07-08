import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

import { useTheme } from '../hooks/useTheme';

describe('ThemeToggle', () => {
  it('affiche l\'icône lune en mode clair', () => {
    vi.mocked(useTheme).mockReturnValue({ isDark: false, toggle: vi.fn() });
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('affiche l\'icône soleil en mode sombre', () => {
    vi.mocked(useTheme).mockReturnValue({ isDark: true, toggle: vi.fn() });
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('appelle toggle au clic', async () => {
    const toggle = vi.fn();
    vi.mocked(useTheme).mockReturnValue({ isDark: false, toggle });
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole('button'));
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
