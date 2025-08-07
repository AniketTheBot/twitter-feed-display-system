// This is the final backend/src/dev-data/mock-tweets.js

import { MOCK_IDS } from './mock-accounts.js';

export const mockTweets = [
  // --- Tweets for XDevelopers (ID: 2244994945) ---
  {
    _id: 'mock_tweet_dev_001',
    tweetId: '1788231397072834887', // Real Tweet ID
    text: 'Our team is working on something special for developers. Stay tuned for updates! #DevLife',
    tweetedAt: new Date('2024-05-08T15:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.DEV_USER,
  },
  {
    _id: 'mock_tweet_dev_002',
    tweetId: '1780320498437341203', // Real Tweet ID
    text: 'The API v2 now includes new metrics for engagement. Check out the latest docs.',
    tweetedAt: new Date('2024-04-16T18:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.DEV_USER,
  },

  // --- Tweets for React (ID: 1351538328453414913) ---
  {
    _id: 'mock_tweet_react_001',
    tweetId: '1701683437295775838', // Real Tweet ID
    text: 'What was your "aha" moment when learning React?',
    tweetedAt: new Date('2023-09-12T19:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.REACT_TEAM,
  },
  {
    _id: 'mock_tweet_react_002',
    tweetId: '1786483832349970597', // Real Tweet ID
    text: 'Shoutout to the community for all the amazing contributions to the React ecosystem.',
    tweetedAt: new Date('2024-05-03T20:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.REACT_TEAM,
  },

  // --- Tweets for Node.js (ID: 97434313) ---
  {
    _id: 'mock_tweet_node_001',
    tweetId: '1788647081216974953', // Real Tweet ID
    text: 'Security is a top priority. Always keep your dependencies up to date!',
    tweetedAt: new Date('2024-05-09T19:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.NODE_JS,
  },
  {
    _id: 'mock_tweet_node_002',
    tweetId: '1785773105315352697', // Real Tweet ID
    text: 'Performance matters. Have you tried the new URL parser in Node.js 22?',
    tweetedAt: new Date('2024-05-01T20:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.NODE_JS,
  },
];
