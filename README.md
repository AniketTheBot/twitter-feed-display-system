# Twitter Feed Display System

This is a full-stack application designed to fetch live tweets from specified Twitter accounts and display them one-by-one in a clean, full-screen "kiosk" mode. Each displayed tweet includes a scannable QR code that links directly to the original post on X.com.

The system features a separate control panel for managing tracked accounts and a dedicated display view intended for an extended monitor. It is built with a modern MERN-stack-inspired architecture (MongoDB, Express, React, Node.js) and includes an automatic hourly refresh mechanism.

## Features

- **Dynamic Account Management**: Add or remove Twitter accounts to track through a clean UI.
- **Live Tweet Fetching**: Fetches the latest tweets from the Twitter API v2, using `since_id` for maximum efficiency.
- **Automated Hourly Refresh**: A `node-cron` job automatically checks for new tweets for all tracked accounts every hour.
- **Kiosk-Style Display**: A dedicated, full-screen display page (`/display/:username`) that cycles through tweets with smooth fade transitions.
- **QR Code Integration**: Each tweet is displayed with a unique, scannable QR code that links directly to its original URL.
- **Smart Deduplication**: The backend ensures that no tweet is ever stored in the database more than once.
- **Self-Cleaning Database**: A TTL (Time-To-Live) index on the `tweets` collection automatically purges records older than 7 days to keep the database lean.
- **Robust Development Environment**: The application features a crucial DEV/PROD switch. In development mode, it uses a high-fidelity, in-memory mock database, preserving API rate limits and allowing for fast, offline testing.
  > **Note:** The mock data uses real account information but placeholder `tweetId`s. Therefore, while in development mode, the generated QR codes will link to a valid user's profile but will result in a "post not found" error on X.com. Full QR code functionality is present when the application is run in `production` mode.

## Tech Stack

#### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for the API.
- **MongoDB**: NoSQL database for storing accounts and tweets.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Axios**: Promise-based HTTP client for making API calls.
- **`node-cron`**: For scheduling the hourly refresh job.
- **`dotenv`**: For managing environment variables.

#### Frontend

- **React**: JavaScript library for building the user interface.
- **Vite**: Next-generation frontend tooling for a fast development experience.
- **React Router DOM**: For handling client-side routing.
- **Axios**: For making API calls to the backend.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **`qrcode.react`**: For generating QR codes.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm (or yarn)
- A running MongoDB instance (local or via a service like MongoDB Atlas)
- A **Twitter Developer Account**. You can apply for one at the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard).

### Installation & Setup

1.  **Get the source Code:**

    You have two options to get the code. After this step, ensure your terminal is inside the main project folder.

    ##### Option A: Using Git (Recommended)

    ```sh
    git clone https://github.com/AniketTheBot/twitter-feed-display-system.git
    cd twitter-feed-display-system
    ```

    ##### Option B: Downloading as a ZIP
    - Go to the [GitHub repository](https://github.com/AniketTheBot/twitter-feed-display-system).
    - Click the green `<> Code` button.
    - Select **Download ZIP** from the dropdown menu.
    - Unzip the downloaded file (`twitter-feed-display-system-main.zip`) to a location on your computer.
    - Open your terminal and navigate into the extracted project folder (e.g., `cd path/to/twitter-feed-display-system-main`).
    - Rename the folder to `twitter-feed-display-system` for consistency.

    ```sh
    mv twitter-feed-display-system-main twitter-feed-display-system
    ```

    ```sh
    cd twitter-feed-display-system
    ```

2.  **Install Backend Dependencies:**

    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**

    ```sh
    cd ../frontend
    npm install
    ```

4.  **Configure Backend Environment Variables:**
    - Navigate to the `backend` directory.
    - Create a `.env` file.
    - Add the following variables to your `.env` file:

    ```env
    # Your MongoDB connection string
    MONGODB_URI="mongodb+srv://..."

    # Your Twitter API v2 Bearer Token (see instructions below)
    TWITTER_BEARER_TOKEN="YOUR_BEARER_TOKEN_HERE"

    # The port for the backend server
    PORT=5000

    # The origin URL for your frontend for CORS
    CORS_ORIGIN=http://localhost:5173

    # Set to 'development' for local testing or 'production' to use live API calls
    NODE_ENV=development
    ```

### Obtaining the Twitter Bearer Token

To use this application in `production` mode, you need a Bearer Token from the Twitter Developer Portal.

1.  **Navigate to the Developer Portal**: Go to the [Twitter Developer Portal Dashboard](https://developer.twitter.com/en/portal/dashboard) and sign in.

2.  **Create a Project**: If you don't have one, you'll need to create a new Project. A Project is a container for your Apps. Give it a name and a use case (e.g., "Testing and Learning").

3.  **Create an App**: Inside your Project, create a new App. You will likely be creating a "Development" App. Give it a unique name.

4.  **Find Your Keys and Tokens**: Once your App is created, select it from the dashboard. Navigate to the **Keys and tokens** tab for that App.

5.  **Copy the Bearer Token**: You will see several credentials (API Key, API Key Secret, etc.). The one you need is the **Bearer Token**. It's a long, secure string.
    - Click the "View" or "Generate" button next to it.
    - Copy the token string. _Be sure to save it somewhere safe, as it may only be shown to you once._

6.  **Add to `.env` file**: Paste the copied token into the `TWITTER_BEARER_TOKEN` variable in your `backend/.env` file.

### Running the Application

You will need two separate terminals to run both the backend and frontend servers concurrently.

1.  **Run the Backend Server:**
    - In a terminal, navigate to the `backend` directory.
    - Run the development server:
      ```sh
      npm run dev
      ```
    - The server should start on `http://localhost:5000` (or the port you specified).

2.  **Run the Frontend Server:**
    - In a second terminal, navigate to the `frontend` directory.
    - Run the development server:
      ```sh
      npm run dev
      ```
    - The application will be available at `http://localhost:5173`.

## Application Workflow

1.  **Open the Control Panel**: Navigate to `http://localhost:5173` in your browser.
2.  **Add an Account**: Enter a valid Twitter username (e.g., "XDevelopers") and click "Add Account".
    - This makes a live API call to validate and save the user. The system then automatically fetches that user's initial batch of tweets (in production mode) or uses mock data (in development mode).
3.  **Launch Display**: Click on any of the account cards in the "Tracked Accounts" section.
4.  **View the Feed**: A new tab will open with the display page, which will start cycling through the tweets for that specific user. Scan the QR code on any tweet to visit it on X.com.
