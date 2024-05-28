import { useQuiz } from "../context/ReactQuizContext";

function Progress() {
  const { numQuestions, index, points, maxPoints, answear } = useQuiz();
  return (
    <main className="progress">
      <progress value={index + Number(answear !== null)} max={numQuestions} />
      <p>
        Question {index}/{numQuestions}
      </p>
      <p>
        Points {points}/{maxPoints}
      </p>
    </main>
  );
}

export default Progress;
