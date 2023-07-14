import { useEffect, useState } from "react";
import "./App.css";

// 4 * 25
// [4, '*', 25] - O(n)

//

/**
 * newExp: 4
 *
 * i=1
 * newExp=""
 * temp1=4
 * j=2
 * i=2
 * temp2=25
 * newExp = 100
 */
//

// 2+2
function calc(exp) {
  const operands = ["-", "+", "*", "/"];
  if (exp.length === 1) return +exp;
  let lastIndex = 0;
  let j = 0;
  let newExp = "";

  for (let i = 0; i < exp.length; i++) {
    let temp1;
    let temp2;
    const val = exp.at(i);
    if (val === "*" || val === "/") {
      newExp = newExp.slice(0, lastIndex);
      temp1 = exp.slice(j, i);
      j = 1 + i++;
      while (!operands.includes(exp.at(i)) && i < exp.length) i++;
      temp2 = exp.slice(j, i--);
      if (val === "*") newExp = newExp + (temp1 * temp2 + "");
      else newExp = newExp + (temp1 / temp2 + "");
    } else if (val === "+" || val === "-") {
      newExp += val;
      j = i + 1;
      lastIndex = newExp.length;
    } else {
      newExp = newExp + (val + "");
    }
  }
  let result = 0;
  j = 0;
  let check = true;
  for (let i = 0; i < newExp.length; i++) {
    const val = newExp.at(i);
    if (val === "+" || val === "-") {
      if (check) {
        result = +newExp.slice(0, i) + result;
        check = false;
      }
      j = 1 + i++;
      while (!operands.includes(newExp.at(i)) && i < newExp.length) i++;
      if (val === "+") result = +newExp.slice(j, i--) + result;
      else result = result - +newExp.slice(j, i--);
    }
  }
  if (check) return exp;
  return result;
}

function App() {
  const actions = ["*", "-", "+", "/"];
  const [result, setResults] = useState("0");
  const [advanceResult, setAdvancedResult] = useState("0");

  useEffect(() => {
    try {
      let exp = result;
      if (actions.includes(result.at(-1))) exp = result.slice(0, -1);
      if (exp === "") {
        setResults("");
        return;
      }
      console.log(exp);
      let a = calc(exp);
      console.log(a);
      if (a + "" === "Infinity") setAdvancedResult("Cannot divide by 0");
      else setAdvancedResult(a + "");
    } catch {}
  }, [result]);

  function clear() {
    setResults("0");
  }

  function backspace() {
    if (result === "Cannot divide by 0") return;
    if (result.length === 1) setResults("0");
    else setResults(result.slice(0, -1));
  }

  function numClickHandler(e) {
    if (result === "Cannot divide by 0") return;
    const val = e.target.innerText;
    if (val === "0") {
      if (result === "0") return;
      if (result.at(-1) === "0" && actions.includes(result.at(-2))) return;
    } else if (val === ".") {
      if (result.at(-1) === ".") return;
    } else {
      if (result === "0") {
        setResults(val);
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
    if (result === "Infinity") return;
    const val = e.target.name;
    if (actions.includes(result.at(-1))) {
      //if (result.at(-1) === val) return;
      setResults(result.slice(0, -1).concat(val));
      return;
    }
    setResults(result.concat(val));
  }

  function resultHandler() {
    try {
      let exp = result;
      if (actions.includes(result.at(-1))) exp = result.slice(0, -1);
      if (exp === "") {
        setResults("");
        return;
      }
      let a = eval(exp);

      if (a + "" === "Infinity") setResults("Cannot divide by 0");
      else setResults(a + "");
    } catch {
      console.log("Seems there is an error in the input provided");
    }
  }

  return (
    <div className="calc">
      <form className="results">
        <input id="result-input" type="text" value={result} />
        {result !== "0" && (
          <input
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
        <button onKeyUp={numClickHandler} onClick={numClickHandler}>
          2
        </button>
        <button
          onKeyUp={(e) => {
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
        <button onKeyUp={numClickHandler} onClick={numClickHandler}>
          .
        </button>
        <button id="result" onClick={resultHandler}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
