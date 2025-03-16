import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import SurveyScreen from "./components/SurveyScreen";
import ThankYouScreen from "./components/ThankYouScreen";
import { SurveyProvider } from "./context/SurveyContext";
import "./App.css";

const App = () => {
  return (
    <SurveyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/survey" element={<SurveyScreen />} />
          <Route path="/thankyou" element={<ThankYouScreen />} />
        </Routes>
      </Router>
    </SurveyProvider>
  );
};

export default App;
