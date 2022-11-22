import * as React from "react";
import { useState, useReducer } from "react";
import OperationButton from "./operationButton/OperationButton";
import DigitButton from "./digitButton/DigitButton";
import FunctionButton from "./FunctionButton/FunctionButton";
import {
	TbArrowBackUp,
	TbColumnInsertLeft,
	TbMathFunction,
	TbMathFunctionOff,
	TbBulbOff,
} from "react-icons/tb";
import { FcSettings } from "react-icons/fc";
import { FiDivide } from "react-icons/fi";
import { CgAsterisk, CgLogIn } from "react-icons/cg";
import { HiOutlineLightBulb } from "react-icons/hi";
import {
	AiOutlinePlus,
	AiOutlineVerticalAlignBottom,
} from "react-icons/ai";
import { IconType } from "react-icons/lib";
// state reducer actions interface
export enum Actions {
	ADD_DIGIT = "add-digit",
	CHOOSE_OPERATION = "choose-operation",
	CLEAR = "clear",
	DELETE_DIGIT = "delete-digit",
	EVALUATE = "evaluate",
	MINUS_PLUS = "minus-plus",
	LIGHT_MODE_TOGGLE = "light-mode-toggle",
	SCIENTIFIC_MODE_TOGGLE = "scietific-mode-toggle",
}

//Calcstate interface definement
abstract class CalcState {
	currentOperand: string;
	previousOperand: string;
	operation: string;
	lightMode: "dark" | "light";
	scientific: boolean;
	overwrite: boolean;
}

//initial calc state
const initialState: CalcState = {
	currentOperand: "",
	previousOperand: "",
	operation: "",
	lightMode: "light",
	scientific: false,
	overwrite: false,
};
type payload =
	| CalcState["operation"]
	| CalcState["currentOperand"]
	| "";
// reducer action type definement
interface CalcAction {
	payload: payload;
	type:
		| Actions.CLEAR
		| Actions.DELETE_DIGIT
		| Actions.EVALUATE
		| Actions.LIGHT_MODE_TOGGLE
		| Actions.MINUS_PLUS
		| Actions.SCIENTIFIC_MODE_TOGGLE
		| Actions.ADD_DIGIT
		| Actions.CHOOSE_OPERATION;
}

//reducer function ----->
function reducer(
	state: CalcState,
	action: CalcAction
): CalcState {
	switch (action.type) {
		case Actions.SCIENTIFIC_MODE_TOGGLE:
			if (!state.scientific) {
				return {
					...state,
					lightMode: state.lightMode,
					scientific: true,
				};
			}
			return {
				...state,
				lightMode: state.lightMode,
				scientific: false,
			};

		case Actions.LIGHT_MODE_TOGGLE:
			let modes: CalcState["lightMode"][] = [
				"dark",
				"light",
			];
			// if current light mode state is empty set it to dark
			if (!state.lightMode) {
				return {
					...state,
					lightMode: "dark",
				};
			}
			return {
				...state,
				lightMode:
					modes[1 - modes.indexOf(state.lightMode)],
			};

		case Actions.MINUS_PLUS:
			//if current operand is null continue else update it
			if (state.currentOperand) {
				return {
					...state,
					currentOperand: (
						parseFloat(state.currentOperand) * -1
					).toString(),
				};
			}
			// if previous operand is null  update it
			if (state.previousOperand) {
				return {
					...state,
					previousOperand: (
						parseFloat(state.previousOperand) * -1
					).toString(),
				};
			}
			//else do nothing
			return state;
		case Actions.ADD_DIGIT:
			//if current operand is 0 override it
			if (state.currentOperand === "0") {
				return {
					...state,
					currentOperand: action.payload,
				};
			}

			// if digit is decimal point
			if (
				action.payload === "." &&
				state.currentOperand &&
				state.currentOperand.includes(".")
			) {
				//if current operand conatins decimal or its none do nothing
				return state;
			}
			console.log('ddd');
			return {
				...state,
				currentOperand: `${state.currentOperand || ""}${
					action.payload
				}`,
			};

		case Actions.CHOOSE_OPERATION:
			//if both operands are empty do nothing
			if (
				state.currentOperand == "" &&
				state.previousOperand == ""
			) {
				return state;
			}

			//if only current operand is empty update operation to new value
			if (state.currentOperand == "") {
				return {
					...state,
					operation: action.payload,
				};
			}

			// if (state.previousOperand == '') {
			// 	return {
			// 		...state,
			// 		operation: action.payload,
			// 		previousOperand: state.currentOperand,
			// 		currentOperand: "",
			// 	};
			// }

			if (!state.scientific) {
				//if scietific mode is off override the previous operand
				return {
					...state,
					previousOperand: eval(
						state.previousOperand +
							state.operation +
							state.currentOperand
					),
					operation: action.payload,
					currentOperand: "",
				};
			} else {
				//if scientific mode is on append operation to previous operand
				return {
					...state,
					previousOperand:
						state.previousOperand +
						state.operation +
						state.currentOperand,
					currentOperand: "",
					operation: action.payload,
				};
			}

		case Actions.CLEAR:
			return {
				...initialState,
				scientific: state.scientific,
				lightMode: state.lightMode,
			};
		case Actions.DELETE_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentOperand: "",
				};
			}
			if (state.currentOperand == "") return state;
			if (state.currentOperand.length === 1) {
				return { ...state, currentOperand: "" };
			}

			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1),
			};
		case Actions.EVALUATE:
			if (
				state.operation == "" ||
				state.currentOperand == "" ||
				state.previousOperand == ""
			) {
				return state;
			}

			return {
				...state,
				overwrite: true,
				previousOperand: "",
				operation: "",
				currentOperand: eval(
					state.previousOperand +
						state.operation +
						state.currentOperand
				),
			};
	}
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
	maximumFractionDigits: 2,
});

function formatCurrOperand(operand: string) {
	// if (operand == null) return;
	// const [integer, decimal] = operand.toString().split(".");
	// if (decimal == null) return INTEGER_FORMATTER.format(integer);
	// return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function formatOperand(
	operand: string,
	isScientific: boolean
) {
	let output='';
	if (!isScientific) {
		output= operand;
	} else {
		output= eval(operand) || "";
	}
	output=output.toString();
	return output.startsWith('Infinity') ? 'zero division':output;
	//return output === 'infinity' ?  'cannot devide by zero' : output;
	//return eval(operand);
	// if (operand == null) return;
	// const [integer, decimal] = operand.toString().split(".");
	// if (decimal == null) return INTEGER_FORMATTER.format(integer);
	// return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
function Calculator(): JSX.Element {
	const [
		{
			currentOperand,
			previousOperand,
			operation,
			lightMode,
			scientific,
		},
		dispatch,
	] = useReducer(reducer, initialState);
	const createDigits = () => {
		//returns array of digitbutton components
		interface DigitButton {
			digit: string;
			gridArea: string;
			className: string;
		}
		let nums: DigitButton[] = [
			{
				digit: "0",
				gridArea: "aa",
				className: "button-white",
			},
			{
				digit: "1",
				gridArea: "u",
				className: "button-white",
			},
			{
				digit: "2",
				gridArea: "v",
				className: "button-white",
			},
			{
				digit: "3",
				gridArea: "w",
				className: "button-white",
			},
			{
				digit: "4",
				gridArea: "p",
				className: "button-white",
			},
			{
				digit: "5",
				gridArea: "q",
				className: "button-white",
			},
			{
				digit: "6",
				gridArea: "r",
				className: "button-white",
			},
			{
				digit: "7",
				gridArea: "k",
				className: "button-white",
			},
			{
				digit: "8",
				gridArea: "l",
				className: "button-white",
			},
			{
				digit: "9",
				gridArea: "m",
				className: "button-white",
			},
			{
				digit: ".",
				gridArea: "ab",
				className: "button-blue",
			},
		];
		return nums.map((num) => (
			<DigitButton
				digit={num.digit}
				className={num.className}
				gridArea={num.gridArea}
				dispatch={dispatch}
				key={num.digit}
			/>
		));
	};
	const createOperators = () => {
		//returns array of operator button components
		interface OperatorButton {
			operation: "+" | "-" | "*" | "/";
			className: string;
			gridArea: string;
			displayed: JSX.Element | string;
			zone: string;
		}
		const operators: OperatorButton[] = [
			{
				operation: "/",
				className: "button-orange",
				gridArea: "i",
				displayed: <FiDivide className="icon" />,
				zone: "main",
			},
			{
				operation: "-",
				className: "button-orange",
				gridArea: "s",
				displayed: "-",
				zone: "main",
			},
			{
				operation: "*",
				className: "button-orange",
				gridArea: "n",
				displayed: <CgAsterisk className="icon" />,
				zone: "main",
			},
			{
				operation: "+",
				className: "button-orange",
				gridArea: "x",
				displayed: <AiOutlinePlus className="icon" />,
				zone: "main",
			},
		];
		return operators.map((operator) => (
			<OperationButton
				operation={operator.operation}
				dispatch={dispatch}
				className={operator.className}
				gridArea={operator.gridArea}
				displayed={operator.displayed}
				key={operator.operation}
			/>
		));
	};
	type buttons = "display";
	const getButtonsClasses = (button: buttons) => {
		interface StyleClasses {
			display: Function;
		}
		let styleClasses: StyleClasses = {
			display: (): string => {
				let styleClasses = "button display-box";
				// if mode is not defined set as light mode
				if (!lightMode) return styleClasses + " light";
				if (lightMode === "dark")
					return styleClasses + " dark";
				return styleClasses + " light";
			},
		};
		return styleClasses[button]();
	};

	// returns array of function button components
	const createFunctions = () => {
		interface FunctionButton {
			key: string;
			zone: string;
			func: Function;
			gridArea: string;
			className: string;
			displayed: JSX.Element;
		}
		let functions: FunctionButton[] = [
			{
				key: "scientific",
				gridArea: "j",
				className: "button-orange",
				displayed: scientific ? (
					<TbMathFunction className="icon" />
				) : (
					<TbMathFunctionOff className="icon" />
				),
				zone: "main",
				func: () =>
					dispatch({
						type: Actions.SCIENTIFIC_MODE_TOGGLE,
						payload: "",
					}),
			},
			{
				key: "lightMode",
				gridArea: "d",
				displayed:
					lightMode === "dark" ? (
						<HiOutlineLightBulb className="icon" />
					) : (
						<TbBulbOff className="icon" />
					),
				className: "button-orange",
				zone: "main",
				func: () =>
					dispatch({
						type: Actions.LIGHT_MODE_TOGGLE,
						payload: "",
					}),
			},
		];
		return functions.map((func) => {
			return (
				<FunctionButton
					key={func.key}
					className={func.className}
					func={func.func}
					gridArea={func.gridArea}
					displayed={func.displayed}
				/>
			);
		});
	};
	////////////////////////render ----->
	return (
		<div className="calc-box">
			<div className="main-box">
				{/* display----> */}
				<div
					className={getButtonsClasses("display")}
					grid-area="e">
					<div className="previous-operand">
						{formatOperand(
							previousOperand,
							scientific
						) + operation}
					</div>
					<div className="current-operand">
						{formatOperand( currentOperand, scientific)}
					</div>
				</div>

				{/* digits-----> */}
				{createDigits()}

				{/* operatores-----> */}
				{createOperators()}

				{/* backspace ---->*/}
				<div
					className="button-blue"
					grid-area="f"
					onClick={() =>
						dispatch({
							type: Actions.DELETE_DIGIT,
							payload: "",
						})
					}>
					<TbArrowBackUp className="icon" />
				</div>

				{/* clear button----> */}
				<div
					className="button-blue"
					grid-area="h"
					onClick={() =>
						dispatch({
							type: Actions.CLEAR,
							payload: "",
						})
					}>
					C
				</div>

				{/* ± button----> */}
				<div
					className="button-white"
					grid-area="z"
					onClick={() =>
						dispatch({
							type: Actions.MINUS_PLUS,
							payload: "",
						})
					}>
					±
				</div>

				{/* = button -----> */}
				<div
					className="button-blue"
					grid-area="ac"
					onClick={() =>
						dispatch({
							type: Actions.EVALUATE,
							payload: "",
						})
					}>
					=
				</div>

				{/* scientific mode button----> */}
				{createFunctions()}
			</div>
		</div>
	);
}

export default Calculator;
