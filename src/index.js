const swaggerUi = require("swagger-ui-express");
const client = require("prom-client");
const express = require("express");
const dotenv = require("dotenv");
const YAML = require("yamljs");
const cors = require("cors");
const fs = require("fs");
const {
  corsOptions,
  securityHeaders,
  limiter,
} = require("./Middlewares/security.js");
const errorHandler = require("./Middlewares/errorMiddleware");
const authRoutes = require("./Routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const collectDefaultMetrics = client.collectDefaultMetrics;

// Load Swagger YAML file
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

// Request counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests received",
  labelNames: ["method", "route", "status_code"],
});

// Configuring Prometheus metrics
collectDefaultMetrics();

app.use(cors(corsOptions));
app.use(securityHeaders);
app.use(express.json());
app.use(limiter);

app.options("*", cors(corsOptions));

// Verified that the middleware has no errors
app.use(errorHandler);

// Middleware to count requests
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });
  next();
});

// Dynamic Swagger control according to branch
if (fs.existsSync("./src/docs/swagger.yaml")) {
  console.log("Swagger documentation enabled.");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("Swagger documentation disabled.");
}

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Routes
app.use("/auth", authRoutes);

// Start Server
app.listen(PORT, "0.0.0.0", () =>
  console.log(`AuthUser Service running on port ${PORT}`)
);
