import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import SurveyScreen from "./components/SurveyScreen";
import ThankYouScreen from "./components/ThankYouScreen";
import { SurveyProvider } from "./context/SurveyContext";
import "./App.css";

const App = () => {
  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <SurveyProvider>
      <>
      {!isAuthenticated ? (
  <div className="auth-wrapper">
    <div className="auth-box">
      <h2>Welcome to the Survey App</h2>
      <p>Please login to continue</p>
      <button className="auth-btn" onClick={() => loginWithRedirect()}>
        Login to Start Survey
      </button>
    </div>
  </div>
) : (
  <div className="authenticated-container">
    <div className="user-bar">
    <div className="user-name">👋 Hello, {user.name}</div>
      <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
        Logout
      </button>
    </div>

    <div className="auth-content">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/survey" element={<SurveyScreen />} /> 
          <Route path="/thankyou" element={<ThankYouScreen />} />
        </Routes>
      </Router>
    </div>
  </div>
)}



      </>
    </SurveyProvider>
  );
};

export default App;
