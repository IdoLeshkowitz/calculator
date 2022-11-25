import * as React from "react";
import { Action, ActionType } from "./../../state/index";
import {useState} from 'react';

interface Props {
	dispatch: Function;
}

function ConfigForm(props:Props): JSX.Element {
    const onSubmit =(event :any )=>{
        props.dispatch({type : ActionType.SET_FONT, payload:font})
        props.dispatch({type:ActionType.SET_BGCOLOR, payload:bgColor})
        event.preventDefault();
    }
    const onClick =(e:any)=>{
        e.stopPropagation();
    }

    const [font , setFont] = useState('Arial');
    const [bgColor, setBgColor]= useState('blue');
	return (
		<div>
			<form onSubmit={(e)=>onSubmit(e)} onClick={(e)=>onClick(e)}>
				<select onChange={(e)=>setFont(e.target.value)}>
                    <option value='Arial'>Arial</option>
                    <option value ="Roboto">Roboto</option>
                </select>
                <select onChange={(e)=>setBgColor(e.target.value)}>
                    <option value="blue">blue</option>
                    <option value="orange">orange</option>
                </select>
                <button className="form-button"></button>
			</form>
		</div>
	);
}
export default ConfigForm;
