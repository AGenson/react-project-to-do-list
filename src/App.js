import React, { Component } from 'react';
import circle from './circle.png';
import './App.css';

import ToDoForm from "./components/ToDoForm";
import ToDoDisplay from "./components/ToDoDisplay";

import axios from "axios";



class App extends Component {

	state = {
		error: false,
		todos: [],
		text_create: "",
		edit: {
			status_edit: false,
			id_edit: "",
			text: ""
		}
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			return this._fetch_todos_list()
				.then((response) => {
					var filtered = response.message.filter((item) => item.name.length > 0 && item.name.length < 37 );
					this.setState({
						error: response.error,
						todos: filtered
					});
				})
		}, 1500);
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	_fetch_todos_list() {
		return axios
			.get(`http://trainings.nanoapp.io/api/tasks/todos`)
			.then((response) => {
				console.log("_fetch_todos_list : ", response);
				return {
					error: response.status !== 200,
					message: response.data
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	_create_todo() {
		return axios
			.post(`http://trainings.nanoapp.io/api/tasks/todos`,
				{
					name: this.state.text_create
				})
			.then((response) => {
				console.log("_post_todo (create) : ", response);
				return {
					error: response.status !== 200
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	_onChange_text_create(e) {
		if (e.target.value.length < 37){
			this.setState({
				text_create: e.target.value
			});
		}
	}

	_onValid_text_create(){
		this._create_todo()
			.then(() => {
				this.setState({
					text_create: ""
				});
			});
	}

	_onStart_text_edit(e, index) {
		if (this.state.edit.status_edit === false){
			var edit_init = {
				status_edit: true,
				id_edit: this.state.todos[index].id,
				text: this.state.todos[index].name
			};
			this.setState({
				edit: edit_init
			});
			console.log("Start editing :", this.state.edit);
		}
		else{
			console.log("_onStart_text_edit : A ToDo is already in edition");
		}
	}

	_onChange_text_edit(e) {
		var edit = this.state.edit;
		edit.text = e.target.value;
		if (e.target.value.length < 37){
			this.setState({
				edit: edit
			});
		}
	}

	_onValid_text_edit(){
		console.log("End editing. Saving ...");
		this._edit_todo()
			.then(() => {
				var init_edit = {
					status_edit: false,
					id_edit: "",
					text: ""
				}
				this.setState({
					edit: init_edit
				});
			});
	}

	_edit_todo(){
		return axios
			.put(`http://trainings.nanoapp.io/api/tasks/todo/${this.state.edit.id_edit}`,
				{
					name: this.state.edit.text
				})
			.then((response) => {
				console.log("_edit_todo : ", response);
				return {
					error: response.status !== 200
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	_change_state_todo(index) {
		return axios
			.patch(`http://trainings.nanoapp.io/api/tasks/todo/${this.state.todos[index].id}/toggle`)
			.then((response) => {
				console.log("_change_state_todo : ", response);
				return {
					error: response.status !== 200
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	_remove_todo(index) {
		if (this.state.todos[index].completed === false){
			this._change_state_todo(index);
		}
		return axios
			.delete(`http://trainings.nanoapp.io/api/tasks/todo/${this.state.todos[index].id}`) // À revoir !!!!!!
			.then((response) => {
				console.log("_remove_todo : ", response);
				return {
					error: response.status !== 200
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="App">
				<div id="header">
					<span id="intro">
						<h2 id="h2-1">ToDo</h2>
						<img src={circle} className="App-logo" alt="logo" />
						<h2 id="h2-2">List</h2>
					</span>
					<ToDoForm
						text={this.state.text_create}
						onChangeText={this._onChange_text_create.bind(this)}
						onValidText={this._onValid_text_create.bind(this)}
					/>
				</div>
				<div id="body">
					<ul>
						{
							this.state.todos.map((params, i) => {
								return (
									<ToDoDisplay
										{... params}
										{... this.state.edit}
										key={params.id}
										index={i}
										onStartEdit={this._onStart_text_edit.bind(this)}
										onChangeText={this._onChange_text_edit.bind(this)}
										onValidText={this._onValid_text_edit.bind(this)}
										changeStateToDo={this._change_state_todo.bind(this)}
										removeToDo={this._remove_todo.bind(this)}
									/>
								);
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}



export default App;
