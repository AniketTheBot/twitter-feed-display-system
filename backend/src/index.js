import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
  path: './.env',
});

const PORT = process.env.PORT || 8000; // Let's use 8000 to avoid conflicts

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.error('App failed after DB connection: ', error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`✅ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Mongo DB connection failed!', err);
  });