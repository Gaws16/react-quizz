import Options from "./Options";
function Question({ question, dispatch, answear }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answear={answear} />
    </div>
  );
}

export default Question;
