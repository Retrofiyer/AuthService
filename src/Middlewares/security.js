const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Configure CORS
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };
  
  // Protection against HTTP attacks (Helmet)
  const securityHeaders = helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  });
  
  // Configure Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  });

  module.exports = { corsOptions, securityHeaders, limiter};