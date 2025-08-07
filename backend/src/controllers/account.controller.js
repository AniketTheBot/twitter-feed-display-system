import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Account } from '../models/account.model.js';
import axios from 'axios';
import { mockAccounts } from '../dev-data/mock-accounts.js';
import { Tweet } from '../models/tweet.model.js';

/**
 * @description Adds a new Twitter account to our database for tracking.
 * @route POST /api/v1/accounts
 * @body { "username": "some_twitter_handle" }
 */
const addAccount = asyncHandler(async (req, res) => {
  //  Get the username from the request body
  const { username } = req.body;
  if (!username) {
    throw new ApiError(400, 'Username is required');
  }

  const lowerCaseUsername = username.toLowerCase();

  //  Check if we are already tracking this account
  const existingAccount = await Account.findOne({
    username: lowerCaseUsername,
  });

  if (existingAccount) {
    throw new ApiError(409, 'This account is already being tracked.');
  }

  // If it's a new account, fetch its details from the Twitter API
  let userData;
  try {
    const userResponse = await axios.get(
      `https://api.twitter.com/2/users/by/username/${lowerCaseUsername}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
        params: { 'user.fields': 'profile_image_url' },
      }
    );
    userData = userResponse.data.data;
  } catch (error) {
    // This catches errors if the Twitter API call itself fails (e.g., user not found, invalid token)
    console.error('Twitter API Error:', error.response?.data || error.message);

    if (error.response?.status) {
      const statusCode = error.response.status;

      if (statusCode === 429) {
        throw new ApiError(
          429,
          'Too many requests to the Twitter API. Please wait 15 minutes and try again.'
        );
      }
      if (statusCode === 404) {
        throw new ApiError(
          404,
          `The Twitter user "@${username}" could not be found.`
        );
      }
    }
  }

  if (!userData) {
    throw new ApiError(404, 'Twitter user not found.');
  }

  //  Create the new account document in our database
  const newAccount = await Account.create({
    twitterUserId: userData.id,
    username: userData.username.toLowerCase(),
    name: userData.name,
    profileImageUrl: userData.profile_image_url,
  });

  if (!newAccount) {
    throw new ApiError(500, 'Failed to add the account to the database.');
  }

  //  Send a success response
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

const deleteAccount = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) throw new ApiError(400, 'Username is required.');

  const account = await Account.findOneAndDelete({
    username: username.toLowerCase(),
  });
  if (!account) throw new ApiError(404, 'Account not found.');

  // delete all tweets associated with this account
  await Tweet.deleteMany({ author: account._id });

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Account and all its tweets deleted.'));
});

// Update your exports
export { addAccount, getAllAccounts, deleteAccount };
