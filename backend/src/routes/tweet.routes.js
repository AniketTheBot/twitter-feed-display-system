import { Router } from 'express';
import { healthcheck } from '../controllers/tweet.controller.js';

const router = Router();

// This defines our test route.
// When someone visits /api/v1/tweets/healthcheck, this will run.
router.route('/healthcheck').get(healthcheck);

export default router;