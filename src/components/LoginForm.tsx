import React, { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import logo from '../assets/yetiAirlinesLogo.png';
import { handleLogin } from '../api/apiData';
import { useAuth } from '../context/AuthContext';
import "../styles/login.css";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await handleLogin(username, password);
      console.log("Login API response:", result); // For debugging
      if (result.status === 'success' && result.username) {
        const role = result.role;
        const token = result.access_token;
        const email = result.email;
        login(token, role, result.username, email);
        // Navigation is now handled by the useEffect hook
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid login credentials. Please try again.');
        } else {
          setError('Unexpected error occurred.');
        }
      } else if (err.request) {
        setError('Server unreachable. Please try again later.');
      } else {
        setError('Unexpected error occurred.');
      }
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
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

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="footer" style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/auth/register">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
