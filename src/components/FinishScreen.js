function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) {
    emoji = "🎉";
  } else if (percentage > 50) {
    emoji = "👍";
  } else if (percentage > 25) {
    emoji = "👎";
  } else {
    emoji = "🤦‍♂️";
  }
  return (
    <>
      <p className="result">
        {emoji} You got {points} out of {maxPoints} ({Math.ceil(percentage)}%)
        points!
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
