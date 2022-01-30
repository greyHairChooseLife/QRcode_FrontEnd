import React, { Component } from 'react';

class readEveryAccounts extends Component{
	render(){
		return (
			<div>
				<span>{this.props.id}</span>
				<span>{this.props.name}</span>
				<span>{this.props.registered_date}</span>
			</div>
		);
	}
}

export default readEveryAccounts;
