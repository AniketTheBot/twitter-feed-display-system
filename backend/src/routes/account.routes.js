import { Router } from 'express';
import {
  addAccount,
  deleteAccount,
  getAllAccounts,
} from '../controllers/account.controller.js';

const router = Router();

// This defines the route for adding a new account
// It will listen for POST requests at /api/v1/accounts
router.route('/').post(addAccount).get(getAllAccounts);
router.route('/:username').delete(deleteAccount);


export default router;
