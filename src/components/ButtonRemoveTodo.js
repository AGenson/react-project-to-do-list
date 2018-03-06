import React from 'react';
import '../App.css';



const ButtonRemoveTodo = (props) => (
	<button
		className={"button_right"}
		onClick={() => {
			if (props.status_edit === false){
				props.removeToDo();
			}
		}}
	>
		REMOVE
	</button>
);



export default ButtonRemoveTodo;
