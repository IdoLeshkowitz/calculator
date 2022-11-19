import React from "react";
import { ACTIONS } from "../Calculator";
function OperationButton({ dispatch, operation, gridArea, className }) {
  return (
    <div
      className={className}
      grid-area={gridArea}
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </div>
  );
}

export default OperationButton;
