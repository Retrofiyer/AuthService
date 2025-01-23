const express = require('express');
const helmet = require('helmet');
const dotenv = require("dotenv")
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const errorHandler = require('./Middlewares/errorMiddleware');
const authRoutes = require('./Routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Load Swagger YAML file
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

// Constant that validates in which branch the swagger will be found.
const environment = process.env.NODE_ENV || 'dev';

dotenv.config();

// Middleware
app.use(errorHandler);
app.use(helmet());
app.use(cors());
app.use(express.json());

// Dynamic Swagger control according to branch
if (['dev', 'QA'].includes(environment)) {
    console.log(`Swagger enabled in environment: ${environment}`);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
    console.log(`Swagger disabled in environment: ${environment}`);
}

// Routes
app.use('/auth', authRoutes);

// Start Server
app.listen(PORT, () => console.log(`AuthUser Service running on port ${PORT}`));