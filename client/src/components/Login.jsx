import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <MessageCircle size={32} color="#0084ff" />
          <h1 className="login-title">Messenger</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Connect with friends and the world around you
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="login-input"
            required
            maxLength={20}
          />
          <button type="submit" className="login-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
