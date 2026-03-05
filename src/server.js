import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import candidateRoutes from './routes/candidateRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON payloads
app.use(morgan('dev')); // HTTP request logger

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'HR Interview Screener API is running' });
});

// API Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/webhooks', webhookRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
