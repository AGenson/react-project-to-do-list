import React from 'react';
import '../App.css';

const ToDoForm = (props) => (
	<div id="text">
		<input
			onChange={props.onChangeText}
			onKeyPress={ e =>{
				if (e.key === "Enter"){
					props.onValidText();
				}
			}}
			type="text"
			placeholder="Entrez une tâche"
			value={props.text}
			id="input_create_todo"
		/>
		<button id="button_text" onClick={props.onValidText}>
			+
		</button>
	</div>
);

export default ToDoForm;
