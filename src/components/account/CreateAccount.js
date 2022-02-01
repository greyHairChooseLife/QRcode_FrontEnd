import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class CreateAccount extends Component{
	createAccount = async (name) => {
		const result = await api.post('/accounts/create_account',{
				name: name,
			});
		this.props.onPost();
	}
	render(){
		return (
			<div>
				<form onSubmit={function(e){
					e.preventDefault();
					this.createAccount(e.target.name.value)
				}.bind(this)}>
					<input type="text" name="name" placeholder="거래처명"></input>
					<input type="submit" value="submit" />
				</form>
			</div>
		);
	}
}

export default CreateAccount;
