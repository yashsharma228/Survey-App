import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to Our Survey!</h1>
      <button onClick={() => navigate("/survey")}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
