import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class UpdateAccount extends Component{
	updateAccount = async (new_name, target) => {
		const result = await api.post('/accounts/update_account',{
			new_name: new_name,
			target: target,
		});
		this.props.changeMode('read_account');
	}

	render(){
		let list = [];
		const data = this.props.data;
		for(var i=0; i<data.length; i++){
			if(i === this.props.targetOfList)
				list.push(
					<div key={data[i].id}>
					<form onSubmit={function(e){
						e.preventDefault();
						this.updateAccount(e.target.name.value, this.props.updateTarget);
					}.bind(this)}>
						<span>{data[i].id}</span>
						<input type="text" name="name" defaultValue={data[i].name} />
						<span>{data[i].registered_date}</span>
						<input type="submit" value="apply" />
						<button onClick={function(e){
							e.preventDefault();
							this.props.changeMode('read_account', null);
						}.bind(this)}>cancel</button>
					</form>
					</div>

				)
			else{
			list.push(
				<div key={data[i].id}>
					<span>{data[i].id}</span>
					<span>{data[i].name}</span>
					<span>{data[i].registered_date}</span>
				</div>
			)
			}
		}
		return (
			<div className="UpdateAccount">
				{list}
			</div>
		);
	}
}

export default UpdateAccount;
