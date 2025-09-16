// Environment configuration
export const config = {
    serverUrl: import.meta.env.VITE_SERVER_URL || 'http://localhost:5001',
    nodeEnv: import.meta.env.VITE_NODE_ENV || 'development',
    appName: import.meta.env.VITE_APP_NAME || 'Socket.io Chat',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
};

export default config;