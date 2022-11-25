import * as React from "react";
import {
	Action,
	ActionType,
	CalcState,
	reducer,
} from "./../../state/index";
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
	AiOutlineHistory,
} from "react-icons/ai";
import { IconType } from "react-icons/lib";
import { type } from "os";
import ConfigForm from "./configForm";

//initial calc state
const initialState: CalcState = {
	currentOperand: undefined,
	previousOperand: {
		expression: undefined,
		value: 0,
	},
	operation: undefined,
	lightMode: false,
	scientific: false,
	overwrite: true,
	historyMode: true,
	configMode: false,
	styles: {
		font: "Arial",
		bgColor: "white",
	},
	history: [""],
};

const Calculator: React.FC = () => {
	const [
		{
			previousOperand,
			lightMode,
			scientific,
			currentOperand,
			operation,
			overwrite,
			historyMode,
			configMode,
			styles,
			history,
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
				else return styleClasses + " dark";
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
						type: ActionType.SCIENTIFIC_MODE_TOGGLE,
					}),
			},
			{
				key: "lightMode",
				gridArea: "d",
				displayed:
					lightMode === true ? (
						<HiOutlineLightBulb className="icon" />
					) : (
						<TbBulbOff className="icon" />
					),
				className: "button-orange",
				zone: "main",

				func: () =>
					dispatch({
						type: ActionType.LIGHT_MODE_TOGGLE,
					}),
			},
			{
				key: "historyMode",
				gridArea: "g",
				displayed: <AiOutlineHistory className="icon" />,
				className: "button-orange",
				zone: "main",
				func: () =>
					dispatch({
						type: ActionType.HISTORY_MODE_TOGGLE,
					}),
			},
			{
				key: "configMode",
				gridArea: configMode === true ? "c-popup" : "c",
				displayed:
					configMode === true ? (
						<ConfigForm dispatch={dispatch} />
					) : (
						<FcSettings className="icon" />
					),
				className: "button-orange config-form-box",
				zone: "main",
				func: () =>
					dispatch({
						type: ActionType.CONFIG_MODE_TOGGLE,
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
		<div className={`page-box ${styles.bgColor}`}>
			<div className={`calc-box ${styles.font}`}>
				<div className="history-box">
					{history.map((item) => (
						<div>{item}</div>
					))}
				</div>
				<div className="main-box">
					{/* display----> */}
					<div
						className={getButtonsClasses("display")}
						grid-area="e">
						<div className="previous-operand">
							{previousOperand.expression}
							{operation}
							{overwrite ?'' : currentOperand}
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
							dispatch({ type: ActionType.DELETE_DIGIT })
						}>
						<TbArrowBackUp className="icon" />
					</div>

					{/* clear button----> */}
					<div
						className="button-blue"
						grid-area="h"
						onClick={() =>
							dispatch({
								type: ActionType.CLEAR,
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
								type: ActionType.MINUS_PLUS,
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
								type: ActionType.EVALUATE,
							})
						}>
						=
					</div>

					{/* scientific mode button----> */}
					{createFunctions()}
				</div>
			</div>
		</div>
	);
};

export default Calculator;
