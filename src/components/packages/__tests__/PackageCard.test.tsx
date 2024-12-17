import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../utils/test-utils';
import PackageCard from '../PackageCard';

describe('PackageCard', () => {
  const mockPackage = {
    id: '1',
    name: 'Test Package',
    description: 'Test description',
    price: 100,
    features: ['Feature 1', 'Feature 2']
  };

  const mockOnBook = vi.fn();

  it('renders package details correctly', () => {
    render(<PackageCard package={mockPackage} onBook={mockOnBook} index={0} />);
    
    expect(screen.getByText('Test Package')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('calls onBook when book button is clicked', () => {
    render(<PackageCard package={mockPackage} onBook={mockOnBook} index={0} />);
    
    const bookButton = screen.getByText(/book now/i);
    fireEvent.click(bookButton);
    
    expect(mockOnBook).toHaveBeenCalledTimes(1);
  });
});