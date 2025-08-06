import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", background: "#f4f6f8" }}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
