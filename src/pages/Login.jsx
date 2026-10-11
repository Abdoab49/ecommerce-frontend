// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';   // ✅ Zid Link
import { GoogleLogin } from '@react-oauth/google';
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
  // ✅ GOOGLE LOGIN
  // ============================================
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('https://backend-3lyx.onrender.com/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: credentialResponse.credential
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
  };

  const handleGoogleError = () => {
    setLoginError('Google login cancelled wla failed');
  };

  // ============================================
  // ✅ RENDER
  // ============================================
  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>

        {/* ===== LOGIN MODE ===== */}
        {mode === 'login' && (
          <>
            <p className={styles.title}>Welcome back</p>

            <form className={styles.form} onSubmit={handleLogin}>
              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className={styles.input}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />

              {/* ✅ Forgot Password — Link */}
              <p className={styles.pageLink}>
                <Link to="/forgot-password" className={styles.pageLinkLabel}>
                  Forgot Password?
                </Link>
              </p>

              {loginError && <div className={styles.errorMsg}>{loginError}</div>}

              <button type="submit" className={styles.formBtn} disabled={loginLoading}>
                {loginLoading ? 'Connexion...' : 'Log in'}
              </button>
            </form>

            <p className={styles.signUpLabel}>
              Don't have an account?{' '}
              <span
                className={styles.signUpLink}
                onClick={() => {
                  setMode('signup');
                  setLoginError('');
                }}
              >
                Sign up
              </span>
            </p>

            {/* ✅ Apple + Google */}
            <div className={styles.buttonsContainer}>
              <div className={styles.appleLoginButton}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" className={styles.appleIcon} viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
                </svg>
                <span>Log in with Apple</span>
              </div>

              {/* ✅ Google Login — REAL */}
              <div className={styles.googleLoginWrapper}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="continue_with"
                  shape="pill"
                  theme="outline"
                  size="large"
                  width={350}
                />
              </div>
            </div>
          </>
        )}

        {/* ===== SIGNUP MODE ===== */}
        {mode === 'signup' && (
          <>
            <p className={styles.title}>Create account</p>

            <form className={styles.form} onSubmit={handleSignup}>
              <input
                type="text"
                className={styles.input}
                placeholder="Full Name"
                value={signupFullName}
                onChange={(e) => setSignupFullName(e.target.value)}
                required
              />

              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />

              <input
                type="tel"
                className={styles.input}
                placeholder="Phone (optional)"
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
              />

              <input
                type="password"
                className={styles.input}
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />

              <input
                type="password"
                className={styles.input}
                placeholder="Confirm Password"
                value={signupConfirm}
                onChange={(e) => setSignupConfirm(e.target.value)}
                required
              />

              {signupError && <div className={styles.errorMsg}>{signupError}</div>}

              <button type="submit" className={styles.formBtn} disabled={signupLoading}>
                {signupLoading ? 'Création...' : 'Sign up'}
              </button>
            </form>

            <p className={styles.signUpLabel}>
              Already have an account?{' '}
              <span
                className={styles.signUpLink}
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
      </div>
    </div>
  );
};

export default Login;