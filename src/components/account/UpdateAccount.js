import React, { Component } from 'react';

class UpdateAccount extends Component{
	render(){
		let list = [];
		const data = this.props.data_length;
		for(var i=0; i<data; i++){
			list.push(
				<div key={i}>
					<button>update</button>
				</div>
			)
		}
		return (
			<div className="UpdateAccount">
				{list}
			</div>
		);
	}
}

export default UpdateAccount;
