const request = require('supertest');
const { app } = require('../server');

describe('Server API Endpoints', () => {
    test('GET / should return server info', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);

        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status', 'healthy');
    });

    test('GET /api/health should return health status', async () => {
        const response = await request(app)
            .get('/api/health')
            .expect(200);

        expect(response.body).toHaveProperty('status', 'OK');
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('uptime');
    });

    test('GET /api/messages should return messages array', async () => {
        const response = await request(app)
            .get('/api/messages')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/users should return users array', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /nonexistent should return 404', async () => {
        const response = await request(app)
            .get('/nonexistent')
            .expect(404);

        expect(response.body).toHaveProperty('error', 'Route not found');
    });
});