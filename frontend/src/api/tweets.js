import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/tweets';

/**
 * Triggers the backend to fetch the latest tweets for a specific user from the Twitter API.
 * @param {string} username The user whose tweets we want to fetch.
 * @returns {Promise<Object>} A promise that resolves to the result from the backend.
 */

export const fetchTweetsForUser = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/fetch/${username}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching tweets for ${username}:`, error);
    throw error;
  }
};

/**
 * Gets the next undisplayed tweet from our backend database for a specific user.
 * @param {string} username The user whose tweet we want to fetch.
 * @returns {Promise<Object>} A promise that resolves to the next tweet object to display.
 */
export const getNextTweetToDisplay = async (username) => {
  if (!username) {
    // A safety check to prevent calling the API without a username
    throw new Error('Username is required to get the next tweet.');
  }
  try {
    const response = await axios.get(`${API_URL}/next/${username}`);
    return response.data; // The API response from the backend
  } catch (error) {
    console.error('Error getting next tweet:', error);
    throw error;
  }
};
