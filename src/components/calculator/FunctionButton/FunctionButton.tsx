import * as React from "react";
import { IconType } from "react-icons/lib";
interface Props{
	func :Function ;
	gridArea:string;
	className : string ;
	displayed : JSX.Element ;
}
const FunctionButton = (props:Props): JSX.Element => {
	return (
		<div
			grid-area={props.gridArea}
			className={props.className}
			onClick={()=>props.func()}>
			{props.displayed}
		</div>
	);
};

export default FunctionButton;
