import Redis from 'ioredis';
import { RateLimiterRedis, RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

// Redis client - only connect if REDIS_URL is available
let redisClient: Redis | null = null;

if (process.env.REDIS_URL) {
    redisClient = new Redis(process.env.REDIS_URL, {
        enableOfflineQueue: false,
        maxRetriesPerRequest: 1,
    });

    redisClient.on('error', (err) => {
        console.error('Redis connection error:', err.message);
    });

    redisClient.on('connect', () => {
        console.log('✅ Redis connected for rate limiting');
    });
}

// Login rate limiter configuration
const loginLimiterConfig = {
    points: 5, // 5 attempts
    duration: 15 * 60, // 15 minutes
    blockDuration: 15 * 60, // Block for 15 minutes after exceeding
};

// Global API rate limiter configuration
const globalLimiterConfig = {
    points: 100, // 100 requests
    duration: 15 * 60, // per 15 minutes
};

// Create rate limiters with Redis or fallback to memory
let loginLimiter: RateLimiterRedis | RateLimiterMemory;
let globalLimiter: RateLimiterRedis | RateLimiterMemory;

if (redisClient) {
    loginLimiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'login_limit',
        ...loginLimiterConfig,
    });

    globalLimiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'global_limit',
        ...globalLimiterConfig,
    });

    console.log('📊 Rate limiting: Using Redis');
} else {
    loginLimiter = new RateLimiterMemory(loginLimiterConfig);
    globalLimiter = new RateLimiterMemory(globalLimiterConfig);
    console.log('📊 Rate limiting: Using in-memory (Redis not configured)');
}

// Helper to get client IP
const getIP = (req: Request): string => {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
        return forwarded.split(',')[0].trim();
    }
    return req.ip || req.socket.remoteAddress || 'unknown';
};

// Login rate limiter middleware
export const loginRateLimiter = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const ip = getIP(req);

    try {
        await loginLimiter.consume(ip);
        next();
    } catch (error) {
        if (error instanceof RateLimiterRes) {
            const retryAfter = Math.ceil(error.msBeforeNext / 1000);
            res.set('Retry-After', String(retryAfter));
            res.status(429).json({
                error: 'Too many login attempts. Please try again in 15 minutes.',
                retryAfter,
            });
        } else {
            // If Redis fails, allow the request (fail open)
            console.error('Rate limiter error:', error);
            next();
        }
    }
};

// Global API rate limiter middleware
export const globalRateLimiter = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const ip = getIP(req);

    try {
        await globalLimiter.consume(ip);
        next();
    } catch (error) {
        if (error instanceof RateLimiterRes) {
            const retryAfter = Math.ceil(error.msBeforeNext / 1000);
            res.set('Retry-After', String(retryAfter));
            res.status(429).json({
                error: 'Too many requests. Please try again later.',
                retryAfter,
            });
        } else {
            // Fail open
            next();
        }
    }
};

// Reset login attempts for an IP (e.g., after successful login)
export const resetLoginAttempts = async (ip: string): Promise<void> => {
    try {
        await loginLimiter.delete(ip);
    } catch (error) {
        console.error('Failed to reset login attempts:', error);
    }
};

export { redisClient };
