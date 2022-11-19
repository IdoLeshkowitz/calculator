import React from "react";
import { useState } from "react";
import Main from "./main/Main";
import Sciense from "./sciense/Sciense";
import History from "./history/History";

function Calculator() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const ops = ["/", "*", "+", "-"];

  //key entered gets the key that was entered by user and calls the right function with its value
  const keyEntered = (key) => {
    // gets the value of the key returns its type stringify
    const getKeyType = (key) => {
      const keys = {
        ops: ["/", "*", "+", "-"],
        backspace: ["backspace"],
        c: ["c"],
        equals: ["="],
        minusPlus: ["-+"],
        decimal: ["."],
        digit:Array.from(Array(10).keys()).map(digit=>digit.toString()),
      };
      for (const type in keys) {
        if (keys[type].includes(key)) {
          return type;
        }
      }
    };

    //gets the value of the key and its type and calls its handler function 
    const keyHandlers =(key,keyType)=>{
      
      //key is digit handler
      const keyIsDigit =(key) =>{
        setCalc(calc+key);
      }
      const handlers ={
        digit :keyIsDigit
      }
      handlers[keyType](key);
    }

    //keeps the type of the current key 
    const keyType= getKeyType(key);
    keyHandlers(key,keyType);
  };















  
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
  const backSpace = () => {
    setCalc(calc.slice(0, -1));
  };
  return (
    <div className="calc-box">
      <Main
        keyEntered={keyEntered}
        calc={calc}
        result={result}
      ></Main>
    </div>
  );
}

export default Calculator;
