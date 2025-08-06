import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../styles/auth.css";

const LoginPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div>
        <LoginForm />
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account? <Link to="/signup">Create Super Admin</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
