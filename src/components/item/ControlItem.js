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
			old_data: [],
			new_data: [],
		}
	}
	componentDidMount(){
		this.getItemToControl(this.state.target);
	}
	getItemToControl = async (account_id) => {
		const result = await api.get(`/items/control_item?account_id=${account_id}`);
		this.setState({
			old_data: result.data,
		})
		this.props.resetItem(result.data);
	}
	getUploadedData = (uploaded_data) => {
		this.setState({
			new_data: uploaded_data,
		})
	}

	render(){
		let create_list = [];
		let update_list = [];
		const { old_data, new_data } = this.state;
		for(var i=0; i<new_data.length; i++){
			for(var j=0; j<old_data.length; j++){
				if(new_data[i].code === old_data[j].code){
					update_list.push(
						<div key={'key' + old_data[j].code + i + j}>
							<div>
								<span>{new_data[i].code}</span>
								<span>{new_data[i].name}</span>
								<span>{new_data[i].purchase_cost}</span>
								<span>{new_data[i].size}</span>
							</div>
							<div>
								<span>{old_data[j].code}</span>
								<span>{old_data[j].name}</span>
								<span>{old_data[j].purchase_cost}</span>
								<span>{old_data[j].size}</span>
							</div>
						</div>
					)
					break;
				}else if(j === old_data.length-1 && new_data[i].code !== old_data[j].code){
					create_list.push(
						<div key={'key' + new_data[i].code + i + j}>
							<span>{new_data[i].code}</span>
							<span>{new_data[i].name}</span>
							<span>{new_data[i].purchase_cost}</span>
							<span>{new_data[i].size}</span>
						</div>
					)
				}
			}
		}

		return (
			<div className="ReadItem">
				<UploadXlsx target={this.state.target} changeMode={this.props.changeMode} getUploadedData={this.getUploadedData} resetItem={this.props.resetItem} />
				{create_list}
				<p>________ UPPER : NEW ____ UNDDER : COMPARE ________</p>
				{update_list}
			</div>
		);
	}
}

export default ControlItem;
