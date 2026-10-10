import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();

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
    <StyledWrapper>
      <div className="container">
        <input type="checkbox" id="register_toggle" />
        <div className="slider">
          {/* ===== LOGIN FORM ===== */}
          <form className="form" onSubmit={handleLogin}>
            <span className="title">Login</span>

            <div className="form_control">
              <input
                type="email"
                className="input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <label className="label">Email</label>
            </div>

            <div className="form_control">
              <input
                type="password"
                className="input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <label className="label">Password</label>
            </div>

            {loginError && <div className="error_msg">{loginError}</div>}

            <button type="submit" disabled={loginLoading}>
              {loginLoading ? 'Connexion...' : 'Login'}
            </button>

            <span className="bottom_text">
              Don't have an account?{' '}
              <label htmlFor="register_toggle" className="swtich">
                Sign Up
              </label>
            </span>
          </form>

          {/* ===== SIGNUP FORM ===== */}
          <form className="form" onSubmit={handleSignup}>
            <span className="title">Sign Up</span>

            <div className="form_control">
              <input
                type="text"
                className="input"
                value={signupFullName}
                onChange={(e) => setSignupFullName(e.target.value)}
                required
              />
              <label className="label">Full Name</label>
            </div>

            <div className="form_control">
              <input
                type="email"
                className="input"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <label className="label">Email</label>
            </div>

            <div className="form_control">
              <input
                type="tel"
                className="input"
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
              />
              <label className="label">Phone (optionnel)</label>
            </div>

            <div className="form_control">
              <input
                type="password"
                className="input"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <label className="label">Password</label>
            </div>

            <div className="form_control">
              <input
                type="password"
                className="input"
                value={signupConfirm}
                onChange={(e) => setSignupConfirm(e.target.value)}
                required
              />
              <label className="label">Confirm Password</label>
            </div>

            {signupError && <div className="error_msg">{signupError}</div>}

            <button type="submit" disabled={signupLoading}>
              {signupLoading ? 'Création...' : 'Sign Up'}
            </button>

            <span className="bottom_text">
              Already have an account?{' '}
              <label htmlFor="register_toggle" className="swtich">
                Sign In
              </label>
            </span>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

// ============================================
// ✅ STYLES — Neumorphism dyalek
// ============================================
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  background: #1a1a1a;

  .container {
    width: 320px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    color: white;
    background: #1a1a1a;
    box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
  }

  .container .slider {
    width: 200%;
    position: relative;
    transition: transform ease-out 0.3s;
    display: flex;
  }

  #register_toggle {
    display: none;
  }

  .container #register_toggle:checked + .slider {
    transform: translateX(-50%);
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 1.5em 2em;
    width: 50%;
  }

  .title {
    text-align: center;
    font-weight: 700;
    font-size: 1.8em;
    color: #fff;
  }

  form .form_control {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  form .form_control .label {
    position: absolute;
    top: 50%;
    left: 10px;
    transition: transform ease 0.2s;
    transform: translate(0%, -50%);
    font-size: 0.75em;
    user-select: none;
    pointer-events: none;
    color: #b0b0b0;
  }

  form .form_control .input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    padding: 0.5rem;
    font-size: 0.75rem;
    border-radius: 5px;
    transition: box-shadow ease 0.2s;
    box-sizing: border-box;
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #5f5e5e;
  }

  form .form_control .input:focus,
  form .form_control .input:valid {
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 3px 3px 4px #0e0e0e, inset -3px -3px 4px #5f5e5e;
  }

  form .form_control .input:focus + .label,
  form .form_control .input:valid + .label {
    transform: translate(-150%, -50%);
  }

  form button {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    padding: 0.6rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 5px;
    transition: box-shadow ease 0.1s;
    box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
  }

  form button:hover:not(:disabled) {
    color: #a78bfa;
  }

  form button:active {
    box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 3px 3px 4px #0e0e0e, inset -3px -3px 4px #5f5e5e;
  }

  form button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error_msg {
    width: 100%;
    padding: 8px 10px;
    background: rgba(220, 38, 38, 0.15);
    border: 1px solid rgba(220, 38, 38, 0.4);
    border-radius: 5px;
    color: #fca5a5;
    font-size: 0.7em;
    text-align: center;
  }

  .bottom_text {
    font-size: 0.7em;
    color: #b0b0b0;
  }

  .bottom_text .swtich {
    font-weight: 700;
    cursor: pointer;
    color: #a78bfa;
  }

  .bottom_text .swtich:hover {
    text-decoration: underline;
  }

  @media (max-width: 400px) {
    .container {
      width: 280px;
    }

    .form {
      padding: 1.2em 1.5em;
      gap: 14px;
    }

    .title {
      font-size: 1.5em;
    }
  }
`;

export default Login;