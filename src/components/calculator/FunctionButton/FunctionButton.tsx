import * as React from "react";
import { ACTIONS } from "../Calculator";
const FunctionButton = ({
	dispatch,
	func,
	gridArea,
	className,
	displayed,
}): JSX.Element => {
	return (
		<div
			grid-area={gridArea}
			className={className}
			onClick={func}>
			{displayed}
		</div>
	);
};

export default FunctionButton;
