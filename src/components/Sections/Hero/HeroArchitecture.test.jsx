import { fireEvent, render, screen } from '@testing-library/react';
import HeroArchitecture from './HeroArchitecture';

test('updates architecture details for keyboard focus', () => {
    render(<HeroArchitecture reducedMotion />);

    fireEvent.focus(screen.getByRole('button', { name: /explore ai \/ ml architecture layer/i }));

    expect(screen.getByText(/prediction workflows/i)).toBeInTheDocument();
});
