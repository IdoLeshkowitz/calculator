import { useState } from "react";

function Pad(props) {
  //creates inital digits div array
  const createDigits = () => {
    let output = [];
    for (let index = 9; index > 0; index--) {
      output.push(
        <div
          className="button-white {index}"
          key={index}
          onClick={() => props.keyEntered(index.toString())}
        >
          {index}
        </div>
      );
    }

    return output;
  };

  return (
    <>
      <div className="pad-header header">My Calculator</div>
      {/* display */}
      {/* ///////////////////////////////////////////////////////// */}
      <div className="display-box yellow display">
        {props.result ? <span>({props.result})</span> : ""}
        {props.calc || "0"}
      </div>
      {/* c */}
      {/* ///////////////////////////////////////////////////////// */}
      <div
        className="button-blue c"
        span="3"
        onClick={() => props.keyEntered("c")}
      >
        C
      </div>
      {/* digits */}
      {/* ///////////////////////////////////////////////////////// */}
      {createDigits()}
      {/* -+  0  . */}
      {/* ///////////////////////////////////////////////////////// */}
      <div
        className="button-white decimal"
        onClick={() => props.keyEntered(".")}
      >
        .
      </div>
      <div className="button-white zero" onClick={() => props.keyEntered("0")}>
        0
      </div>
      <div
        className="button-blue minusplus"
        onClick={() => props.keyEntered("-+")}
      >+-</div>
    </>
  );
}

export default Pad;
