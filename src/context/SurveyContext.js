import { createContext, useState } from "react";
import { questions } from "../data/questions";
import { saveSurveyToLocalStorage, getSurveyFromLocalStorage } from "../utils/storage";

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState(getSurveyFromLocalStorage() || {});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId] = useState(`session-${Date.now()}`); // Fixed template literal

  const saveAnswer = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    saveSurveyToLocalStorage(updatedAnswers);
  };

  return (
    <SurveyContext.Provider value={{ questions, answers, currentQuestionIndex, setCurrentQuestionIndex, saveAnswer, sessionId }}>
      {children}
    </SurveyContext.Provider>
  );
};
