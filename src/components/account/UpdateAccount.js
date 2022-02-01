import React, { Component } from 'react';

class UpdateAccount extends Component{
	render(){
		let list = [];
		const data = this.props.data;
		for(var i=0; i<data.length; i++){
			if(i === this.props.target)
				list.push(
					<div key={data[i].id}>
					<form onSubmit={function(e){
						e.preventDefault();

					}.bind(this)}>
						<span>{data[i].id}</span>
						<input type="text" name="name" defaultValue={data[i].name} />
						<span>{data[i].registered_date}</span>
						<button>apply</button>
						<button>cancel</button>
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
				<p>update procedure</p>
				{list}
			</div>
		);
	}
}

export default UpdateAccount;
