import React from 'react';
import '../App.css';



const CheckToDo = (props) => {
	var input = document.getElementById("check-"+props.index);

	if (input !== null){
		document.getElementById("check-"+props.index).checked = props.completed;
	}

	return (
		<div className="div_check">
			<input
				type="checkbox"
				id={"check-"+props.index}
				name={"check-"+props.index}
				disabled
			/>
			<label
				className="check"
				onClick={() => {
					if (props.status_edit === false){
						props.changeStateToDo();
					}
				}}
			>
				<span>
				</span>
			</label>
		</div>
	);
}



export default CheckToDo;
