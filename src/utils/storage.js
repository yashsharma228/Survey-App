export const saveSurveyToLocalStorage = (answers) => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
  };
  
  export const getSurveyFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("surveyAnswers")) || {};
  };
  