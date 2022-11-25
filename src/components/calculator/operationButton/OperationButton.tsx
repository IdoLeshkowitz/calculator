import  * as React from "react";
import { ActionType } from "../../../state/index";
interface OprationProps{
  dispatch : Function ; 
  operation : string ; 
  gridArea:string ;
  className : string ;
  displayed : JSX.Element| string ;
}
function OperationButton(props:OprationProps) {
  return (
    <div
      className={props.className}
      grid-area={props.gridArea}
      onClick={() =>
        props.dispatch({ type: ActionType.SET_OPERATION, payload: props.operation })
      }
    >
      {props.displayed}
    </div>
  );
}

export default OperationButton;
