import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class UpdateAccount extends Component{
	updateAccount = (new_name, target) => {
		const result = api.post('/accounts/update_account',{
			new_name: new_name,
			target: target,
		});
	}
	render(){
		let list = [];
		const data = this.props.data;
		for(var i=0; i<data.length; i++){
			if(i === this.props.target)
				list.push(
					<div key={data[i].id}>
					<form onSubmit={async function(e){
						e.preventDefault();
						await this.updateAccount(e.target.name.value, this.props.target);
						this.props.onPost('read_account');
						this.props.onPost2();
					}.bind(this)}>
						<span>{data[i].id}</span>
						<input type="text" name="name" defaultValue={data[i].name} />
						<span>{data[i].registered_date}</span>
						<input type="submit" value="apply" />
						<button onClick={function(e){
							e.preventDefault();
							this.props.onCancel('read_account', null);
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
					<button>update</button>
				</div>
			)
			}
		}
		return (
			<div className="UpdateAccount">
				{list}
				<p>update procedure</p>
			</div>
		);
	}
}

export default UpdateAccount;
