import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup.css';

const SignupForm: React.FC = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <div className="signup-card">
      <h2>Super Admin Signup</h2>
      <p>Signup is currently disabled.</p>

      <div className="footer">
        Already have an account? <Link to="/auth/login">Login</Link>
      </div>
    </div>
  );
};

export default SignupForm;
