import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onClose, onLoginSuccess, api }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all fields!');
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(`${api}/api/login`, { email, password });
        alert(`Welcome back, ${res.data.user.name}!`);
        onLoginSuccess(res.data.user);
      } else {
        if (!name) {
          setError('Please enter your name!');
          return;
        }
        await axios.post(`${api}/api/register`, { name, email, password });
        alert(`Account created successfully! Please login.`);
        setIsLogin(true);
        return;
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        {error && <p className="error-msg">{error}</p>}

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit}>
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p onClick={() => { setIsLogin(!isLogin); setError(''); }} className="switch-text">
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Login;