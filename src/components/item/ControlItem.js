import React, { Component } from 'react';
import axios from 'axios';
import UploadXlsx from './UploadXlsx';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class ControlItem extends Component{
	constructor(props) {
		super(props);
		this.state = {
			mode: 'read_current',
			target: this.props.target,
			currentData: [],
			uploadedData: [],
		}
	}
	componentDidMount(){
		this.getItemToControl(this.state.target);
	}
	getItemToControl = async (account_id) => {
		const result = await api.get(`/items/control_item?account_id=${account_id}`);
		this.setState({
			currentData: result.data,
		})
		this.props.resetItem(result.data);
	}
	setUploadedData = (uploaded_data) => {
		this.setState({
			uploadedData: uploaded_data,
		})
	}
	changeMode = (mode) => {
		this.setState({
			mode: mode,
		})
	}

	render(){
		let file_error_list = [];
		let create_list = [];
		let update_list = [];
		let current_list = [];
		if(this.state.mode === 'read_current'){
			const { currentData } = this.state;
			current_list.push(
				<p key={'current_line'}>________ LEGACY ________</p>
			)
			for(var i=0; i<currentData.length; i++){
				current_list.push(
					<div key={'current' + currentData[i].code}>
						<span>{currentData[i].code}</span>
						<span>{currentData[i].name}</span>
						<span>{currentData[i].purchase_cost}</span>
						<span>{currentData[i].size}</span>
					</div>
				);
			}
		}else if(this.state.mode === 'read_uploaded'){
			file_error_list.push(<p key={'error_line'}>________ ERROR ________</p>);
			create_list.push(<p key={'create_line'}>________ NEW ________</p>);
			update_list.push(<p key={'update_line'}>________ UPDATE ________</p>);
			for(var i=0; i<this.state.uploadedData.toCreate.length; i++){
				create_list.push(
					<div key={'create' + this.state.uploadedData.toCreate[i].code}>
						<span>{this.state.uploadedData.toCreate[i].code}</span>
						<span>{this.state.uploadedData.toCreate[i].name}</span>
						<span>{this.state.uploadedData.toCreate[i].purchase_cost}</span>
						<span>{this.state.uploadedData.toCreate[i].size}</span>
					</div>
				);
			}
			for(var i=0; i<this.state.uploadedData.toUpdate.length; i++){
				for(var j=0; j<this.state.currentData.length; j++){
					if(this.state.uploadedData.toUpdate[i].code === this.state.currentData[j].code){
						update_list.push(
							<div key={'update' + this.state.uploadedData.toUpdate[i].code}>
								<div className="currentDataComparing">
									<span>{this.state.uploadedData.toCurrent[i].code}</span>
									<span>{this.state.uploadedData.toCurrent[i].name}</span>
									<span>{this.state.uploadedData.toCurrent[i].purchase_cost}</span>
									<span>{this.state.uploadedData.toCurrent[i].size}</span>
								</div>
								<div>
									<span>{this.state.uploadedData.toUpdate[i].code}</span>
									<span>{this.state.uploadedData.toUpdate[i].name}</span>
									<span>{this.state.uploadedData.toUpdate[i].purchase_cost}</span>
									<span>{this.state.uploadedData.toUpdate[i].size}</span>
								</div>
							</div>
						);
					}
				}
			}
		}else if(this.state.mode === 'read_file_error'){
			for(var i=0; i<this.state.uploadedData.toError.length; i++){
				file_error_list.push(
					<div key={'create' + this.state.uploadedData.toError[i].code}>
						<span>{this.state.uploadedData.toError[i].code}</span>
						<span>{this.state.uploadedData.toError[i].name}</span>
						<span>{this.state.uploadedData.toError[i].purchase_cost}</span>
						<span>{this.state.uploadedData.toError[i].size}</span>
					</div>
				);
			}
		}

		return (
			<div className="ControlItem">
				<UploadXlsx target={this.state.target} currentData={this.state.currentData} changeRootMode={this.props.changeMode} changeMode={this.changeMode} setUploadedData={this.setUploadedData} resetItem={this.props.resetItem} />
				{file_error_list}
				{create_list}
				{update_list}
				{current_list}
			</div>
		);
	}
}

export default ControlItem;
