import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ✅ Google Client ID — Bdel b dyalek
const GOOGLE_CLIENT_ID = 'HNA_LSAQ_CLIENT_ID_DYALEK.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();