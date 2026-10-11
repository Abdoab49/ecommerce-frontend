// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // ✅ Validation
    if (password.length < 6) {
      setError('Password khass ykoun 3la l9al 6 characters');
      return;
    }

    if (password !== confirm) {
      setError('Password w confirm — ma kaytchabhoch');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://backend-3lyx.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          newPassword: password
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Password bdel mzyan! Ghadi n3awdouk l Login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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
        <p className={styles.title}>Reset Password</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="password"
            className={styles.input}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className={styles.input}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {error && <div className={styles.errorMsg}>{error}</div>}
          {message && <div className={styles.successMsg}>{message}</div>}

          <button
            type="submit"
            className={styles.formBtn}
            disabled={loading || !!message}
          >
            {loading ? 'Enregistrement...' : 'Reset Password'}
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

export default ResetPassword;