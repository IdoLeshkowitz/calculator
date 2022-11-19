import React from "react";
import { useState, useReducer } from "react";
import OperationButton from "./operationButton/OperationButton";
import DigitButton from "./digitButton/DigitButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  const createDigits = () => {
    let nums = [
      {
        digit: 0,
        gridArea: 27,
        className: "button-white",
      },
      {
        digit: 1,
        gridArea: 21,
        className: "button-white",
      },
      {
        digit: 2,
        gridArea: 22,
        className: "button-white",
      },
      {
        digit: 3,
        gridArea: 23,
        className: "button-white",
      },
      {
        digit: 4,
        gridArea: 16,
        className: "button-white",
      },
      {
        digit: 5,
        gridArea: 17,
        className: "button-white",
      },
      {
        digit: 6,
        gridArea: 18,
        className: "button-white",
      },
      {
        digit: 7,
        gridArea: 11,
        className: "button-white",
      },
      {
        digit: 8,
        gridArea: 12,
        className: "button-white",
      },
      {
        digit: 9,
        gridArea: 13,
        className: "button-white",
      },
    ];
    return nums.map((num) => <DigitButton digit={num.digit} className={num.className} gridArea={num.gridArea} dispatch={dispatch} />);
  };
  const createOperators = () => {
    const operators = [
      {
        operation: "÷",
        className: "button-orange",
        gridArea: "i",
      },
      {
        operation: "-",
        className: "button-orange",
        gridArea: "s",
      },
      {
        operation: "*",
        className: "button-orange",
        gridArea: "n",
      },
      {
        operation: "+",
        className: "button-orange",
        gridArea: "x",
      },
    ];
    return operators.map((operator) => (
      <OperationButton
        operation={operator.operation}
        dispatch={dispatch}
        className={operator.className}
        gridArea={operator.gridArea}
      />
    ));
  };
  return (
    <div className="calc-box">
      <div className="main-box">
        {/* display----> */}
        <div className="display-box" grid-area="e">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>

        {/* digits-----> */}
        {/* {createDigits()} */}

        {/* operatores-----> */}
        {createOperators()}
      </div>
    </div>
  );
}

export default Calculator;

//   //gets the value of the key and its type and calls its handler function
//   const keyHandlers = (key, keyType) => {
//     //key is digit handler
//     const keyIsDigit = (key) => {
//       //append key to curr
//       setCurr(curr + key);
//     };
//     //key is ops handler
//     const keyIsOps = (key) => {
//       let currLastKeyType =  getKeyType(curr.slice(-1));
//       const currLastIsDigit = () => {
//         // if curr last key is a digit update prev and set new key as curr
//         setPrev(eval(prev + curr));
//         setCurr(key);
//       };
//       const currLastIsOps = () => {
//         setCurr(curr.substring(0,-1)+key);
//       };
//       const currLastIsNone = () => {
//         setCurr(key);
//       };
//       const handlers = {
//         "ops": currLastIsOps,
//         "digit": currLastIsDigit,
//         "none": currLastIsNone,
//       };
//       handlers[currLastKeyType]();
//     };

//     //key is clear handler
//     const keyIsC = (key) => {
//       const clearCalc = () => setCurr("+");
//       const clearResult = () => setPrev("0");
//       clearCalc();
//       clearResult();
//     };
//     //key is backSpace
//     const keyIsBackSpace = (key) => {
//       const currLastType=  getKeyType(curr.slice(-1));
//       if (currLastType ==="digit"){
//         setCurr(curr.slice(0,-1));
//       }
//     };
//     //key is minusPlus
//     const keyIsMinusPlus = (key) => {
//       //converts curr from non negetive to negtive and the opposite
//       const currLastType=  getKeyType(curr.slice(-1));
//       if (currLastType ==="digit"){
//         setCurr(curr * -1);
//       }

//     };
//     //key is =
//     const keyIsEquals = (key) => {
//       const lastEnteredKeyType = getKeyType(curr.slice(-1));
//       switch (lastEnteredKeyType) {
//         case "ops":
//           setPrev(eval(prev + curr + prev).toString());
//           setCurr("0");
//         //   case "digit":
//         //     setPrev(eval(prev + curr).toString());
//         //     setCurr("0");
//       }
//     };

//     const handlers = {
//       digit: keyIsDigit,
//       ops: keyIsOps,
//       c: keyIsC,
//       backSpace: keyIsBackSpace,
//       minusPlus: keyIsMinusPlus,
//       equals: keyIsEquals,
//     };
//     handlers[keyType](key);
//   };

//   //keeps the type of the current key
//   const keyType = getKeyType(key);
//   keyHandlers(key, keyType);
// };
