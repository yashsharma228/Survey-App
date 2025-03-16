import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThankYouScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  return (
    <div className="thank-you-container">
      <h2>Thank You for Your Feedback! 😊</h2>
      <p>Redirecting to the welcome screen...</p>
    </div>
  );
};

export default ThankYouScreen;
