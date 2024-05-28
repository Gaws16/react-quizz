import { useQuiz } from "../context/ReactQuizContext";

function Options() {
  const { question, dispatch, answear } = useQuiz();
  const isAnswered = answear !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            disabled={isAnswered}
            key={option}
            className={`btn btn-option ${
              isAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => dispatch({ type: "newAnswear", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
