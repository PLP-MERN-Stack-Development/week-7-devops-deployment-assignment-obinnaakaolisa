import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the socket hook
vi.mock('./socket/socket', () => ({
    useSocket: () => ({
        connect: vi.fn(),
        disconnect: vi.fn(),
        isConnected: false,
    }),
}));

describe('App Component', () => {
    it('renders login component when not connected', () => {
        render(<App />);

        // Should show login form when not connected
        expect(screen.getByText(/join the chat/i)).toBeInTheDocument();
    });
});