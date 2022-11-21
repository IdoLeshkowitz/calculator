import React, { useEffect } from "react";
import { useState, useReducer } from "react";
import OperationButton from "./operationButton/OperationButton";
import DigitButton from "./digitButton/DigitButton";
import { TbArrowBackUp, TbColumnInsertLeft } from "react-icons/tb";
import { FcSettings } from "react-icons/fc";
import { FiDivide } from "react-icons/fi";
import { CgAsterisk, CgLogIn } from "react-icons/cg";
import {HiOutlineLightBulb} from 'react-icons/hi';
import { AiOutlinePlus, AiOutlineVerticalAlignBottom } from "react-icons/ai";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  MINUS_PLUS: "minus-plus",
  LIGHT_MODE_TOGGLE :'light-mode-toggle'
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.LIGHT_MODE_TOGGLE:
      let modes =['dark','light'];
      // if current light mode state is empty set it to dark 
      if (!state.lightMode){
        return {
          ...state,
          lightMode:'dark'
        }
      }
      return {
        ...state,
        lightMode:modes[1-modes.indexOf(state.lightMode)]
      }
      
    case ACTIONS.MINUS_PLUS:
      //if current operand is null continue else update it
      if (state.currentOperand) {
        return {
          ...state,
          currentOperand: (parseFloat(state.currentOperand) * -1).toString(),
        };
      }
      // if previous operand is null  update it
      if (state.previousOperand) {
        return {
          ...state,
          previousOperand: (parseFloat(state.previousOperand) * -1).toString(),
        };
      }
      //else do nothing
      return state;
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: state.currentOperand + payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
    
      // if digit is decimal point
       if(  state.currentOperand && state.currentOperand.includes(".")) {
        //if current operand conatins decimal or its none do nothing
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
  const [integer, decimal] = operand.toString().split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function Calculator() {
  const [{ currentOperand, previousOperand, operation,lightMode }, dispatch] = useReducer(
    reducer,
    {}
  );
  const createDigits = () => {
    //returns array of digitbutton components
    let nums = [
      {
        digit: 0,
        gridArea: "aa",
        className: "button-white",
      },
      {
        digit: 1,
        gridArea: "u",
        className: "button-white",
      },
      {
        digit: 2,
        gridArea: "v",
        className: "button-white",
      },
      {
        digit: 3,
        gridArea: "w",
        className: "button-white",
      },
      {
        digit: 4,
        gridArea: "p",
        className: "button-white",
      },
      {
        digit: 5,
        gridArea: "q",
        className: "button-white",
      },
      {
        digit: 6,
        gridArea: "r",
        className: "button-white",
      },
      {
        digit: 7,
        gridArea: "k",
        className: "button-white",
      },
      {
        digit: 8,
        gridArea: "l",
        className: "button-white",
      },
      {
        digit: 9,
        gridArea: "m",
        className: "button-white",
      },
      {
        digit: '.',
        gridArea: "ab",
        className: "button-blue",
      },
      
    ];
    return nums.map((num) => (
      <DigitButton
        digit={num.digit}
        className={num.className}
        gridArea={num.gridArea}
        dispatch={dispatch}
        key={num.digit}
      />
    ));
  };
  const createOperators = () => {
    //returns array of operator button components
    const operators = [
      {
        operation: "÷",
        className: "button-orange",
        gridArea: "i",
        displayed: <FiDivide className="icon" />,
      },
      {
        operation: "-",
        className: "button-orange",
        gridArea: "s",
        displayed: "-",
      },
      {
        operation: "*",
        className: "button-orange",
        gridArea: "n",
        displayed: <CgAsterisk className="icon" />,
      },
      {
        operation: "+",
        className: "button-orange",
        gridArea: "x",
        displayed: <AiOutlinePlus className="icon" />,
      },
    ];
    return operators.map((operator) => (
      <OperationButton
        operation={operator.operation}
        dispatch={dispatch}
        className={operator.className}
        gridArea={operator.gridArea}
        displayed={operator.displayed}
        key={operator.operation}
      />
    ));
  };
  const getButtonsClasses=(button)=>{
      let classes={
        display:()=>{
          let classes = "button display-box";
          // if mode is not defined set as light mode 
          if (!lightMode)return classes +' light';
          if (lightMode==='dark') return classes +' dark';
          return classes +' light';
        }
      }
      return classes[button]();
  }
  const createFunctions = () => {};
  return (
  <div className="calc-box" >
      <div className="main-box">
        {/* display----> */}
        <div className={getButtonsClasses('display')} grid-area="e">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
          </div>

        {/* digits-----> */}
        {createDigits()}


        {/* operatores-----> */}
        {createOperators()}

        {/* backspace ---->*/}
        <div
          className="button-blue"
          grid-area="f"
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          <TbArrowBackUp className="icon" />
        </div>
        
        {/* light mode button */}
        <div className='button-orange' grid-area="d" onClick={()=>dispatch({type:ACTIONS.LIGHT_MODE_TOGGLE})}><HiOutlineLightBulb className="icon" /></div>
        
        {/* clear button----> */}
        <div
          className="button-blue"
          grid-area="h"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          C
        </div>

        {/* ± button----> */}
        <div
          className="button-white"
          grid-area="z"
          onClick={() => dispatch({ type: ACTIONS.MINUS_PLUS })}
        >
          ±
        </div>

        {/* = button -----> */}
        <div
          className="button-blue"
          grid-area="ac"
          onClick={() =>
            dispatch({ type: ACTIONS.EVALUATE, payload: { currentOperand } })
          }
        >
          =
        
        
        </div>
      </div>
    </div>
  );
}

export default Calculator;
