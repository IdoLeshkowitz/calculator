import { stat, unwatchFile } from "fs";
import { AiOutlinePicture } from "react-icons/ai";
import { Action, ActionType } from "./index";

export type Operation = "+" | "-" | "/" | "*";
export type Digit =
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "0"
	| ".";
export type Font = "Arial" | "Roboto";
export type BgColor = "blue" | "white";
//Calcstate interface definement
export abstract class CalcState {
	currentOperand: string | undefined; //last entered number or 0
	previousOperand: //previous calc opertaions and opernads or undefined
	{
		expression: string | undefined;
		value: Number;
	};
	operation: Operation | undefined;
	lightMode: boolean;
	scientific: boolean;
	overwrite: boolean;
	historyMode: boolean;
	configMode: boolean;
	styles: {
		font: string;
		bgColor: string;
	};
	history: Array<string>;
}
export const evaluate = (
	state: CalcState
): Number=> {
	let output: Number = 0;
	if (state.overwrite) return state.previousOperand.value;
	if (!state.scientific) {
		// if !scietific calc using previous  operand value
		output = eval(
			`${state.previousOperand.value.toString()}${
				state.operation || "+"
			}${state.currentOperand || ""}`
		);
	}
	// if scientific caluculate using previous operand expression
	else {
		output = eval(
			`${
				state.previousOperand.expression === undefined
					? ""
					: state.previousOperand.expression
			}${state.operation || ""}${
				state.currentOperand || ""
			}`
		);
	}
	return Number(output);
};

export const reducer = (
	state: CalcState,
	action: Action
): CalcState => {
	switch (action.type) {
		case ActionType.SET_BGCOLOR:
			return {
				...state,
				styles: {
					...state.styles,
					bgColor: action.payload,
				},
			};
		case ActionType.SET_FONT:
			return {
				...state,
				styles: {
					...state.styles,
					font: action.payload,
				},
			};
		case ActionType.CONFIG_MODE_TOGGLE:
			return {
				...state,
				configMode: !state.configMode,
			};
		case ActionType.HISTORY_MODE_TOGGLE:
			return {
				...state,
				historyMode: !state.historyMode,
			};
		case ActionType.SCIENTIFIC_MODE_TOGGLE:
			return {
				...state,
				scientific: !state.scientific,
			};
		case ActionType.MINUS_PLUS:
			if (state.overwrite) {
				return {
					...state,
					previousOperand: {
						expression: `(${state.previousOperand.expression})*-1`,
						value: eval (`${state.previousOperand.value}*-1`)
					},
				};
			} else {
				return {
					...state,
					currentOperand: eval(
						`${state.currentOperand} * -1`
					),
				};
			}
		case ActionType.CLEAR:
			return {
				...state,
				currentOperand: undefined,
				previousOperand: {
					expression: undefined,
					value: 0,
				},
				operation: undefined,
				overwrite: true,
				history: [""],
			};
		case ActionType.LIGHT_MODE_TOGGLE:
			return {
				...state,
				lightMode: !state.lightMode,
			};
		case ActionType.DELETE_DIGIT:
			if (state.overwrite) return state;
			return {
				...state,
				currentOperand:
					state.currentOperand?.slice(0, -1) || undefined,
			};
		case ActionType.SET_OPERATION:
			//prevent set operation at initial state
			if (!state.currentOperand) return state;
			if (state.overwrite) {
				//if overwrite is true set operation
				return {
					...state,
					operation: action.payload,
				};
			}
			let evaluatedExpression = evaluate(state);
			if (!state.previousOperand.expression) {
				return {
					...state,
					previousOperand: {
						expression: `${
							state.previousOperand?.expression || ""
						}${state.operation || ""}${
							state.currentOperand
						}`,
						value: evaluatedExpression,
					},
					operation: action.payload,
					currentOperand: evaluatedExpression.toString(),
					overwrite: true,
				};
			}
			return {
				...state,
				previousOperand: {
					expression: `${
						state.previousOperand?.expression || ""
					}${state.operation || ""}${state.currentOperand}`,
					value: evaluatedExpression,
				},
				operation: action.payload,
				currentOperand: evaluatedExpression.toString(),
				overwrite: true,
				history: state.history.concat([
					`${state.previousOperand?.expression || ""}${
						state.operation || ""
					}${state.currentOperand}=${evaluatedExpression}`,
				]),
			};
		case ActionType.EVALUATE:
			//if (state.overwrite) return state;
			let evaluated = evaluate(state);
			return {
				...state,
				previousOperand: {
					expression: `${
						state.previousOperand?.expression || ""
					}${state.operation || ""}${state.currentOperand}`,
					value: evaluated,
				},
				overwrite: true,
				history: state.history.concat([
					`${state.previousOperand?.expression || ""}${
						state.operation || ""
					}${state.currentOperand}=${evaluated}`,
				]),
			};
		case ActionType.ADD_DIGIT:
			// double zero preventing
			if (
				state.currentOperand === "0" &&
				action.payload === "0"
			)
				return state;

			//if overwrite is true overwrite curr opernad with the entered value and set overwrite to false
			if (state.overwrite) {
				return {
					...state,
					currentOperand: action.payload,
					overwrite: false,
				};
			}

			//double deimal preventing
			if (action.payload === ".") {
				if (
					state.currentOperand &&
					state.currentOperand.includes(".")
				) {
				}
			}

			return {
				...state,
				currentOperand:
					state.currentOperand + action.payload,
			};
		default:
			return state;
	}
};
