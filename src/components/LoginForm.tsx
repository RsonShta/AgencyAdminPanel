import React, { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import logo from '../assets/yetiAirlinesLogo.png';
import { handleLogin } from '../api/apiData';
import "../styles/login.css";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await handleLogin(username, password);
      if (result.access_token) {
        // Save token in localStorage
        localStorage.setItem('access_token', result.access_token);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid login credentials. Please try again.');
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

        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '60%',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
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
