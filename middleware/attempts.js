
const RateLimit = require('express-rate-limit');


// Rate limiting middleware to prevent brute-force attacks
const ApiRateLimiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50, // max 50 attempts
  message: 'Too many attempts, please try again after some time'
});

module.exports = ApiRateLimiter;