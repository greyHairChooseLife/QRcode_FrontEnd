import React, { Component } from 'react';

class readEveryItems extends Component{
	render(){
		return (
			<div>
				<span>{this.props.id}</span>
				<span>{this.props.name}</span>
				<span>{this.props.registered_date}</span>
				<span>{this.props.purchase_cost}</span>
				<span>{this.props.size}</span>
			</div>
		);
	}
}

export default readEveryItems;
