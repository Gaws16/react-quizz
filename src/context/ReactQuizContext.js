import { createContext, useContext, useEffect, useReducer } from "react";
const QuizContext = createContext();
const QUESTIONS_URL = "http://localhost:3001/questions";
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],

  //state can be "loading", "error", "ready", 'active', 'finished'
  status: "loading",
  index: 0,
  points: 0,
  answear: null,
  highscore: 0,
  time: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        time: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswear":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answear: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index++,
        answear: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        status: "ready",
        highscore: state.highscore,
        questions: state.questions,
      };
    case "tick":
      if (state.time === 0) return { ...state, status: "finished" };
      return {
        ...state,
        time: state.time--,
      };
    default:
      throw new Error("Invalid action type");
  }
}
function QuizProvider({ children }) {
  const [
    { questions, status, index, points, answear, highscore, time },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  const question = questions.at(index);

  useEffect(() => {
    fetch(QUESTIONS_URL)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        points,
        answear,
        highscore,
        time,
        dispatch,
        numQuestions,
        maxPoints,
        question,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
export { QuizProvider, useQuiz };
