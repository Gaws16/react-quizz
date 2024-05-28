import { useQuiz } from "../context/ReactQuizContext";

function NextButton() {
  const { dispatch, answear, index, numQuestions } = useQuiz();
  if (answear === null) {
    return null;
  }
  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton;
