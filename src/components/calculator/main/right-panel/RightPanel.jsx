import React from "react";

function RightPanel(props) {
  return (
    <>
      <div className="button-white right-panel settings">
        settings
      </div>
        <div className="button-white right-panel backspace" onClick={() => props.backSpace()}>
        backspace
      </div>
      <div className="button-white right-panel divide" onClick={() => props.updateCalc("/")}>
        /
      </div>
      <div className="button-white right-panel multi" onClick={() => props.updateCalc("*")}>
        x
      </div>
      <div className="button-white right-panel minus" onClick={() => props.updateCalc("-")}>
        -
      </div>
      <div className="button-white right-panel plus" onClick={() => props.updateCalc("+")}>
        +
      </div>
      <div className="button-white right-panel equals" onClick={() => props.updateCalc("=")}>
        =
      </div>
    </>
  );
}

export default RightPanel;
