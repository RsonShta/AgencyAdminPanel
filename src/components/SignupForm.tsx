import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signupUser } from '../api/api';
import '../styles/signup.css';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await signupUser(username, email, phone_number, password);

      if (response) {
        setSuccess('Signup successful! You can now log in.');
        setUsername('');
        setPassword('');
        setEmail('');
        setPhoneNumber('');
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during signup.');
    }
  };

  return (
    <div className="signup-card">
      <h2>Super Admin Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            id="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Sign Up</button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
      </form>

      <div className="footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignupForm;
