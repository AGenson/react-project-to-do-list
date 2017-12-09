import React from 'react';
import '../App.css';

const ButtonEditTodo = (props) => (
	<button
		onClick={(e) => {
			props.status ?
					props.onValidText()
				:
					props.onStartEdit(e, props.index);
			}}
		className={"button_left"}
	>
		{//BUTTON TEXT
			props.status ? 
				"VALIDATE"
			:
				"EDIT"
		}
	</button>
);

export default ButtonEditTodo;
