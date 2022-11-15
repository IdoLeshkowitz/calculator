import React from "react";
import { useState } from "react";
import Main from "./main/Main";
import Sciense from "./sciense/Sciense";
import History from "./history/History";

function Calculator() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const ops = ["/", "*", "+", "-"];

  //digit / ops clicked handler
  const updateCalc = (value) => {
    //case 1 an operator typed
    if (ops.includes(value)) {
      //if calc is empty return
      if (calc == "") return;
      //if last entered value is operation return
      if (ops.includes(calc.slice(-1))) return;
      //if the operator is '.' check if its the first otherwise return
      if (value == "." && calc.includes(".")) return;
      //else update calc
      setCalc(calc + value);
      return;
    }

    //case 2 - '=' was typed
    if (value === "=") {
      // if calc is empty or if last enterd value is ops return
      if (ops.includes(calc.slice(-1)) || calc === "") return;
      //otherwise update result
      setResult(eval(calc + result).toString());
      return;
    }

    // //case 3 a decimal point was typed
    // if (value==='.'){

    // }
    //case 4 a digit was typed
    setCalc(calc + value);
  };

  // cc button handler
  const resetAll = () => {
    setResult("");
    setCalc("");
  };

  // backspace handler 
  const backSpace=()=>{
    setCalc(calc.slice(0,-1));
  }
  return (
    <div className="calc-box">
      <Main
        updateCalc={updateCalc}
        calc={calc}
        result={result}
        resetAll={resetAll}
        backSpace={backSpace}
      ></Main>
    </div>
  );
}

export default Calculator;
