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
				toError: null,
				toCreate: null,
				toUpdate: null,
				toCurrent: null,
			}

		}
	}

	createItem = async (account_id) => {
		if(this.state.updateItemInfo.toCreate.length > 0){	//백엔드로 보낼 데이터가 존재 할 때에만
			const result = await api.post(`/items/create_item?account_id=${account_id}`, {
				item: this.state.updateItemInfo.toCreate,
			});
		}
	}

	updateItem = async (account_id) => {
		if(this.state.updateItemInfo.toUpdate.length > 0){	//백엔드로 보낼 데이터가 존재 할 때에만
			console.log('update is processed');
			const result = await api.post(`/items/update_item?account_id=${account_id}`, {
				item: this.state.updateItemInfo.toUpdate,
			});
		}
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
		const date = new Date();
		date.setDate(date.getDate() - 1);
		for(var i=0; i<jsonData.length; i++){
			let size = String(jsonData[i]['규격']);
			if(jsonData[i]['규격'] === undefined)
				size = '';
			Obj.push({
				item_code: String(jsonData[i]['상품코드']),			//String으로 바꿔주는 이유는 db에서 꺼내온 current data와 비교할 때 타입을 맞춰주기 위해서이다.
				name: String(jsonData[i]['상품명']),
				purchase_cost: jsonData[i]['매입원가'],
				registered_date: date.toISOString(),
				size: size,
				barcode: String(jsonData[i]['바코드'])
			});
		}
		this.setState({
			newData: Obj,
		});
	}

	checkValidity = () => {
		let codeError =[];
		let emptyError =[];
		for(var i=0; i<this.state.newData.length; i++){		//코드 중복 오류
			for(var j=i+1; j<this.state.newData.length; j++){
				if(this.state.newData[i].item_code === this.state.newData[j].item_code){
					codeError.push(this.state.newData[i]);
				}
			}
		}
		for(var i=0; i<this.state.newData.length; i++){		//필수 정보 누락 오류
			if(this.state.newData[i].item_code === "undefined" ||
				this.state.newData[i].name === "undefined" ||
				this.state.newData[i].purchase_cost === "undefined" ||
				this.state.newData[i].barcode === "undefined")
				emptyError.push(this.state.newData[i]);
		}
		if(codeError.length > 0 || emptyError.length > 0){
			this.setState({
				updateItemInfo: {
					...this.state.updateItemInfo,
					codeError: codeError,
					emptyError: emptyError,
				}
			})
			return true;
		}
		return false;
	}

	compareCurrentAndNew = () => {
		const currentData = this.props.currentData;
		const newData = this.state.newData;
		let tempCreate = [];
		let tempUpdate = [];
		let tempCurrent = [];
		if(currentData.length > 0){
			for(var i=0; i<newData.length; i++){
				for(var j=0; j<currentData.length; j++){
					if(newData[i].item_code === currentData[j].item_code){
						if(newData[i].name !== currentData[j].name || newData[i].purchase_cost !== currentData[j].purchase_cost || newData[i].size !== currentData[j].size || newData[i].barcode !== currentData[j].barcode){
							tempUpdate.push(newData[i]);
							tempCurrent.push(currentData[j]);
						}
						break;
					}else if(j === currentData.length-1 && newData[i].item_code !== currentData[j].item_code){
						tempCreate.push(newData[i]);
					}
				}
			}
			this.setState({
				updateItemInfo: {
					...this.state.updateItemInfo,
					toCreate: tempCreate,
					toUpdate: tempUpdate,
					toCurrent: tempCurrent,
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
					toCurrent: tempCurrent,
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
				this.updateItem(this.state.target);
				alert('새로고침하세요.');
			}.bind(this)}>
				<label for="fileBox">파일 선택</label>
				<div>선택 된 파일 : <span></span></div>
				<input type="file" id="fileBox" accept=".xlsx" name="uploaded" onChange={async function(e){
				e.preventDefault();
				const fileName = e.target.value.split("\\");
				e.currentTarget.parentElement.querySelector('span').innerText = fileName.pop();
				await this.readFile(e);
				if(this.checkValidity()){
					this.props.setUploadedData(await this.compareCurrentAndNew());
					this.props.changeMode('read_file_error');
				}else{
					this.props.setUploadedData(await this.compareCurrentAndNew());
					this.props.changeMode('read_uploaded');
				}
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
