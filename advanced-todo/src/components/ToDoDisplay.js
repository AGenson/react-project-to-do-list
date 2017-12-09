import React from 'react';
import '../App.css';

import ButtonEditTodo from "./ButtonEditTodo";
import ButtonRemoveTodo from "./ButtonRemoveTodo";
import CheckToDo from "./CheckToDo";
import ToDo from "./ToDo";

const ToDoDisplay = (props) => (
	<li className="resp">
		
		<ButtonEditTodo
			status={props.status_edit === true && props.id === props.id_edit}
			index={props.index}
			onValidText={props.onValidText}
			onStartEdit={props.onStartEdit}
		/>

		<ToDo
			status={props.status_edit === true && props.id === props.id_edit}
			text={props.text}
			name={props.name}
			completed={props.completed}
			onChangeText={props.onChangeText}
			onValidText={props.onValidText}
		/>

		<CheckToDo
			index={props.index}
			id={props.ind}
			completed={props.completed}
			status_edit={props.status_edit}
			changeStateToDo={() => {
				props.changeStateToDo(props.index);
			}}
		/>

		<ButtonRemoveTodo
			status_edit={props.status_edit}
			removeToDo={() => {
				props.removeToDo(props.index);
			}}
		/>

	</li>
);

export default ToDoDisplay;
