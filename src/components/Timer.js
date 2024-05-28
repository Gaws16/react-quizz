import { useEffect } from "react";
import { useQuiz } from "../context/ReactQuizContext";

function Timer() {
  const { time, dispatch } = useQuiz();
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <p className="timer">
      {minutes < 10 ? "0" : ""}
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </p>
  );
}

export default Timer;
