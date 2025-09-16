import '@testing-library/jest-dom';

// Mock socket.io-client
vi.mock('socket.io-client', () => ({
    io: vi.fn(() => ({
        connect: vi.fn(),
        disconnect: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
        connected: false,
        id: 'test-socket-id',
    })),
}));

// Mock environment config
vi.mock('../config/environment', () => ({
    config: {
        serverUrl: 'http://localhost:5001',
        nodeEnv: 'test',
        appName: 'Socket.io Chat',
        appVersion: '1.0.0',
        isDevelopment: false,
        isProduction: false,
    },
}));