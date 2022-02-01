import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class CreateAccount extends Component{
	createAccount = (name) => {
		const result = api.post('/accounts/create_account',{
				name: name,
			});
	}
	render(){
		return (
			<div>
				<form onSubmit={async function(e){
					e.preventDefault();
					await this.createAccount(e.target.name.value);
					this.props.onPost();
				}.bind(this)}>
					<input type="text" name="name" placeholder="거래처명"></input>
					<input type="submit" value="submit" />
				</form>
			</div>
		);
	}
}

export default CreateAccount;
