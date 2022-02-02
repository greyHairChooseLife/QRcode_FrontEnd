import React, { Component } from 'react';
import axios from 'axios';
import CreateAccount from './CreateAccount';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class ReadAccount extends Component{
	getEveryAccounts = async () => {
		const result = await api.get('/accounts/read_all');
		this.props.resetAccount(result.data);
	}
	componentDidMount(){
		this.getEveryAccounts();
	}

	render(){
		let list = [];
		const data = this.props.data;
		for(var i=0; i<data.length; i++){
			(function(m){
			list.push(
				<div key={data[m].id}>
					<button onClick={function(){
						this.props.changeMode('control_account', null, null);
					}.bind(this)}
						>Control</button>
					<span>{data[m].id}</span>
					<span>{data[m].name}</span>
					<span>{data[m].registered_date}</span>
					<button onClick={function(){
						this.props.changeMode('update_account', data[m].id, m);
					}.bind(this)}>update</button>
					<button onClick={function(){
						this.props.changeMode('delete_account', data[m].id, m);
					}.bind(this)}>delete</button>
				</div>
			)
			}.bind(this))(i)
		}
		return (
			<div className="ReadAccount">
				<CreateAccount changeMode={this.props.changeMode}/>
				{list}
			</div>
		);
	}
}

export default ReadAccount;
