import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Tweet } from '../models/tweet.model.js';
import axios from 'axios';

import { mockApiResponse } from '../dev-data/mock-api-response.js';
import { Account } from '../models/account.model.js';

const fetchAndStoreTweets = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, 'Username is required');
  }

  const account = await Account.findOne({
    username: username,
  });

  if (!account) {
    throw new ApiError(
      400,
      'This account is not being tracked, please add it first'
    );
  }

  const latestTweet = await Tweet.findOne({ author: account._id }).sort({
    tweetedAt: -1,
  });

  const sinceId = latestTweet ? latestTweet.tweetId : null;

  let apiResponse;

  if (process.env.NODE_ENV === 'development') {
    console.log('DEV MODE: Using mock data for tweet fetch.');
    apiResponse = mockApiResponse;
  } else {
    console.log(`PROD MODE: Calling real Twitter API for user ${username}.`);
    const response = await axios.get(
      `https://api.twitter.com/2/users/${account.twitterUserId}/tweets`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
        params: {
          'tweet.fields': 'created_at',
          expansions: 'author_id',
          'user.fields': 'username,name',
          since_id: sinceId, // Here is where we use the sinceId we found earlier!
        },
      }
    );
    apiResponse = response.data;
  }

  if (!apiResponse || apiResponse.meta?.result_count === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { newTweetsSaved: 0 }, 'No new tweets found.')
      );
  }

  const formattedTweets = apiResponse.data.map((tweet) => ({
    tweetId: tweet.id,
    text: tweet.text,
    tweetedAt: new Date(tweet.created_at),
    author: account._id, // It links to the Account.
  }));
  try {
    const result = await Tweet.insertMany(formattedTweets, { ordered: false });
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { newTweetsSaved: result.length },
          'New tweets fetched and stored successfully.'
        )
      );
  } catch (error) {
    // This 'catch' block will handle the case where some tweets are duplicates.
    const newTweetsCount = error.result?.nInserted || 0;
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { newTweetsSaved: newTweetsCount },
          'Tweets processed. Some may have been duplicates.'
        )
      );
  }
});

const getNextTweet = asyncHandler(async (req, res) => {
  let wasReset = false;
  // CORRECTED: Use find() to get an array of all undisplayed tweets.
  let undisplayedTweets = await Tweet.find({ isDisplayed: false });

  // This `if` block now correctly checks if the array is empty.
  if (undisplayedTweets.length === 0) {
    console.log('All tweets displayed. Resetting feed...');
    wasReset = true;
    // --- The Reset Logic ---
    await Tweet.updateMany({}, { $set: { isDisplayed: false } });

    // We fetch the list again now that they are all reset
    undisplayedTweets = await Tweet.find();

    // Safety check in case the database is totally empty
    if (undisplayedTweets.length === 0) {
      throw new ApiError(404, 'No tweets found in the database.');
    }
  }

  // 1. Select a random tweet from the list
  const randomIndex = Math.floor(Math.random() * undisplayedTweets.length);
  const nextTweet = undisplayedTweets[randomIndex];

  // 2. Mark this tweet as "displayed" before sending it back
  await Tweet.findByIdAndUpdate(nextTweet._id, {
    $set: { isDisplayed: true },
  });

  const message = wasReset
    ? 'All tweets were shown. Feed has been restarted.'
    : 'Next tweet fetched successfully.';

  return res.status(200).json(new ApiResponse(200, nextTweet, message));
});

export { fetchAndStoreTweets, getNextTweet };
