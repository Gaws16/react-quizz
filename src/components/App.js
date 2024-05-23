import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
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
function App() {
  const [
    { status, questions, index, answear, points, highscore, time },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  const numQuestions = questions.length;
  useEffect(() => {
    fetch(QUESTIONS_URL)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <main className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              index={index}
              maxPoints={maxPoints}
              numQuestions={numQuestions}
              answear={answear}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answear={answear}
            />
            <Footer>
              <Timer time={time} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answear={answear}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            highscore={highscore}
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </main>
  );
}

export default App;
