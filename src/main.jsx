import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';

// ✅ Google Client ID مباشرة (بلا .env)
const googleClientId =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ||
  '881331675616-redhhrg7pnhb2edad6m1b9i91ir2h9do.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);