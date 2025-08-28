import React, { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/yetiAirlinesLogo.png';
import { loginUser } from '../api/api';
import "../styles/login.css";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await loginUser(username, password);
      console.log('Login successful:', result);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid login credentials. Please try again.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-card">
      <div className="logo-container">
        <img src={logo} alt="Yeti Airlines Logo" className="logo" />
      </div>

      <h2 className="admin-header">Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-aux">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="btn">Login</button>
      </form>

      <div className="footer" style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
