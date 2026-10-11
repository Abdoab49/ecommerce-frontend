import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ✅ Google Client ID — Bdel b dyalek
// ⚠️ MITHAL: '1234567890-abcdefghijklmnopqrst.apps.googleusercontent.com'
const GOOGLE_CLIENT_ID = '881331675616-redhhrg7pnhb2edad6m1b9i91ir2h9do.apps.googleusercontent.com';

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