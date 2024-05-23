import { useReducer } from "react";
const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + action.step };
    case "decrement":
      return { ...state, count: state.count - action.step };
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, count } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: "decrement", step });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: "increment", step });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
