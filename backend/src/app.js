import express from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*', // allow all origins
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// --- Routes ---
import tweetRouter from './routes/tweet.routes.js';
import accountRouter from './routes/account.routes.js';

// Route declaration
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/accounts', accountRouter);

export { app };
