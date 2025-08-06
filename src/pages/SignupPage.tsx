import React from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const SignupPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div>
        <SignupForm />
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
