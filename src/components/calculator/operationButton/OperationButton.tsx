import  * as React from "react";
import { Actions } from "../Calculator";
interface OprationProps{
  dispatch : Function ; 
  operation : string ; 
  gridArea:string ;
  className : string ;
  displayed : JSX.Element| string ;
}
function OperationButton(props:OprationProps): JSX.Element {
  return (
    <div
      className={props.className}
      grid-area={props.gridArea}
      onClick={() =>
        props.dispatch({ type: Actions.CHOOSE_OPERATION, payload: props.operation })
      }
    >
      {props.displayed}
    </div>
  );
}

export default OperationButton;
