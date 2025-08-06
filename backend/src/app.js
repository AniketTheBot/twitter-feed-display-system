import express from 'express';
import cors from 'cors';

const app = express();

// --- Global Middleware ---
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*', // For now, allow all origins
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// --- Routes ---
import tweetRouter from './routes/tweet.routes.js';

// Route declaration
// This makes it so all routes in tweet.routes.js are prefixed with /api/v1/tweets
app.use('/api/v1/tweets', tweetRouter);

export { app };