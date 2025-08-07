import React from 'react';
import SignupForm from '../components/SignupForm';
import '../styles/signup.css';

const SignupPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
