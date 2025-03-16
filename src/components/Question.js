import React, { useContext } from "react";
import { SurveyContext } from "../context/SurveyContext";

const Question = ({ question }) => {
  const { saveAnswer, answers } = useContext(SurveyContext);

  return (
    <div className="question-box">
      <p>{question.text}</p>
      {question.type === "rating" ? (
        <select value={answers[question.id] || ""} onChange={(e) => saveAnswer(question.id, e.target.value)}>
          <option value="">Select</option>
          {[...Array(question.scale)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      ) : (
        <textarea value={answers[question.id] || ""} onChange={(e) => saveAnswer(question.id, e.target.value)} placeholder="Your feedback..." />
      )}
    </div>
  );
};

export default Question;
