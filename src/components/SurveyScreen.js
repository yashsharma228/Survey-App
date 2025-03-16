import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyContext } from "../context/SurveyContext";
import Question from "./Question";

const SurveyScreen = () => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex } = useContext(SurveyContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => handleNext();

  const handleSubmit = () => {
    setShowPopup(true);
  };

  const confirmSubmit = () => {
    setShowPopup(false);
    navigate("/thankyou"); // Navigate to thank-you screen
  };

  return (
    <div className="survey-container">
      <h2>Question {currentQuestionIndex + 1} / {questions.length}</h2>
      <Question question={questions[currentQuestionIndex]} />
      
      <div className="buttons">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>Previous</button>
        <button onClick={handleSkip}>Skip</button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={handleNext}>Next</button>
        )}
      </div>

      {showPopup && (
        <div className="popup show">
          <div className="popup-content">
            <p>Are you sure you want to submit the survey?</p>
            <button onClick={confirmSubmit}>Yes, Submit</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyScreen;
