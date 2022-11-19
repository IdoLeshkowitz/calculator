import React from "react";
import { ACTIONS } from "../Calculator";
function OperationButton({ dispatch, operation, gridArea, className,displayed }) {
  return (
    <div
      className={className}
      grid-area={gridArea}
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {displayed}
    </div>
  );
}

export default OperationButton;
