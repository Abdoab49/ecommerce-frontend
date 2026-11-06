import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');

    if (name === 'email') {
      setEmailError(
        value.length > 0 && !isValidEmail(value)
          ? 'Please enter a valid email address.'
          : ''
      );
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setError('');
    setEmailError('');
    setFormData({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!isLogin && name.length < 3) {
      setError('Full name must be at least 3 characters.');
      return;
    }

    setLoading(true);

    try {
      const result = isLogin
        ? await loginUser({
            email,
            password: formData.password,
          })
        : await registerUser({
            name,
            email,
            password: formData.password,
          });

      if (result?.token) {
        localStorage.setItem('token', result.token);
        navigate('/');
      } else {
        setError(result?.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(
        err?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="lanada-auth">
      <section className="auth-shell">

        {/* LEFT SIDE — FORM */}
        <div className="auth-form-side">
          <div className="auth-form-inner">

            <a href="/" className="auth-brand" aria-label="LANADA home">
              <span className="auth-brand-mark">L</span>
              <span>LANADA</span>
            </a>

            <div className="auth-heading">
              <span className="auth-eyebrow">
                {isLogin ? 'WELCOME BACK' : 'JOIN LANADA'}
              </span>

              <h1>
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </h1>

              <p>
                {isLogin
                  ? 'Enter your details to access your personal space.'
                  : 'Create an account and discover the LANADA experience.'}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {!isLogin && (
                <div className="auth-field">
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email address</label>

                <div className={`auth-input-wrap ${emailError ? 'has-error' : ''}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>

                  <input
                    id="auth-email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {emailError && (
                  <p className="auth-field-error">{emailError}</p>
                )}
              </div>

              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="auth-password">Password</label>

                  {isLogin && (
                    <a href="/forgot-password" className="auth-forgot">
                      Forgot password?
                    </a>
                  )}
                </div>

                <div className="auth-input-wrap">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M12 14v3" />
                  </svg>

                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.3 2.2-2.5 3.3" />
                        <path d="M6.2 6.2C3.9 7.7 2.7 10 2.5 12c.5 1.3 3.8 7 9.5 7 1 0 2-.2 2.9-.5" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <p className="auth-password-hint">
                  Use at least 6 characters for your password.
                </p>
              )}

              {error && (
                <div className="auth-error" role="alert">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v5M12 16h.01" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                className="auth-submit"
                type="submit"
                disabled={loading || Boolean(emailError)}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner" />
                    Please wait...
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign in' : 'Create account'}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="auth-switch">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button type="button" onClick={switchMode}>
                {isLogin ? 'Create account' : 'Sign in'}
              </button>
            </div>

            <p className="auth-terms">
              By continuing, you agree to our
              <a href="/terms"> Terms</a> and
              <a href="/privacy"> Privacy Policy</a>.
            </p>

          </div>
        </div>

        {/* RIGHT SIDE — BRAND PANEL */}
        <aside className="auth-visual">
          <div className="auth-visual-pattern" aria-hidden="true">
            <span className="pattern-circle pattern-circle-one" />
            <span className="pattern-circle pattern-circle-two" />
            <span className="pattern-line pattern-line-one" />
            <span className="pattern-line pattern-line-two" />
            <span className="pattern-letter">L</span>
          </div>

          <div className="auth-visual-content">
            <div className="auth-visual-top">
              <span className="auth-visual-logo">LANADA</span>
              <span className="auth-visual-dot" />
            </div>

            <div className="auth-visual-message">
              <span className="auth-eyebrow auth-eyebrow-light">
                THE LANADA EXPERIENCE
              </span>

              <h2>
                Style begins
                <br />
                with you.
              </h2>

              <p>
                Discover pieces that reflect your identity.
                A considered collection, a better experience,
                and a style that feels entirely yours.
              </p>
            </div>

            <div className="auth-promo-card">
              <span className="auth-promo-number">01 — LANADA</span>
              <h3>
                A new perspective
                <br />
                on everyday style.
              </h3>
              <div className="auth-promo-bottom">
                <span>DISCOVER YOUR STYLE</span>
                <span className="auth-promo-arrow">↗</span>
              </div>
            </div>

            <div className="auth-visual-footer">
              <span>LANADA — YOUR STYLE, YOUR STORY</span>
              <span>© 2026</span>
            </div>
          </div>
        </aside>

      </section>
    </main>
  );
};

export default LoginSignup;