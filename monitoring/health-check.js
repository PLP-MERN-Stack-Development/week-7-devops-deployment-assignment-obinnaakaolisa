// Health check and monitoring utilities

const http = require('http');
const https = require('https');

class HealthChecker {
    constructor(config = {}) {
        this.config = {
            timeout: config.timeout || 5000,
            retries: config.retries || 3,
            interval: config.interval || 30000,
            ...config,
        };
        this.services = new Map();
    }

    // Add a service to monitor
    addService(name, url, options = {}) {
        this.services.set(name, {
            url,
            options: { ...this.config, ...options },
            status: 'unknown',
            lastCheck: null,
            uptime: 0,
            downtime: 0,
        });
    }

    // Check health of a single service
    async checkService(name) {
        const service = this.services.get(name);
        if (!service) {
            throw new Error(`Service ${name} not found`);
        }

        const startTime = Date.now();

        try {
            const result = await this.makeRequest(service.url, service.options);
            const responseTime = Date.now() - startTime;

            service.status = 'healthy';
            service.lastCheck = new Date();
            service.responseTime = responseTime;
            service.uptime += 1;

            return {
                name,
                status: 'healthy',
                responseTime,
                timestamp: service.lastCheck,
            };
        } catch (error) {
            service.status = 'unhealthy';
            service.lastCheck = new Date();
            service.downtime += 1;
            service.error = error.message;

            return {
                name,
                status: 'unhealthy',
                error: error.message,
                timestamp: service.lastCheck,
            };
        }
    }

    // Check all services
    async checkAllServices() {
        const results = [];

        for (const [name] of this.services) {
            try {
                const result = await this.checkService(name);
                results.push(result);
            } catch (error) {
                results.push({
                    name,
                    status: 'error',
                    error: error.message,
                    timestamp: new Date(),
                });
            }
        }

        return results;
    }

    // Get service status
    getServiceStatus(name) {
        return this.services.get(name);
    }

    // Get all services status
    getAllServicesStatus() {
        const status = {};

        for (const [name, service] of this.services) {
            status[name] = {
                status: service.status,
                lastCheck: service.lastCheck,
                uptime: service.uptime,
                downtime: service.downtime,
                responseTime: service.responseTime,
            };
        }

        return status;
    }

    // Make HTTP request
    makeRequest(url, options) {
        return new Promise((resolve, reject) => {
            const client = url.startsWith('https') ? https : http;
            const timeout = setTimeout(() => {
                reject(new Error('Request timeout'));
            }, options.timeout);

            const req = client.get(url, (res) => {
                clearTimeout(timeout);

                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                    });
                } else {
                    reject(new Error(`HTTP ${res.statusCode}`));
                }
            });

            req.on('error', (error) => {
                clearTimeout(timeout);
                reject(error);
            });
        });
    }

    // Start continuous monitoring
    startMonitoring() {
        console.log('Starting health monitoring...');

        const monitor = async () => {
            try {
                const results = await this.checkAllServices();
                console.log('Health check results:', results);

                // Log unhealthy services
                const unhealthy = results.filter(r => r.status !== 'healthy');
                if (unhealthy.length > 0) {
                    console.warn('Unhealthy services detected:', unhealthy);
                }
            } catch (error) {
                console.error('Health check error:', error);
            }
        };

        // Initial check
        monitor();

        // Schedule periodic checks
        this.monitoringInterval = setInterval(monitor, this.config.interval);
    }

    // Stop monitoring
    stopMonitoring() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
            console.log('Health monitoring stopped');
        }
    }
}

module.exports = { HealthChecker };