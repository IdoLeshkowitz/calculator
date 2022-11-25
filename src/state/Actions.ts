import { Operation, Digit } from "./index";
export enum ActionType {
	ADD_DIGIT = "add-digit",
	SET_OPERATION = "set-operation",
	CLEAR = "clear",
	DELETE_DIGIT = "delete-digit",
	EVALUATE = "evaluate",
	MINUS_PLUS = "minus-plus",
	LIGHT_MODE_TOGGLE = "light-mode-toggle",
	SCIENTIFIC_MODE_TOGGLE = "scietific-mode-toggle",
}

interface AddDigitAction{
    type : ActionType.ADD_DIGIT;
    payload: Digit;
}
interface SetOperationAction {
    type : ActionType.SET_OPERATION;
    payload:Operation;
}
interface ClearAction {
    type : ActionType.CLEAR;
}
interface DeleteDigitOperation{
    type :ActionType.DELETE_DIGIT;
}
interface EvaluateAction {
    type : ActionType.EVALUATE;
}
interface MINUS_PLUS{
    type: ActionType.MINUS_PLUS
}
interface LightModeToggel {
    type : ActionType.LIGHT_MODE_TOGGLE;
}
interface ScientificModeToggle{
    type : ActionType.SCIENTIFIC_MODE_TOGGLE;
}

export type Action = |AddDigitAction|SetOperationAction|ClearAction|DeleteDigitOperation|EvaluateAction|MINUS_PLUS|ScientificModeToggle|LightModeToggel;