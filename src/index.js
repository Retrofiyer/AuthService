const express = require('express');
const helmet = require('helmet');
const dotenv = require("dotenv")
const cors = require('cors');
const errorHandler = require('./Middlewares/errorMiddleware');
const authRoutes = require('./Routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

// Middleware
app.use(errorHandler);
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Start Server
app.listen(PORT, () => console.log(`AuthUser Service running on port ${PORT}`));