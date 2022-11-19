import React from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { FcSettings } from "react-icons/fc";
import { FiDivide } from "react-icons/fi";
import { CgAsterisk } from "react-icons/cg";

function RightPanel(props) {
  return (
    <>
      <div className="button-blue right-panel settings">
        <FcSettings className="icon" />
      </div>
      <div
        className="button-blue right-panel backspace"
        onClick={() => props.keyEntered("backspace")}
      >
        <TbArrowBackUp className="icon" />
      </div>
      <div
        className="button-blue right-panel divide"
        onClick={() => props.keyEntered("/")}
      >
        <FiDivide className="icon" />
      </div>
      <div
        className="button-blue right-panel multi"
        onClick={() => props.keyEntered("*")}
      >
        <CgAsterisk className="icon" />
      </div>
      <div
        className="button-blue right-panel minus"
        onClick={() => props.keyEntered("-")}
      >
        -
      </div>
      <div
        className="button-blue right-panel plus"
        onClick={() => props.keyEntered("+")}
      >
        +
      </div>
      <div
        className="button-blue right-panel equals"
        onClick={() => props.keyEntered("=")}
      >
        =
      </div>
    </>
  );
}

export default RightPanel;
