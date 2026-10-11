// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('https://backend-3lyx.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Ila email kayn, ghadi tsift lik link f email dyalek.');
        setEmail('');
      } else {
        setError(data.message || 'Mochkil f server');
      }
    } catch (err) {
      setError('Mochkil f connection. 3awd jrreb.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Forgot Password</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <div className={styles.errorMsg}>{error}</div>}
          {message && <div className={styles.successMsg}>{message}</div>}

          <button type="submit" className={styles.formBtn} disabled={loading}>
            {loading ? 'Envoi...' : 'Send reset link'}
          </button>
        </form>

        <p className={styles.signUpLabel}>
          <Link to="/login" className={styles.signUpLink}>
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;