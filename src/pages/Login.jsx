// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  // ✅ Flip state — Login (false) / Signup (true)
  const [showSignup, setShowSignup] = useState(false);

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
  // ✅ RENDER
  // ============================================
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <form
          className={styles.form}
          style={{
            transform: showSignup ? 'rotateY(-180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* ===== LOGIN (FRONT) ===== */}
          <div className={styles.form_front}>
            <div className={styles.form_details}>Login</div>

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

            {loginError && <div className={styles.error_msg}>{loginError}</div>}

            <button
              className={styles.btn}
              type="button"
              onClick={handleLogin}
              disabled={loginLoading}
            >
              {loginLoading ? 'Connexion...' : 'Login'}
            </button>

            <span className={styles.switch}>
              Don't have an account?{' '}
              <span
                className={styles.signup_tog}
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </span>
            </span>
          </div>

          {/* ===== SIGNUP (BACK) ===== */}
          <div className={styles.form_back}>
            <div className={styles.form_details}>SignUp</div>

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
              placeholder="Phone (optionnel)"
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

            {signupError && <div className={styles.error_msg}>{signupError}</div>}

            <button
              className={styles.btn}
              type="button"
              onClick={handleSignup}
              disabled={signupLoading}
            >
              {signupLoading ? 'Création...' : 'Signup'}
            </button>

            <span className={styles.switch}>
              Already have an account?{' '}
              <span
                className={styles.signup_tog}
                onClick={() => setShowSignup(false)}
              >
                Sign In
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;