import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/accounts';

/**
 * Fetches all tracked accounts from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of account objects.
 */

export const getAllTrackedAccounts = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data.data;
  } catch (error) {
    console.error('Error fetching tracked accounts:', error);
    throw error;
  }
};

/**
 * Adds a new account to be tracked.
 * @param {string} username The username of the account to add.
 * @returns {Promise<Object>} A promise that resolves to the newly created account object.
 */
export const addNewAccount = async (username) => {
  try {
    const response = await axios.post(API_URL, { username });
    // Our actual data is in response.data.data
    return response.data.data;
  } catch (error) {
    console.error('Error adding new account:', error);
    throw error;
  }
};
