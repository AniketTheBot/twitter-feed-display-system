import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Account } from '../models/account.model.js';
import axios from 'axios';
import { mockAccounts } from '../dev-data/mock-accounts.js';

/**
 * @description Adds a new Twitter account to our database for tracking.
 * @route POST /api/v1/accounts
 * @body { "username": "some_twitter_handle" }
 */
const addAccount = asyncHandler(async (req, res) => {
  // 1. Get the username from the request body
  const { username } = req.body;
  if (!username) {
    throw new ApiError(400, 'Username is required');
  }

  const lowerCaseUsername = username.toLowerCase();

  // 2. Check if we are already tracking this account
  const existingAccount = await Account.findOne({
    username: lowerCaseUsername,
  });

  if (existingAccount) {
    throw new ApiError(409, 'This account is already being tracked.');
  }

  // 3. If it's a new account, fetch its details from the Twitter API
  let userData;
  try {
    const userResponse = await axios.get(
      `https://api.twitter.com/2/users/by/username/${lowerCaseUsername}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
        params: { 'user.fields': 'profile_image_url' }, // You can add more fields here if needed
      }
    );
    userData = userResponse.data.data;
  } catch (error) {
    // This catches errors if the Twitter API call itself fails (e.g., user not found, invalid token)
    console.error('Twitter API Error:', error.response?.data || error.message);
    throw new ApiError(
      404,
      'Could not find a Twitter user with that username. Please check the handle and your API token.'
    );
  }

  if (!userData) {
    throw new ApiError(404, 'Twitter user not found.');
  }

  // 4. Create the new account document in our database
  const newAccount = await Account.create({
    twitterUserId: userData.id,
    username: userData.username.toLowerCase(),
    name: userData.name,
    profileImageUrl: userData.profile_image_url,
  });

  if (!newAccount) {
    throw new ApiError(500, 'Failed to add the account to the database.');
  }

  // 5. Send a success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newAccount,
        'Account added for tracking successfully.'
      )
    );
});

const getAllAccounts = asyncHandler(async (_, res) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('DEV MODE: Serving mock accounts.');
    // In dev mode, just return the hardcoded array of mock accounts.
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          mockAccounts,
          'Successfully fetched all tracked (mock) accounts.'
        )
      );
  }
  const allAccounts = await Account.find();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allAccounts,
        'Successfully fetched all tracked accounts.'
      )
    );
});

export { addAccount, getAllAccounts };
