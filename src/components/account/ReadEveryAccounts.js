import React, { Component } from 'react';

class ReadEveryAccounts extends Component{
	render(){
		let list = [];
		const data = this.props.data;
		for(var i=0; i<data.length; i++){
			list.push(
				<div key={data[i].id}>
					<span>{data[i].id} </span>
					<span>{data[i].name} </span>
					<span>{data[i].registered_date}</span>
				</div>
			)
		}
		return (
			<div>
				{list}
			</div>
		);
	}
}

export default ReadEveryAccounts;
