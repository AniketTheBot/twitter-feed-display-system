import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addNewAccount, deleteTrackedAccount, getAllTrackedAccounts } from './api/accounts.js';
import { Link } from 'react-router-dom';
import { fetchTweetsForUser } from './api/tweets.js';

function App() {
  const [username, setUsername] = useState('');
  const [trackedAccounts, setTrackedAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiCallStart = () => {
    setLoading(true);
    setError('');
  };

  const fetchTrackedAccounts = async () => {
    console.log('fetching accounts');
    apiCallStart();
    try {
      const accounts = await getAllTrackedAccounts();
      setTrackedAccounts(accounts);
    } catch (err) {
      setError('Failed to fetchAccounts, Please ensure backend is running');
    } finally {
      setLoading(false);
    }
  };
  const handleAddAccount = async (e) => {
    e.preventDefault();
    const sanitizedUsername = username.trim().replace('@', '');
    if (!sanitizedUsername) return;

    apiCallStart();
    let accountAdded = false;

    try {
      console.log(`Attempting to add account: ${sanitizedUsername}`);
      await addNewAccount(sanitizedUsername);
      console.log(`Account ${sanitizedUsername} added successfully.`);
      accountAdded = true;

      console.log(`Fetching initial tweets for ${sanitizedUsername}...`);
      await fetchTweetsForUser(sanitizedUsername);
      console.log(`Initial tweets for ${sanitizedUsername} fetched.`);

      setUsername('');
      await fetchTrackedAccounts();
    } catch (err) {
      // status code and message from bckend
      const statusCode = err.response?.status;
      const errorMessage =
        err.response?.data?.message || 'An unexpected error occurred.';

      if (statusCode === 409) {
        // Alert message for error
        alert(errorMessage);
      } else {
        setError(errorMessage);
      }

      if (accountAdded) {
        console.log(
          `Initial tweet fetch failed. Rolling back account creation for ${sanitizedUsername}...`
        );
        try {
          await deleteTrackedAccount(sanitizedUsername); // ...delete the account we just created.
          console.log('Rollback successful.');
        } catch (rollbackError) {
          console.error('CRITICAL: Rollback failed!', rollbackError);
          setError(
            'Failed to add user and could not clean up. Please refresh.'
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackedAccounts();
  }, []);
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-cyan-400">
            Twitter Feed Display System
          </h1>
          <p className="text-gray-400 mt-2">Control Panel</p>
        </header>

        <section className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Add a Twitter Account to Track
          </h2>
          <form
            onSubmit={handleAddAccount}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (e.g., XDevelopers)"
              className="flex-grow bg-gray-700 p-3 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-md font-bold transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Account'}
            </button>
          </form>
          {error && (
            <p className="text-red-500 mt-3 text-center sm:text-left">
              {error}
            </p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Click an Account to View Feed
          </h2>
          {!loading && trackedAccounts.length === 0 && (
            <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
              <p>No accounts are being tracked yet.</p>
              <p>Add one using the form above to get started!</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trackedAccounts.map((account) => (
              <Link
                key={account._id}
                to={`/display/${account.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 h-full transform hover:scale-105 hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer shadow-lg">
                  <img
                    src={account.profileImageUrl}
                    alt={account.name}
                    className="w-14 h-14 rounded-full border-2 border-gray-600"
                  />
                  <div>
                    <p className="font-bold text-lg text-white">
                      {account.name}
                    </p>
                    <p className="text-cyan-400">@{account.username}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
