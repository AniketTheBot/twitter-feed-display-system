import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';
import cron from 'node-cron';
import axios from 'axios';
import { Account } from './models/account.model.js';
dotenv.config({
  path: './.env',
});

const PORT = process.env.PORT || 8000; // Let's use 8000 to avoid conflicts

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running at port : ${PORT}`);
    });

    // --- Automatic Hourly Tweet Fetch Job ---
    console.log('🕒 Cron job scheduler initialized.');

    // This schedule runs at minute 0 of every hour ('0 * * * *')
    cron.schedule('0 * * * *', async () => {
      console.log('⏰ Running hourly tweet fetch job...');
      const startTime = new Date();
      if (process.env.NODE_ENV !== 'production') {
        console.log('  -> SKIPPING JOB: Not in production environment.');
        return;
      }

      try {
        // 1. Get all accounts we are tracking from the database
        const allAccounts = await Account.find();
        if (allAccounts.length === 0) {
          console.log('  -> No accounts to track. Job finished.');
          return;
        }

        console.log(`  -> Found ${allAccounts.length} accounts to process.`);

        let totalNewTweets = 0;

        // 2. Loop through each account and trigger our fetch endpoint
        for (const account of allAccounts) {
          try {
            console.log(`  -- Processing user: @${account.username}`);

            // The cron job calls its OWN API endpoint. This reuses our code.
            const response = await axios.post(
              `http://localhost:${PORT}/api/v1/tweets/fetch/${account.username}`
            );

            const newTweetsSaved = response.data.data.newTweetsSaved || 0;
            totalNewTweets += newTweetsSaved;
            console.log(
              `    ✅ Success. Found ${newTweetsSaved} new tweets for @${account.username}.`
            );
          } catch (error) {
            console.error(
              `    ❌ Job failed for user: @${account.username}`,
              error.response?.data?.message || error.message
            );
          }
        }

        const duration = (new Date() - startTime) / 1000; // Duration in seconds
        console.log(
          `✅ Hourly job finished in ${duration}s. Total new tweets saved: ${totalNewTweets}.`
        );
      } catch (error) {
        console.error(
          'CRITICAL: Cron job failed to fetch accounts from DB.',
          error
        );
      }
    });
  })
  .catch((err) => {
    console.log('Mongo DB connection failed!', err);
  });
