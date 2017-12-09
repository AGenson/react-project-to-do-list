import React from 'react';
import '../App.css';

const ToDo = (props) => {
	return !props.status ?
			<div className={"name"+(props.completed ? " through" : "")}>
				{props.name}
			</div>
		:
			<input
				onChange={props.onChangeText}
				onKeyPress={ e => {
					if (e.key === "Enter"){
						props.onValidText();
					}
				}}
				type="text"
				placeholder="Entrez une tâche"
				value={props.text}
				className="name"
				autoFocus
			/>
}

export default ToDo;
