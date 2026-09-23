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
    password: ''
  });
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');

    if (e.target.name === 'email') {
      if (e.target.value.length > 0 && !isValidEmail(e.target.value)) {
        setEmailError('❌ Invalid email format (example: name@domain.com)');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(formData.email)) {
      setEmailError('❌ Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('❌ Password must be at least 6 characters');
      return;
    }

    if (!isLogin && formData.name.length < 3) {
      setError('❌ Name must be at least 3 characters');
      return;
    }

    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await loginUser({ email: formData.email, password: formData.password });
      } else {
        result = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      if (result && result.token) {
        localStorage.setItem('token', result.token);
        navigate('/');
      } else {
        setError(result?.message || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="flex-column">
              <label>Full Name </label>
            </div>
            <div className="inputForm">
              <input
                placeholder="Enter your Full Name"
                className="input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter your Email"
            className={`input ${emailError ? 'input-error' : ''}`}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {emailError && <p className="field-error">{emailError}</p>}

        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <input
            placeholder="Enter your Password"
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="button-submit" type="submit" disabled={loading || emailError}>
          {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>

        <p className="p" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="span">{isLogin ? 'Sign Up' : 'Sign In'}</span>
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;