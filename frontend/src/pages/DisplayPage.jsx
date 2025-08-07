// This is your new frontend/src/pages/DisplayPage.jsx

import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNextTweetToDisplay } from '../api/tweets';
import { QRCodeSVG } from 'qrcode.react'; // The new, crucial import

const TWEET_DISPLAY_DURATION = 10000;

function DisplayPage() {
  const { username } = useParams();

  const [currentTweet, setCurrentTweet] = useState(null);

  const [isFading, setIsFading] = useState(false);
  const [error, setError] = useState('');

  const fetchAndSetTweet = async () => {
    try {
      setIsFading(true);

      setTimeout(async () => {
        const response = await getNextTweetToDisplay(username);
        setCurrentTweet(response.data);
        setIsFading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch next tweet', err);
      const errorMessage =
        err.response?.data?.message || 'Could not load tweet.';
      setError(errorMessage);
    }
  };

  useEffect(() => {
    fetchAndSetTweet();
    const intervalId = setInterval(fetchAndSetTweet, TWEET_DISPLAY_DURATION);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl text-red-500 font-bold mb-4">
          An Error Occurred
        </h1>
        <p className="text-2xl text-gray-300">{error}</p>
        <p className="text-lg text-gray-500 mt-8">
          You can close this tab and try fetching tweets for this user again
          from the Control Panel.
        </p>
      </div>
    );
  }

  if (!currentTweet) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <h1 className="text-4xl animate-pulse">Loading first tweet...</h1>
      </div>
    );
  }

  // Helper to format the date
  const formatTimestamp = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const tweetUrl = `https://x.com/${currentTweet.author.username}/status/${currentTweet.tweetId}`;

  // 3. Display the username on the page to confirm it's working
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8 font-sans overflow-hidden">
      {/* The main tweet card with fade transition */}
      <div
        className={`bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-auto transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <div className="ml-4">
            <p className="text-3xl font-bold">{currentTweet.author.name}</p>
            <p className="text-xl text-cyan-400">
              @{currentTweet.author.username}
            </p>
          </div>
        </div>

        {/* Tweet Text */}
        <p className="text-4xl leading-snug my-6 whitespace-pre-wrap">
          {currentTweet.text}
        </p>

        {/* Timestamp */}
        <p className="text-gray-500 text-lg mb-6">
          {formatTimestamp(currentTweet.tweetedAt)}
        </p>

        {/* QR Code Section */}
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg mt-4">
          <QRCodeSVG value={tweetUrl} size={150} includeMargin={true} />
          <p className="text-black font-semibold mt-2">Scan to view on X</p>
        </div>
      </div>
    </div>
  );
}

export default DisplayPage;
