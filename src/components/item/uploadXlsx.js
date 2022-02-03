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
			list: null,
		}
	}
	createItem = async (account_id) => {
		const result = await api.post(`/items/create_item?account_id=${account_id}`, {
			item: this.state.list,
		});
		this.props.changeMode('just for re-rendering', null, null);
		this.props.changeMode('control_item', account_id, null);
	}
	updateItem = async (account_id) => {
		const result = await api.post(`/items/create_item?account_id=${account_id}`, {





		});
		this.props.changeMode('just for re-rendering', null, null);
		this.props.changeMode('control_item', account_id, null);
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
			list: Obj,
		});
		this.props.getUploadedData(Obj);
	}

	render(){
		let uploadFunction = 
			<form onSubmit={function(e){
				e.preventDefault();
				this.createItem(this.state.target);
			}.bind(this)}>
				<input type="file" accept=".xlsx" name="uploaded" onChange={function(e){
				e.preventDefault();
				this.readFile(e);
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
