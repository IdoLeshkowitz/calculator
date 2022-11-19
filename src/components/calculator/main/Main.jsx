import { useState } from "react";
import LeftPanel from "./left-panel/LeftPanel";
import RightPanel from "./right-panel/RightPanel";
import Pad from "./pad/Pad";
function Main(props) {


  return (
    <div className="main-box">
        
        <RightPanel keyEntered={props.keyEntered}/>
      <Pad  calc={props.calc} result={props.result} keyEntered={props.keyEntered}/>
      <LeftPanel/>
      
    </div>
  );
}

export default Main;
