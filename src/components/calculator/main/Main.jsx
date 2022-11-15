import { useState } from "react";
import LeftPanel from "./left-panel/LeftPanel";
import RightPanel from "./right-panel/RightPanel";
import Pad from "./pad/Pad";
function Main(props) {


  return (
    <div className="main-box">
        
        <RightPanel updateCalc={props.updateCalc} backSpace={props.backSpace}/>
      <Pad updateCalc={props.updateCalc} calc={props.calc} result={props.result} resetAll={props.resetAll}/>
      <LeftPanel/>
      
    </div>
  );
}

export default Main;
