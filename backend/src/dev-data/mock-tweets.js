// This is backend/src/dev-data/mock-tweets.js

import { MOCK_IDS } from './mock-accounts.js';

export const mockTweets = [
  // --- Tweets for XDevelopers ---
  {
    _id: 'mock_tweet_dev_001',
    tweetId: 'dev001',
    text: 'Building amazing things with the X API! #BuildWhatsNext',
    tweetedAt: new Date('2025-08-01T10:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.DEV_USER,
  },
  {
    _id: 'mock_tweet_dev_002',
    tweetId: 'dev002',
    text: 'Have you checked out our latest documentation? It includes new endpoints.',
    tweetedAt: new Date('2025-08-02T11:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.DEV_USER,
  },
  
  // --- Tweets for React Team ---
  {
    _id: 'mock_tweet_react_001',
    tweetId: 'react001',
    text: 'React 19 is just around the corner! Get ready for the Compiler.',
    tweetedAt: new Date('2025-08-03T15:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.REACT_TEAM,
  },
  {
    _id: 'mock_tweet_react_002',
    tweetId: 'react002',
    text: 'Thinking in components is a superpower.',
    tweetedAt: new Date('2025-08-04T16:30:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.REACT_TEAM,
  },
  {
    _id: 'mock_tweet_react_003',
    tweetId: 'react003',
    text: 'What are your favorite custom hooks?',
    tweetedAt: new Date('2025-08-05T12:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.REACT_TEAM,
  },

  // --- Tweets for Node.js ---
  {
    _id: 'mock_tweet_node_001',
    tweetId: 'node001',
    text: 'Node.js 22 is now available! Check out the new features like WebSocket support.',
    tweetedAt: new Date('2025-08-06T09:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.NODE_JS,
  },
  {
    _id: 'mock_tweet_node_002',
    tweetId: 'node002',
    text: 'The event loop is a fundamental concept to master.',
    tweetedAt: new Date('2025-08-07T18:00:00.000Z'),
    isDisplayed: false,
    author: MOCK_IDS.NODE_JS,
  },
];