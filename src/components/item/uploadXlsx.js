import React, { Component } from 'react';
import axios from 'axios';
import xlsx from 'xlsx';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class ControlItem extends Component{
	getItemToControl = async (account_id) => {
		const result = await api.get(`/items/control_item?account_id=${account_id}`);
		this.props.resetItem(result.data);
	}

	render(){
		let list = [];

		return (
			<div className="uploadXlsx">
				<form onSubmit={async function(e){
					e.preventDefault();
					const file = e.target.uploaded.files[0];
					const data = await file.arrayBuffer();
					const workbook = xlsx.read(data);

					let first_sheet_name = workbook.SheetNames[0];
					let sheet = workbook.Sheets[first_sheet_name];
					console.log(sheet);
				}.bind(this)}>
					<input type="file" accept=".xlsx" name="uploaded" />
					<br />
					<input type="submit" value="확인" readOnly />
				</form>
			</div>
		);
	}
}

export default ControlItem;
