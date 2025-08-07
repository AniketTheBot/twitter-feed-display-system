// This is your new frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'; // Our Control Panel page
import './index.css';
import { StrictMode } from 'react';
import DisplayPage from './pages/DisplayPage.jsx';

// We will create this new component file in the next step
// import DisplayPage from './pages/DisplayPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // When the URL is '/', show the App component.
  },
  {
    path: '/display/:username',
    element: <DisplayPage />, // When the URL is '/display', show the DisplayPage component.
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
