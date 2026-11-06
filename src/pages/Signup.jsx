
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.css';

const API = 'https://backend-3lyx.onrender.com/api';

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (fullName.trim().length < 3) {
      setError('Full name must contain at least 3 characters.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          fullName: fullName.trim(),
          phone: phone.trim()
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Could not create your account.');
        return;
      }

      localStorage.setItem('lanada_user_id', data.userId);
      localStorage.setItem('lanada_user', JSON.stringify(data.user));

      window.dispatchEvent(new Event('userChanged'));

      navigate('/orders');

    } catch (err) {
      console.error('Signup error:', err);
      setError('Connection problem. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.signupPage}>

      <div className={styles.signupContainer}>

        {/* LEFT FORM */}

        <section className={styles.formPanel}>

          <div className={styles.formContent}>

            <Link to="/" className={styles.backLink}>
              <span>←</span> Back to shopping
            </Link>

            <div className={styles.heading}>
              <span className={styles.eyebrow}>
                YOUR STYLE STARTS HERE
              </span>

              <h1>
                Create your
                <br />
                <span>account.</span>
              </h1>

              <p>
                Join LANADA and discover a collection
                designed around your style.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>

              {/* FULL NAME */}

              <div className={styles.field}>
                <label htmlFor="fullName">Full name</label>

                <div className={styles.inputWrapper}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    minLength={3}
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className={styles.field}>
                <label htmlFor="email">Email address</label>

                <div className={styles.inputWrapper}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PHONE */}

              <div className={styles.field}>
                <label htmlFor="phone">
                  Phone number <span>Optional</span>
                </label>

                <div className={styles.inputWrapper}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />
                  </svg>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="+212 6XX XXX XXX"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className={styles.field}>
                <label htmlFor="password">Password</label>

                <div className={styles.inputWrapper}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}

              <div className={styles.field}>
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div className={styles.inputWrapper}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>

                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* ERROR */}

              {error && (
                <div className={styles.errorMessage} role="alert">
                  {error}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                <span>
                  {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                </span>

                {!loading && <span className={styles.arrow}>→</span>}
              </button>

            </form>

            <div className={styles.loginLink}>
              Already have an account?
              <Link to="/login">Sign in</Link>
            </div>

            <p className={styles.terms}>
              By creating an account, you agree to our
              <Link to="/terms"> Terms </Link>
              and
              <Link to="/privacy"> Privacy Policy.</Link>
            </p>

          </div>
        </section>

        {/* RIGHT VISUAL */}

        <aside className={styles.visualPanel}>

          <img
            className={styles.visualImage}
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85"
            alt="Fashion boutique collection"
          />

          <div className={styles.imageOverlay}></div>

          <div className={styles.visualTop}>
            <span>EST. 2025</span>
            <span>NEW COLLECTION</span>
          </div>

          <div className={styles.visualText}>
            <span className={styles.visualEyebrow}>
              DISCOVER YOUR STYLE
            </span>

            <h2>
              Fashion is
              <br />
              more than
              <br />
              <i>what you wear.</i>
            </h2>

            <p>
              Discover timeless pieces and express
              your individuality with LANADA.
            </p>
          </div>

          <div className={styles.visualBottom}>
            <span>TIMELESS STYLE.</span>
            <span>LANADA © 2026</span>
          </div>

        </aside>

      </div>
    </main>
  );
};

export default Signup;
