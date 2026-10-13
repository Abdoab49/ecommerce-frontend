// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState('login');

  // ✅ Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // ✅ Signup state
  const [signupFullName, setSignupFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  // ============================================
  // ✅ GOOGLE LOGIN — Hook (bla iframe)
  // ============================================
  const loginWithGoogle = useGoogleLogin({
    flow: 'implicit',        // ✅ Zid hadi — bach tkhod id_token
    onSuccess: async (tokenResponse) => {
      console.log('🔍 tokenResponse:', tokenResponse);
      console.log('🔍 id_token:', tokenResponse.id_token);
      console.log('🔍 access_token:', tokenResponse.access_token);

      setLoginError('');
      setLoginLoading(true);

      try {
        const response = await fetch('https://backend-3lyx.onrender.com/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            credential: tokenResponse.id_token || tokenResponse.access_token
          })
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem('lanada_user_id', data.userId);
          localStorage.setItem('lanada_user', JSON.stringify(data.user));
          navigate('/orders');
        } else {
          setLoginError(data.message || 'Google login failed');
        }
      } catch (err) {
        setLoginError('Mochkil f connection. 3awd jrreb.');
      } finally {
        setLoginLoading(false);
      }
    },
    onError: () => {
      setLoginError('Google login cancelled wla failed');
    }
  });

  // ============================================
  // ✅ LOGIN
  // ============================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('https://backend-3lyx.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('lanada_user_id', data.userId);
        localStorage.setItem('lanada_user', JSON.stringify(data.user));
        navigate('/orders');
      } else {
        setLoginError(data.message || 'Email wla password ghalat');
      }
    } catch (err) {
      setLoginError('Mochkil f connection. 3awd jrreb.');
    } finally {
      setLoginLoading(false);
    }
  };

  // ============================================
  // ✅ SIGNUP
  // ============================================
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');

    if (signupFullName.trim().length < 3) {
      setSignupError('Full name khass ykoun 3la l9al 3 characters');
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError('Password khass ykoun 3la l9al 6 characters');
      return;
    }

    if (signupPassword !== signupConfirm) {
      setSignupError('Password w confirm — ma kaytchabhoch');
      return;
    }

    setSignupLoading(true);

    try {
      const response = await fetch('https://backend-3lyx.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
          fullName: signupFullName,
          phone: signupPhone
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('lanada_user_id', data.userId);
        localStorage.setItem('lanada_user', JSON.stringify(data.user));
        navigate('/orders');
      } else {
        setSignupError(data.message || 'Mochkil f signup');
      }
    } catch (err) {
      setSignupError('Mochkil f connection. 3awd jrreb.');
    } finally {
      setSignupLoading(false);
    }
  };

  // ... (baqi kifma kan — JSX)
};

export default Login;