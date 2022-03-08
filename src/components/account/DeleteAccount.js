import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://54.180.86.49:5000',
})

class DeleteAccount extends Component{
	deleteAccount = async (target) => {
		if(window.confirm('are you sure??')){
			const result = await api.post('/accounts/delete_account',{
					target: target,
				});
			this.props.changeMode('read_account', null, null);
		}else{
			this.props.changeMode('read_account', null, null);
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
