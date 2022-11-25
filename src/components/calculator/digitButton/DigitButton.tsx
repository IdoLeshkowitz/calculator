import * as React from "react";
import { FC } from "react";
import {ActionType} from './../../../state/index';
interface Props {
	dispatch: Function;
	digit: string | ".";
	gridArea: string;
	className: string;
}

function DigitButton(props: Props): JSX.Element {
	return (
		<div
			className={props.className}
			grid-area={props.gridArea}
			onClick={() =>
				props.dispatch({
					type:ActionType.ADD_DIGIT,
					payload: props.digit,
				})
			}>
			{props.digit}
		</div>
	);
}

export default DigitButton;
