import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../utils/test-utils';
import Header from '../Header';

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains the logo', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /photography/i })).toBeInTheDocument();
  });
});