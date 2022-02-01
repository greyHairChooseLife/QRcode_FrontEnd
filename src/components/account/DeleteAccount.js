import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class DeleteAccount extends Component{
	componentDidMount(){
		this.deleteAccount(this.props.target);
	}
	deleteAccount = (target) => {
		const result = api.post('/accounts/delete_account',{
				target: target,
			});
	}
	render(){
		return (
			<div>
			<p>deleted!!</p>
			</div>
		);
	}
}

export default DeleteAccount;
