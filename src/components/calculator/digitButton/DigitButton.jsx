import React from "react";
import { ACTIONS } from "../Calculator";

function DigitButton({ dispatch, digit, gridArea ,className }) {
  return <div className={className} grid-area={gridArea} onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</div>;
}

export default DigitButton;
