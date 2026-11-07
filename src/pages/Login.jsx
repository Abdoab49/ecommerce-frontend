
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import styles from './Login.module.css';

const API = 'https://backend-3lyx.onrender.com/api';

// GOOGLE ICON
const GoogleIcon = () => (
  <svg
    viewBox="0 0 48 48"
    width="21"
    height="21"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.7c3.9-3.6 6-8.8 6-14.9z"
    />
    <path
      fill="#34A853"
      d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5c-1.8 1.2-4.1 2-6.8 2-5.3 0-9.8-3.6-11.4-8.4H5.7v5.2A20 20 0 0 0 24 44z"
    />
    <path
      fill="#FBBC05"
      d="M12.6 27.7a12 12 0 0 1 0-7.5V15H5.7a20 20 0 0 0 0 18z"
    />
    <path
      fill="#EA4335"
      d="M24 12c3 0 5.7 1 7.8 3.1l5.9-5.9A19.7 19.7 0 0 0 24 4 20 20 0 0 0 5.7 15l6.9 5.2C14.2 15.6 18.7 12 24 12z"
    />
  </svg>
);

// EMAIL ICON
const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

// LOCK ICON
const LockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

// USER ICON
const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

// PHONE ICON
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </svg>
);

// PASSWORD VISIBILITY ICON
const EyeIcon = ({ visible }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {visible ? (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3.1 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4-.8" />
      </>
    )}
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignup =
    location.pathname.replace(/\/+$/, '') === '/signup';

  // LOGIN STATES
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // SIGNUP STATES
  const [signupFullName, setSignupFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  // GENERAL STATES
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [error, setError] = useState('');

  // ==========================================
  // SAVE USER SESSION + GIVEAWAY REWARD
  // ==========================================

  const saveUserSession = (data, destination = '/orders') => {
    if (!data?.userId || !data?.user) {
      setError('Invalid server response.');
      return;
    }

    // Save user information
    localStorage.setItem('lanada_user_id', data.userId);

    localStorage.setItem(
      'lanada_user',
      JSON.stringify(data.user)
    );

    // Save Giveaway reward
    if (
      Object.prototype.hasOwnProperty.call(data, 'giveaway')
    ) {
      if (data.giveaway) {
        localStorage.setItem(
          'lanada_giveaway_reward',
          JSON.stringify(data.giveaway)
        );

        if (data.giveawaySessionToken) {
          localStorage.setItem(
            'lanada_giveaway_session_token',
            data.giveawaySessionToken
          );
        } else {
          localStorage.removeItem(
            'lanada_giveaway_session_token'
          );
        }
      } else {
        localStorage.removeItem('lanada_giveaway_reward');
        localStorage.removeItem(
          'lanada_giveaway_session_token'
        );
      }
    }

    // Save session token if returned by backend
    if (data.giveawaySessionToken) {
      localStorage.setItem(
        'lanada_giveaway_session_token',
        data.giveawaySessionToken
      );
    }

    // Notify application components
    window.dispatchEvent(new Event('userChanged'));

    window.dispatchEvent(
      new Event('lanada-giveaway-updated')
    );

    window.dispatchEvent(
      new Event('giveawayRewardUpdated')
    );

    navigate(destination);
  };

  // ==========================================
  // GOOGLE LOGIN SUCCESS
  // ==========================================

  const handleGoogleSuccess = async (tokenResponse) => {
    const credential =
      tokenResponse?.credential ||
      tokenResponse?.id_token ||
      tokenResponse?.access_token;

    if (!credential) {
      setError('Google authentication token was not received.');
      return;
    }

    setError('');
    setLoginLoading(true);

    try {
      const response = await fetch(`${API}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credential
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || 'Google login failed.'
        );
        return;
      }

      // Google users go to Home to see their Giveaway.
      saveUserSession(data, '/');

    } catch (err) {
      console.error('Google login error:', err);

      setError(
        'Connection problem. Please try again.'
      );

    } finally {
      setLoginLoading(false);
    }
  };

  // ==========================================
  // GOOGLE ACCOUNT SELECTOR
  // ==========================================

  const googleLogin = useGoogleLogin({
    flow: 'implicit',

    prompt: 'select_account',

    onSuccess: handleGoogleSuccess,

    onError: () => {
      setLoginLoading(false);
      setError(
        'Google login failed. Please try again.'
      );
    },

    onNonOAuthError: () => {
      setLoginLoading(false);
      setError(
        'Google sign-in window was closed or blocked.'
      );
    }
  });

  // ==========================================
  // EMAIL LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setLoginLoading(true);

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || 'Incorrect email or password.'
        );
        return;
      }

      saveUserSession(data, '/orders');

    } catch (err) {
      console.error('Email login error:', err);

      setError(
        'Connection problem. Please try again.'
      );

    } finally {
      setLoginLoading(false);
    }
  };

  // ==========================================
  // CREATE ACCOUNT
  // ==========================================

  const handleSignup = async (e) => {
    e.preventDefault();

    setError('');

    if (signupFullName.trim().length < 3) {
      setError(
        'Full name must contain at least 3 characters.'
      );
      return;
    }

    if (signupPassword.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      );
      return;
    }

    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match.');
      return;
    }

    setSignupLoading(true);

    try {
      const response = await fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
          fullName: signupFullName.trim(),
          phone: signupPhone
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || 'Could not create your account.'
        );
        return;
      }

      saveUserSession(data, '/orders');

    } catch (err) {
      console.error('Signup error:', err);

      setError(
        'Connection problem. Please try again.'
      );

    } finally {
      setSignupLoading(false);
    }
  };

  const loading = loginLoading || signupLoading;

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
        <p>Preparing your account...</p>
      </div>
    );
  }

  // ==========================================
  // MAIN LOGIN / SIGNUP PAGE
  // ==========================================

  return (
    <div className={styles.authPage}>
      <div className={styles.authLayout}>

        {/* FORM SIDE */}

        <section className={styles.formPanel}>
          <div className={styles.formInner}>

            {/* BRAND */}

            <Link
  to="/"
  className={styles.brand}
  aria-label="LANADA Home"
>
  <img
    src="/logo512.png"
    alt="LANADA"
  />
</Link>

            {/* HEADING */}

            <div className={styles.headingBlock}>
              <p className={styles.eyebrow}>
                {isSignup ? 'JOIN LANADA' : 'WELCOME BACK'}
              </p>

              <h1>
                {isSignup ? 'Create account.' : 'Sign in.'}
              </h1>

              <p className={styles.subtitle}>
                {isSignup
                  ? 'Create your account and discover the LANADA collection.'
                  : 'Sign in to access your account and manage your orders.'}
              </p>
            </div>

            {/* GOOGLE LOGIN */}

            {!isSignup && (
              <>
                <div className={styles.googleButton}>
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      googleLogin();
                    }}
                    className={styles.googleCustomButton}
                    aria-label="Continue with Google"
                  >
                    <GoogleIcon />

                    <span>
                      Continue with Google
                    </span>
                  </button>
                </div>

                <div className={styles.divider}>
                  <span></span>
                  <p>OR CONTINUE WITH EMAIL</p>
                  <span></span>
                </div>
              </>
            )}

            {/* EMAIL / SIGNUP FORM */}

            <form
              className={styles.form}
              onSubmit={isSignup ? handleSignup : handleLogin}
            >

              {/* SIGNUP FIELDS */}

              {isSignup && (
                <>
                  <label htmlFor="signup-name">
                    Full name
                  </label>

                  <div className={styles.inputWrap}>
                    <UserIcon />

                    <input
                      id="signup-name"
                      name="fullName"
                      type="text"
                      placeholder="Your full name"
                      autoComplete="name"
                      value={signupFullName}
                      onChange={(e) =>
                        setSignupFullName(e.target.value)
                      }
                      required
                    />
                  </div>

                  <label htmlFor="signup-email">
                    Email address
                  </label>

                  <div className={styles.inputWrap}>
                    <MailIcon />

                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={signupEmail}
                      onChange={(e) =>
                        setSignupEmail(e.target.value)
                      }
                      required
                    />
                  </div>

                  <label htmlFor="signup-phone">
                    Phone number <span>(optional)</span>
                  </label>

                  <div className={styles.inputWrap}>
                    <PhoneIcon />

                    <input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      placeholder="+212 6XX XXX XXX"
                      autoComplete="tel"
                      value={signupPhone}
                      onChange={(e) =>
                        setSignupPhone(e.target.value)
                      }
                    />
                  </div>

                  <label htmlFor="signup-password">
                    Password
                  </label>

                  <div className={styles.inputWrap}>
                    <LockIcon />

                    <input
                      id="signup-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Minimum 6 characters"
                      autoComplete="new-password"
                      value={signupPassword}
                      onChange={(e) =>
                        setSignupPassword(e.target.value)
                      }
                      required
                    />

                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label="Toggle password visibility"
                    >
                      <EyeIcon visible={showPassword} />
                    </button>
                  </div>

                  <label htmlFor="signup-confirm">
                    Confirm password
                  </label>

                  <div className={styles.inputWrap}>
                    <LockIcon />

                    <input
                      id="signup-confirm"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      value={signupConfirm}
                      onChange={(e) =>
                        setSignupConfirm(e.target.value)
                      }
                      required
                    />
                  </div>
                </>
              )}

              {/* LOGIN FIELDS */}

              {!isSignup && (
                <>
                  <label htmlFor="login-email">
                    Email address
                  </label>

                  <div className={styles.inputWrap}>
                    <MailIcon />

                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="username"
                      value={loginEmail}
                      onChange={(e) =>
                        setLoginEmail(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className={styles.passwordHeading}>
                    <label htmlFor="login-password">
                      Password
                    </label>

                    <Link to="/forgot-password">
                      Forgot password?
                    </Link>
                  </div>

                  <div className={styles.inputWrap}>
                    <LockIcon />

                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={(e) =>
                        setLoginPassword(e.target.value)
                      }
                      required
                    />

                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label="Toggle password visibility"
                    >
                      <EyeIcon visible={showPassword} />
                    </button>
                  </div>

                  <label className={styles.remember}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                    />

                    Remember me
                  </label>
                </>
              )}

              {/* ERROR MESSAGE */}

              {error && (
                <div
                  className={styles.errorMessage}
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {isSignup ? 'Create account' : 'Sign in'}

                <span aria-hidden="true">→</span>
              </button>
            </form>

            {/* SWITCH LOGIN / SIGNUP */}

            <p className={styles.switchText}>
              {isSignup
                ? 'Already have an account? '
                : "Don't have an account? "}

              <Link to={isSignup ? '/login' : '/signup'}>
                {isSignup ? 'Sign in' : 'Create account'}
              </Link>
            </p>

            {/* LEGAL */}

            <p className={styles.legalText}>
              By continuing, you agree to our{' '}

              <Link to="/terms">
                Terms
              </Link>

              {' '}and{' '}

              <Link to="/privacy">
                Privacy Policy
              </Link>.
            </p>

          </div>
        </section>

        {/* VISUAL SIDE */}

        <aside className={styles.visualPanel}>
          <img
            className={styles.visualImage}
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85"
            alt="LANADA fashion collection"
          />

          <div className={styles.visualOverlay}></div>

          <div className={styles.visualTop}>
            <span>LANADA</span>
            <span>EST. 2025</span>
          </div>

          <div className={styles.visualContent}>
            <p>THE LANADA EXPERIENCE</p>

            <h2>
              Style is a way to say who you are.
            </h2>

            <span>
              Discover timeless pieces, carefully selected
              for your everyday style. Welcome to a new
              way of shopping.
            </span>
          </div>

          <div className={styles.visualBottom}>
            <span>DISCOVER YOUR STYLE</span>
            <span>LANADA © 2026</span>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Login;
