import React, { Component } from 'react';
import axios from 'axios';
import UploadXlsx from './uploadXlsx';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class ControlItem extends Component{
	constructor(props) {
		super(props);
		this.state = {
			target: this.props.target,
		}
	}
	componentDidMount(){
		this.getItemToControl(this.state.target);
	}
	getItemToControl = async (account_id) => {
		const result = await api.get(`/items/control_item?account_id=${account_id}`);
		this.props.resetItem(result.data);
	}

	render(){
		let list = [];
		const data = this.props.data;
		for(var i=0; i<data.length; i++){
			list.push(
				<div key={i}>
					<span>{data[i].code}</span>
					<span>{data[i].name}</span>
					<span>{data[i].purchase_cost}</span>
					<span>{data[i].registered_date}</span>
					<span>{data[i].size}</span>
				</div>
			)
		}

		return (
			<div className="ReadItem">
				<UploadXlsx target={this.state.target} changeMode={this.props.changeMode} resetItem={this.props.resetItem} />
				{list}
			</div>
		);
	}
}

export default ControlItem;
