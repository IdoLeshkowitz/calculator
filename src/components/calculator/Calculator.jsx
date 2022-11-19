import React from "react";
import { useState } from "react";
import Main from "./main/Main";
import Sciense from "./sciense/Sciense";
import History from "./history/History";

function Calculator() {
  const [calc, setCalc] = useState("0");
  const [result, setResult] = useState("0");
  const ops = ["/", "*", "+", "-"];

  //key entered gets the key that was entered by user and calls the right function with its value
  const keyEntered = (key) => {
    // gets the value of the key returns its type stringify
    const getKeyType = (key) => {
      const keys = {
        ops: ["/", "*", "+", "-"],
        backSpace: ["backSpace"],
        c: ["c"],
        equals: ["="],
        minusPlus: ["-+"],
        decimal: ["."],
        digit: Array.from(Array(10).keys()).map((digit) => digit.toString()),
      };
      for (const type in keys) {
        if (keys[type].includes(key)) {
          return type;
        }
      }
    };

    //gets the value of the key and its type and calls its handler function
    const keyHandlers = (key, keyType) => {
      //key is digit handler
      const keyIsDigit = (key) => {
        // if calc is "0" replace initial value with key
        if (calc === "0") {
          setCalc(key);
          return;
        }
        // else append key to calc
        setCalc(calc + key);
      };
      //key is ops handler
      const keyIsOps = (key) => {
        //holds the last entered key type
        const lastEnteredKeyType = getKeyType(calc.slice(-1));
        //if calc is empty return
        if (calc == "") return;
        //else switch the last entered key type
        switch (lastEnteredKeyType) {
          //if last entered key is digit append key to calc
          case "digit":
            setCalc(calc + key);
            break;
          //if last entered key is ops replace the last operator with the new one entered
          case "ops":
            setCalc(calc.slice(0, -1) + key);
            break;
        }
      };
      //key is clear handler
      const keyIsC = (key) => {
        const clearCalc = () => setCalc("0");
        const clearResult = () => setResult("0");
        clearCalc();
        clearResult();
      };
      const keyIsBackSpace = (key) => {
        setCalc(calc.slice(0, -1));
      };

      const handlers = {
        digit: keyIsDigit,
        ops: keyIsOps,
        c: keyIsC,
        backSpace: keyIsBackSpace,
      };
      handlers[keyType](key);
    };

    //keeps the type of the current key
    const keyType = getKeyType(key);
    keyHandlers(key, keyType);
  };

  // backspace handler
  const backSpace = () => {
    setCalc(calc.slice(0, -1));
  };
  return (
    <div className="calc-box">
      <Main keyEntered={keyEntered} calc={calc} result={result}></Main>
    </div>
  );
}

export default Calculator;
