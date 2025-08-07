import { Router } from 'express';
import { addAccount } from '../controllers/account.controller.js';

const router = Router();

// This defines the route for adding a new account
// It will listen for POST requests at /api/v1/accounts
router.route('/').post(addAccount);

export default router;
