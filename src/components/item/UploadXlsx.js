import React, { Component } from 'react';
import axios from 'axios';
import xlsx from 'xlsx';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class UploadXlsx extends Component{
	constructor(props) {
		super(props);
		this.state = {
			target: this.props.target,
			newData: null,
			updateItemInfo: {
				toCreate: null,
				toUpdate: null,
				toDelete: null,
			}

		}
	}

	createItem = async (account_id) => {
		const result = await api.post(`/items/create_item?account_id=${account_id}`, {
			item: this.state.updateItemInfo.toCreate,
		});
	}

	updateItem = async (account_id) => {
		const result = await api.post(`/items/update_item?account_id=${account_id}`, {
			item: this.state.updateItemInfo.toUpdate,
		});
	}
	j
	deleteItem = async (account_id) => {
		const result = await api.post(`/items/delete_item?account_id=${account_id}`, {
			item: this.state.updateItemInfo.toDelete,
		});
		this.props.changeRootMode('just for re-rendering', null, null);
		this.props.changeRootMode('control_item', account_id, null);
	}

	readFile = async (e) => {
		const file = e.target.files[0];
		const data = await file.arrayBuffer();
		const workbook = xlsx.read(data);
		const first_sheet_name = workbook.SheetNames[0];
		const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
		let Obj = [];
		for(var i=0; i<jsonData.length; i++){
			Obj.push({
				code: String(jsonData[i]['상품코드']),
				name: jsonData[i]['상품명'],
				purchase_cost: jsonData[i]['매입원가'],
				registered_date: new Date(),
				size: jsonData[i]['규격']
			});
		}
		this.setState({
			newData: Obj,
		});
	}

	compareCurrentAndNew = () => {
		const currentData = this.props.currentData;
		const newData = this.state.newData;
		let tempCreate = [];
		let tempUpdate = [];
		if(currentData.length > 0){
			for(var i=0; i<newData.length; i++){
				for(var j=0; j<currentData.length; j++){
					if(newData[i].code === currentData[j].code){
						tempUpdate.push(newData[i]);
						break;
					}else if(j === currentData.length-1 && newData[i].code !== currentData[j].code){
						tempCreate.push(newData[i]);
					}
				}
			}
			this.setState({
				updateItemInfo: {
					...this.state.updateItemInfo,
					toCreate: tempCreate,
					toUpdate: tempUpdate,
				}
			})
			return this.state.updateItemInfo;
		}else{
			for(var i=0; i<newData.length; i++){
				tempCreate.push(newData[i]);
			}
			this.setState({
				updateItemInfo: {
					...this.state.updateItemInfo,
					toCreate: tempCreate,
					toUpdate: tempUpdate,
				}
			})
			return this.state.updateItemInfo;
		}
	}

	render(){
		let uploadFunction = 
			<form onSubmit={function(e){
				e.preventDefault();
				this.createItem(this.state.target);
			}.bind(this)}>
				<input type="file" accept=".xlsx" name="uploaded" onChange={async function(e){
				e.preventDefault();
				await this.readFile(e);
				this.props.setUploadedData(await this.compareCurrentAndNew());
				this.props.changeMode('read_uploaded');
				}.bind(this)} />
				<br />
				<input type="submit" value="저장하기" readOnly />
			</form>;

		return (
			<div className="uploadXlsx">
				{uploadFunction}
			</div>
		);
	}
}

export default UploadXlsx;
