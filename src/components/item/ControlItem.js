import React, { Component } from 'react';
import axios from 'axios';
import UploadXlsx from './UploadXlsx';
//import './ControlItem_plus';
import QRCode from 'qrcode.react';

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
		let codeError, emptyError = null;
		let codeErrList = [];
		let emptyErrList = [];
		let current, update, create = null;
		let create_list = [];
		let update_list = [];
		let current_list = [];
		const qrcodeSrc = [];
		if(this.state.mode === 'read_current'){
			const { currentData } = this.state;
			current = 
				<div key={'current_line'}>
					<span>현재 상품</span>
					<table className="u-full-width">
						<thead>
							<tr>
								<th>번호</th>
								<th>등록</th>
								<th>상품명</th>
								<th>사이즈</th>
								<th>매입원가</th>
								<th>판매가</th>
								<th>상품코드</th>
								<th>바코드</th>
								<th><button onClick={function(e){
									const group = e.target.parentElement.parentElement.parentElement.parentElement.querySelectorAll('input[name="chBox"]');
									for(var i=0; i<group.length; i++){
										group[i].checked = true;
										qrcodeSrc.push({
											target: this.state.target,
											item_code: currentData[i].item_code,
											barcode: currentData[i].barcode,
										})
									}
								}.bind(this)}>모두 선택</button></th>
							</tr>
						</thead>
						<tbody>
							{current_list}
						</tbody>
					</table>
				</div>
			for(var i=0; i<currentData.length; i++){
				const QRsize = [300, 300];
				const root_url = `https://chart.googleapis.com/chart?cht=qr&chs=${QRsize[0]}x${QRsize[1]}&chl=http://localhost:5000/customer/readItem/${this.state.target}/${currentData[i].item_code}`;
				const registered_date = currentData[i].registered_date.split('T')[0];
				if(currentData[i].size === 'undefined') 
					currentData[i].size = '';
				const margin_ratio = '';
				current_list.push(
					<tr key={'current' + currentData[i].item_code}>
						<td>{i+1}</td>
						<td>{registered_date}</td>
						<td>{currentData[i].name}</td>
						<td>{currentData[i].size}</td>
						<td>{currentData[i].purchase_cost}</td>
						<td>{margin_ratio}</td>
						<td>{currentData[i].item_code}</td>
						<td>{currentData[i].barcode}</td>
						<td><a href={`http://localhost:5000/customer/readItem/${this.state.target}/${currentData[i].item_code}`} target="_blank">customerPage</a></td>
						<td><input name='chBox' type="checkbox" onChange={function(e){
							const idx = e.target.parentElement.parentElement.querySelector('td').innerText - 1;
							if(e.target.checked === true){
								qrcodeSrc.push({
									target: this.state.target,
									item_code: currentData[idx].item_code,
									barcode: currentData[idx].barcode,
								})
							}else{
								qrcodeSrc.splice(idx, 1);
							}
							console.log(qrcodeSrc);
						}.bind(this)}/></td>
						<td><QRCode value="https://google.com" /></td>
						<td><a href={root_url} target="_blank">QRcode</a></td>
						<td><canvas id="qrcode"></canvas></td>
					</tr>
				);
			}
		}else if(this.state.mode === 'read_uploaded'){
			create = 
				<div key={'create_line'}>
					<span>추가되는 상품</span>
						<table className="u-full-width">
							<thead>
								<tr>
									<th>번호</th>
									<th>등록</th>
									<th>상품명</th>
									<th>사이즈</th>
									<th>매입원가</th>
									<th>판매가</th>
									<th>상품코드</th>
									<th>바코드</th>
								</tr>
							</thead>
							<tbody>
								{create_list}
							</tbody>
						</table>
				</div>
			update = 
				<div key={'update_line'}>
					<span>바뀌는 상품</span>
						<table className="u-full-width">
							<thead>
								<tr>
									<th>번호</th>
									<th>등록</th>
									<th>상품명</th>
									<th>사이즈</th>
									<th>매입원가</th>
									<th>판매가</th>
									<th>상품코드</th>
									<th>바코드</th>
								</tr>
							</thead>
							<tbody>
								{update_list}
							</tbody>
						</table>
				</div>
			for(var i=0; i<this.state.uploadedData.toCreate.length; i++){
				const item = this.state.uploadedData.toCreate[i];
				const registered_date = item.registered_date.split('T')[0];
				if(item.size === 'undefined') 
					item.size = '';
				const margin_ratio = '';
				create_list.push(
					<tr key={'create' + this.state.uploadedData.toCreate[i].item_code}>
						<td>{i+1}</td>
						<td>{registered_date}</td>
						<td>{item.name}</td>
						<td>{item.size}</td>
						<td>{item.purchase_cost}</td>
						<td>{margin_ratio}</td>
						<td>{item.item_code}</td>
						<td>{item.barcode}</td>
					</tr>
				);
			}
			for(var i=0; i<this.state.uploadedData.toUpdate.length; i++){
				for(var j=0; j<this.state.currentData.length; j++){
					const curItem = this.state.uploadedData.toCurrent[i];
					const updItem = this.state.uploadedData.toUpdate[i];
					const cur_registered_date = curItem.registered_date.split('T')[0];
					if(curItem.size === 'undefined') 
						curItem.size = '';
					const cur_margin_ratio = '';
					const upd_registered_date = updItem.registered_date.split('T')[0];
					if(updItem.size === 'undefined') 
						updItem.size = '';
					const upd_margin_ratio = '';

					if(this.state.uploadedData.toUpdate[i].item_code === this.state.currentData[j].item_code){
						update_list.push(
								<tr key={'update' + updItem.item_code}>
									<td>{j+1}</td>
									<td>{cur_registered_date}</td>
									<td>{curItem.name}</td>
									<td>{curItem.size}</td>
									<td>{curItem.purchase_cost}</td>
									<td>{cur_margin_ratio}</td>
									<td>{curItem.item_code}</td>
									<td>{curItem.barcode}</td>
								</tr>
						);
						update_list.push(
								<tr key={'update_upd' + updItem.item_code}>
									<td>{j+1}</td>
									<td>{upd_registered_date}</td>
									<td>{updItem.name}</td>
									<td>{updItem.size}</td>
									<td>{updItem.purchase_cost}</td>
									<td>{upd_margin_ratio}</td>
									<td>{updItem.item_code}</td>
									<td>{updItem.barcode}</td>
								</tr>
						);
					}
				}
			}
		}else if(this.state.mode === 'read_file_error'){
			codeError = 
				<div key={'code_error_line'}>
					<span>중복된 코드가 있습니다.</span>
					{codeErrList}
			<br />
			<br />
			<br />
				</div>
			for(var i=0; i<this.state.uploadedData.codeError.length; i++){
				codeErrList.push(
					<div key={'codeError' + this.state.uploadedData.codeError[i].item_code}>
						<span>{this.state.uploadedData.codeError[i].barcode}</span>
					</div>
				);
			}
			emptyError = 
				<div key={'empty_error_line'}>
					<span>필수 정보가 빠졌습니다.</span>
					{emptyErrList}
				</div>
			for(var i=0; i<this.state.uploadedData.emptyError.length; i++){
				emptyErrList.push(
					<div key={'emptyError' + this.state.uploadedData.emptyError[i].item_code}>
						<span>{this.state.uploadedData.emptyError[i].barcode}</span>
					</div>
				);
			}
		}

		return (
			<div className="ControlItem">
				<UploadXlsx target={this.state.target} currentData={this.state.currentData} changeRootMode={this.props.changeMode} changeMode={this.changeMode} setUploadedData={this.setUploadedData} resetItem={this.props.resetItem} />
				{codeError}
				{emptyError}
				{update}
				{create}
				{current}
			</div>

		);
	}
}

export default ControlItem;
