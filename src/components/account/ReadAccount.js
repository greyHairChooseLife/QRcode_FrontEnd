import React, { Component } from 'react';

class ReadAccount extends Component{
	render(){
		let list = [];
		const data = this.props.data;
		for(var i=0; i<data.length; i++){
			(function(m){
			list.push(
				<div key={data[m].id}>
					<span>{data[m].id}</span>
					<span>{data[m].name}</span>
					<span>{data[m].registered_date}</span>
					<button onClick={function(){
						this.props.onUpdate('update_account', data[m].id, m);
					}.bind(this)}>update</button>
					<button onClick={function(){
						this.props.onUpdate('delete_account', data[m].id, m);
					}.bind(this)}>delete</button>
				</div>
			)
			}.bind(this))(i)
		}
		return (
			<div className="ReadAccount">
				{list}
			</div>
		);
	}
}

export default ReadAccount;
