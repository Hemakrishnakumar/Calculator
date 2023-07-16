import { useEffect, useState } from "react";
import "./App.css";

//This function takes an expression as a string and performs the calculation and return the result of an expression for exp : '45+3*9' returns 72
function calc(exp) {
  if (+exp >= 0 || +exp < 0) return exp; // Return the exp as it is, if there are no operators
  const operators = ["-", "+", "*", "/"];
  let lastIndex = 0;
  let j = 0;
  let newExp = "";
  let noOperator = true;
  for (let i = 0; i < exp.length; i++) {
    //this for loop performs all the multiplications and divisions in an expression and creates a  newExp which contains +/- only
    let temp1;
    let temp2;
    let val = exp.at(i);
    if (val === "*" || val === "/") {
      newExp = newExp.slice(0, lastIndex);
      temp1 = +exp.slice(j, i);
      while (true) {
        j = ++i;
        while (!operators.includes(exp.at(i)) && i < exp.length) i++;
        temp2 = +exp.slice(j, i);
        if (exp.at(i) === "*" || exp.at(i) === "/") {
          if (val === "*") temp1 = temp1 * temp2;
          else temp1 = temp1 / temp2;
          val = exp.at(i);
        } else break;
      }
      i--;
      if (val === "*") newExp = newExp + (temp1 * temp2 + "");
      else {
        if (temp2 === 0) {
          return "Infinity";
        }
        newExp = newExp + (temp1 / temp2 + "");
      }
    } else if (val === "+" || val === "-") {
      noOperator = false;
      newExp += val;
      j = i + 1;
      lastIndex = newExp.length;
    } else {
      newExp = newExp + (val + "");
    }
  }
  if (noOperator) return newExp; // returning the newExp after performing multiplications and divisions to exp as there is no additions are no subtractions to be done
  let result = 0;
  j = 0;
  noOperator = true; //reusing the same variable
  for (let i = 0; i < newExp.length; i++) {
    const val = newExp.at(i);
    if (val === "+" || val === "-") {
      if (noOperator) {
        result = +newExp.slice(0, i) + result;
        noOperator = false;
      }
      j = 1 + i++;
      while (!operators.includes(newExp.at(i)) && i < newExp.length) i++;
      if (val === "+") result = +newExp.slice(j, i--) + result;
      else result = result - +newExp.slice(j, i--);
    }
  }
  return result;
}

function App() {
  const actions = ["*", "-", "+", "/"];
  const [result, setResults] = useState("0");
  const [advanceResult, setAdvancedResult] = useState("0");

  useEffect(() => {
    let exp = result;
    if (actions.includes(result.at(-1))) exp = result.slice(0, -1);
    if (exp === "") {
      setResults("0");
      return;
    }
    let a = calc(exp);
    if (a + "" === "Infinity") setAdvancedResult("Can't divide by 0");
    else setAdvancedResult(a + "");
  }, [result]);

  function clear() {
    setResults("0");
  }

  function backspace() {
    if (result === "Can't divide by 0") return;
    if (result.length === 1) setResults("0");
    else setResults(result.slice(0, -1));
  }

  function numClickHandler(e) {
    if (result === "Can't divide by 0") return; //User should not be allowed when there is this error message as a result
    const val = e.target.innerText;
    if (val === "0") {
      // prevent user from entering multiple 0's at start of the number
      if (result === "0") return;
      if (result.at(-1) === "0" && actions.includes(result.at(-2))) return;
    } else if (val === ".") {
      if (result.at(-1) === ".") return;
    } else {
      if (result === "0") {
        setResults(val); // overrides the 0 at the start of a number when a non zero is entered
        return;
      }
      if (result.at(-1) === "0" && actions.includes(result.at(-2))) {
        setResults(result.slice(0, -1).concat(val));
        return;
      }
    }
    setResults(result.concat(val));
  }

  function actionHandler(e) {
    if (result === "Can't divide by 0") return;
    const val = e.target.name;
    if (actions.includes(result.at(-1))) {
      setResults(result.slice(0, -1).concat(val));
      return;
    }
    setResults(result.concat(val));
  }

  function resultHandler() {
    let exp = result;
    if (actions.includes(result.at(-1))) exp = result.slice(0, -1);
    if (exp === "") {
      setResults("");
      return;
    }
    let a = calc(exp);
    if (a + "" === "Infinity") setResults("Can't divide by 0");
    else setResults(a + "");
  }

  return (
    <div className="calc">
      <form className="results">
        <input
          onChange={() => {}}
          id="result-input"
          type="text"
          value={result}
        />
        {result !== "0" && (
          <input
            onChange={() => {}}
            id="advanced-result-input"
            type="text"
            value={`=${advanceResult}`}
          />
        )}
      </form>
      <div className="keypad">
        <button id="clear" onClick={clear}>
          clear
        </button>
        <button className="action" onClick={backspace}>
          C
        </button>
        <button className="action" name="/" onClick={actionHandler}>
          &divide;
        </button>
        <button onClick={numClickHandler}>7</button>
        <button onClick={numClickHandler}>8</button>
        <button onClick={numClickHandler}>9</button>
        <button className="action" name="*" onClick={actionHandler}>
          &times;
        </button>
        <button onClick={numClickHandler}>4</button>
        <button onClick={numClickHandler}>5</button>
        <button onClick={numClickHandler}>6</button>
        <button className="action" name="-" onClick={actionHandler}>
          -
        </button>
        <button onClick={numClickHandler}>1</button>
        <button onClick={numClickHandler}>2</button>
        <button
          onKeyDown={(e) => {
            console.log(e);
          }}
          onClick={numClickHandler}
        >
          3
        </button>
        <button className="action" name="+" onClick={actionHandler}>
          +
        </button>
        <button
          onKeyUp={(e) => {
            console.log(e);
          }}
          onClick={numClickHandler}
        >
          0
        </button>
        <button onClick={numClickHandler}>.</button>
        <button id="result" onClick={resultHandler}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
