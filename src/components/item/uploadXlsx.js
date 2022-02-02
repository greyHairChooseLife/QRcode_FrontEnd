import React, { Component } from 'react';
import axios from 'axios';
import xlsx from 'xlsx';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class ControlItem extends Component{
	constructor() {
		super();
		this.state = {
			list: null,
		}
	}
	getItemToControl = async (account_id) => {
		const result = await api.get(`/items/control_item?account_id=${account_id}`);
		this.props.resetItem(result.data);
	}
	readFile = async (e) => {
		const file = e.target.uploaded.files[0];
		const data = await file.arrayBuffer();
		const workbook = xlsx.read(data);
		const first_sheet_name = workbook.SheetNames[0];
		const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
		this.setState({
			list: jsonData,
		});
	}

	render(){
		let uploadFunction = 
			<form onSubmit={function(e){
				e.preventDefault();
				this.readFile(e);
			}.bind(this)}>
				<input type="file" accept=".xlsx" name="uploaded" />
				<br />
				<input type="submit" value="확인" readOnly />
			</form>;
		let items = [];
		if(this.state.list !== null){
			for(var i=0; i<this.state.list.length; i++){
				items.push(
					<div key={i}>
						<span>{this.state.list[i]['상품코드']}</span>
						<span>{this.state.list[i]['상품명']}</span>
						<span>{this.state.list[i]['매입원가']}</span>
						<span>{this.state.list[i]['규격']}</span>
					</div>
				);
			}
		}

		return (
			<div className="uploadXlsx">
				{uploadFunction}
				{items}
			</div>
		);
	}
}

export default ControlItem;
