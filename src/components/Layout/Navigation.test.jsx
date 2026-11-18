import { fireEvent, render, screen } from '@testing-library/react';
import Navigation from './Navigation';

afterEach(() => {
    document.body.style.overflow = '';
});

test('closes the mobile menu with Escape and restores focus', () => {
    render(<Navigation />);

    const backgroundNavigation = screen.getByRole('navigation', { name: /primary navigation/i });
    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(backgroundNavigation).toHaveAttribute('inert');
    expect(document.body.style.overflow).toBe('hidden');

    const closeButton = screen.getByRole('button', { name: /close navigation menu/i });
    const lastItem = screen.getByRole('link', { name: /resume/i });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(lastItem).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(backgroundNavigation).not.toHaveAttribute('inert');
    expect(document.body.style.overflow).toBe('');
    expect(toggle).toHaveFocus();
});

test('restores the existing body overflow when unmounted', () => {
    document.body.style.overflow = 'clip';
    const { unmount } = render(<Navigation />);

    fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('clip');
});
