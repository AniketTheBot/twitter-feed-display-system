import { Router } from 'express';
import {
  fetchAndStoreTweets,
  getNextTweet,
} from '../controllers/tweet.controller.js';

const router = Router();

router.route('/fetch/:username').post(fetchAndStoreTweets);
router.route('/next/:username').get(getNextTweet);

export default router;
