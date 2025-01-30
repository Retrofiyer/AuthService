const express = require('express');
const dotenv = require("dotenv")
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs')
const { corsOptions, securityHeaders, limiter} = require("./Middlewares/security.js")
const errorHandler = require('./Middlewares/errorMiddleware');
const authRoutes = require('./Routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Load Swagger YAML file
const swaggerDocument = YAML.load('./src/Docs/swagger.yaml');

app.use(require("cors")(corsOptions));
app.use(securityHeaders);
app.use(express.json());
app.use(limiter);

// Verified that the middleware has no errors
app.use(errorHandler);

// Dynamic Swagger control according to branch
if (fs.existsSync('./src/Docs/swagger.yaml')) {
    console.log('Swagger documentation enabled.');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
    console.log('Swagger documentation disabled.');
}

// Routes
app.use('/auth', authRoutes);

// Start Server
app.listen(PORT, () => console.log(`AuthUser Service running on port ${PORT}`));