import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class DeleteAccount extends Component{
	deleteAccount = async (target) => {
		if(window.confirm('are you sure??')){
			const result = await api.post('/accounts/delete_account',{
					target: target,
				});
			this.props.onUpdate('read_account', null, null);
			this.props.doReadAgain();
		}else{
			this.props.onUpdate('read_account', null, null);
			this.props.doReadAgain();
		}
	}
	componentDidMount(){
		this.deleteAccount(this.props.target);
	}
	render(){
		return null;
	}
}

export default DeleteAccount;
