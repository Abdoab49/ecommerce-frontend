// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (fullName.trim().length < 3) {
      setError('Full name khass ykoun 3la l9al 3 characters');
      return;
    }

    if (password.length < 6) {
      setError('Password khass ykoun 3la l9al 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password w confirm — ma kaytchabhoch');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://backend-3lyx.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, phone })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('lanada_user_id', data.userId);
        localStorage.setItem('lanada_user', JSON.stringify(data.user));
        navigate('/orders');
      } else {
        setError(data.message || 'Mochkil f signup');
      }
    } catch (err) {
      setError('Mochkil f connection. 3awd jrreb.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✨</div>
        <h1>Créer un compte</h1>
        <p>Signup bach ttracki orders dyalek</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Samir El Idrissi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Phone (optionnel)</label>
            <input
              type="tel"
              placeholder="0612345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="•••••••• (min 6)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Création...' : 'Créer un compte'}
          </button>
        </form>

        <p className={styles.switch}>
          3andek compte? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;