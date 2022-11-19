import React, { useEffect } from "react";
import { TbArrowBackUp, TbColumnInsertLeft } from "react-icons/tb";
import { FcSettings } from "react-icons/fc";
import { FiDivide } from "react-icons/fi";
import { CgAsterisk } from "react-icons/cg";

function RightPanel(props) {
  const getOpsStyle = (operation) => {
    let classes = "button-blue right-panel";
    if (true){
      console.log(props.curr);
      
      classes+='selected';
    }
    return classes;
  };

  return (
    <>
      <div className="button-blue right-panel settings">
        <FcSettings className="icon" />
      </div>
      <div
        className="button-blue right-panel backspace"
        onClick={() => props.keyEntered("backSpace")}
      >
        <TbArrowBackUp className="icon" />
      </div>
      <div
        //operators---->
        className={getOpsStyle("/") + "divide"}
        onClick={() => props.keyEntered("/")}
      >
        <FiDivide className="icon" />
      </div>
      <div className="multi" onClick={() => props.keyEntered("*")}>
        <CgAsterisk className="icon" />
      </div>
      <div className="minus" onClick={() => props.keyEntered("-")}>
        -
      </div>
      <div className="plus" onClick={() => props.keyEntered("+")}>
        +
      </div>
      <div
        className="equals button-blue right-panel"
        onClick={() => props.keyEntered("equals")}
      >
        =
      </div>
    </>
  );
}

export default RightPanel;
