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
    flow: 'implicit',
    onSuccess: async (tokenResponse) => {
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

  // ============================================
  // ✅ RENDER
  // ============================================
  return (
    <div className={styles.so}>
      <form
        className={styles.soBox}
        onSubmit={mode === 'login' ? handleLogin : handleSignup}
      >

        {/* ===== LOGIN MODE ===== */}
        {mode === 'login' && (
          <>
            <h1 className={styles.soTitle}>Log in to LANADA</h1>
            <p className={styles.soSub}>Choose how you want to continue.</p>

            {/* ✅ Social buttons — KOULHOM NAFS DESIGN */}
            <div className={styles.soSocial}>
              {/* ✅ Google — Button 3adi (bhal Apple w GitHub) */}
              <button type="button" onClick={() => loginWithGoogle()}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              {/* ❌ GitHub — ghir design */}
              <button type="button" onClick={() => alert('GitHub login — mazal ma khddamch')}>
                <svg
                  viewBox="0 0 24 24"
                  fill="#1a1d24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4 18.3 4.3 18.3 4.3c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
                </svg>
                Continue with GitHub
              </button>

              {/* ❌ Apple — ghir design */}
              <button type="button" onClick={() => alert('Apple login — mazal ma khddamch')}>
                <svg
                  viewBox="0 0 24 24"
                  fill="#1a1d24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M16.36 12.76c.03 3.26 2.86 4.35 2.89 4.36-.02.08-.45 1.55-1.49 3.07-.9 1.31-1.83 2.62-3.3 2.65-1.44.03-1.91-.86-3.56-.86-1.65 0-2.17.83-3.54.88-1.42.05-2.5-1.42-3.4-2.72C2.1 17.47.68 12.6 2.57 9.39a5.25 5.25 0 0 1 4.44-2.7c1.39-.02 2.7.94 3.56.94.85 0 2.45-1.16 4.13-.99.7.03 2.68.29 3.94 2.13-.1.06-2.35 1.38-2.28 3.99zM13.6 3.9c.75-.91 1.26-2.18 1.12-3.44-1.08.04-2.39.72-3.17 1.63-.7.8-1.31 2.09-1.14 3.32 1.2.1 2.44-.61 3.19-1.51z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* ✅ Divider */}
            <div className={styles.soDivider}>OR</div>

            {/* ✅ Email + Password */}
            <label className={styles.soLabel} htmlFor="so-email">
              Email address
            </label>
            <input
              className={styles.soInput}
              type="email"
              id="so-email"
              placeholder="you@example.com"
              autoComplete="username"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <label
              className={styles.soLabel}
              htmlFor="so-password"
              style={{ marginTop: '12px' }}
            >
              Password
            </label>
            <input
              className={styles.soInput}
              type="password"
              id="so-password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

            {/* ✅ Forgot Password */}
            <div className={styles.soForgot}>
              <Link to="/forgot-password" className={styles.soForgotLink}>
                Forgot Password?
              </Link>
            </div>

            {loginError && <p className={styles.soError}>{loginError}</p>}

            <button className={styles.soGo} type="submit" disabled={loginLoading}>
              {loginLoading ? 'Loading...' : 'Log in'}
            </button>

            {/* ✅ Sign up link */}
            <p className={styles.soFine}>
              Don't have an account?{' '}
              <span
                className={styles.soLink}
                onClick={() => {
                  setMode('signup');
                  setLoginError('');
                }}
              >
                Sign up
              </span>
            </p>

            <p className={styles.soFine}>
              By continuing you agree to our <a href="#">Terms</a> and{' '}
              <a href="#">Privacy Policy</a>.
            </p>
          </>
        )}

        {/* ===== SIGNUP MODE ===== */}
        {mode === 'signup' && (
          <>
            <h1 className={styles.soTitle}>Create your account</h1>
            <p className={styles.soSub}>Join LANADA in seconds.</p>

            <label className={styles.soLabel} htmlFor="so-fullname">
              Full Name
            </label>
            <input
              className={styles.soInput}
              type="text"
              id="so-fullname"
              placeholder="full Name"
              value={signupFullName}
              onChange={(e) => setSignupFullName(e.target.value)}
              required
            />

            <label
              className={styles.soLabel}
              htmlFor="so-signup-email"
              style={{ marginTop: '12px' }}
            >
              Email
            </label>
            <input
              className={styles.soInput}
              type="email"
              id="so-signup-email"
              placeholder="you@example.com"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />

            <label
              className={styles.soLabel}
              htmlFor="so-phone"
              style={{ marginTop: '12px' }}
            >
              Phone (optional)
            </label>
            <input
              className={styles.soInput}
              type="tel"
              id="so-phone"
              placeholder="Phone number"
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
            />

            <label
              className={styles.soLabel}
              htmlFor="so-signup-password"
              style={{ marginTop: '12px' }}
            >
              Password
            </label>
            <input
              className={styles.soInput}
              type="password"
              id="so-signup-password"
              placeholder="•••••••• (min 6)"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />

            <label
              className={styles.soLabel}
              htmlFor="so-confirm"
              style={{ marginTop: '12px' }}
            >
              Confirm Password
            </label>
            <input
              className={styles.soInput}
              type="password"
              id="so-confirm"
              placeholder="••••••••"
              value={signupConfirm}
              onChange={(e) => setSignupConfirm(e.target.value)}
              required
            />

            {signupError && <p className={styles.soError}>{signupError}</p>}

            <button className={styles.soGo} type="submit" disabled={signupLoading}>
              {signupLoading ? 'Création...' : 'Create account'}
            </button>

            <p className={styles.soFine}>
              Already have an account?{' '}
              <span
                className={styles.soLink}
                onClick={() => {
                  setMode('login');
                  setSignupError('');
                }}
              >
                Log in
              </span>
            </p>
          </>
        )}

      </form>
    </div>
  );
};

export default Login;