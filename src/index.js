const express = require('express');
const helmet = require('helmet');
const dotenv = require("dotenv")
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs')
const errorHandler = require('./Middlewares/errorMiddleware');
const authRoutes = require('./Routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Load Swagger YAML file
const swaggerDocument = YAML.load('./src/Docs/swagger.yaml');

// Verified that the middleware has no errors
app.use(errorHandler);

app.use(helmet());
app.use(cors());
app.use(express.json());

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