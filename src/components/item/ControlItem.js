import React, { Component } from 'react';
import axios from 'axios';
import UploadXlsx from './UploadXlsx';
//import './ControlItem_plus';
import QRCode from 'qrcode.react';

const api = axios.create({
	baseURL: 'http://54.180.86.49:5000',
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
		this.props.loadMarginRatio(this.state.target);		//기존 마진률을 가져온다.
	}
	getItemToControl = async (account_id) => {
		const result = await api.get(`/items/control_item?account_id=${account_id}`);
		result.data.sort((a, b) => {
		if (a.name > b.name) return 1;
		else if (a.name < b.name) return -1;
		});
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
								<th>고객화면 보기</th>
								<th><button id="selectAll" onClick={function(e){
									qrcodeSrc.splice(0, qrcodeSrc.length);				//전체 체크 기능 쓰려면 일단 배열 비우고 시작
									const group = e.target.parentElement.parentElement.parentElement.parentElement.querySelectorAll('input[name="chBox"]');
									for(var i=0; i<group.length; i++){
										if(group[i].checked !== true){					//체크 안된거 한번이라도 적발되면 싸그리 체크 해버리고 qrcodeSrc에 정보 싹다 잡아넣어
											for(var j=0; j<group.length; j++){
												group[j].checked = true;
												qrcodeSrc.push({
													target: this.state.target,
													item_code: currentData[j].item_code,
													barcode: currentData[j].barcode,
												})
											}
											break;										//목적 달성했으면 즉시 나가야지
										}
										if(i === group.length - 1){						//전부다 체크 돼 있으면 전부 체크 풀어버려
											for(var k=0; k<group.length; k++){
												group[k].checked = false;
											}

										}
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
				const registered_date = currentData[i].registered_date.split('T')[0];
				if(currentData[i].size === 'undefined') 
					currentData[i].size = '';
				const margin_ratio = '';

//				let priceString = '';			//3자리마다 쉼표 박기 : price, purchase_cost
//				let purchaseCostString = '';
//				let temp;
//				let temp2;
//				for(var j=0; j<currentData.length; j++){				
//					currentData[j].price = currentData[j].purchase_cost * currentData[j].margin_ratio + currentData[j].purchase_cost;
//
//					priceString = currentData[j].price.toString().split('');		
//					purchaseCostString = currentData[j].purchase_cost.toString().split('');		
//					let count = 0;
//					let count2 = 0;
//					for(var k=priceString.length -1; k>0; k--){
//						if(++count%3 === 0){
//							priceString.splice(k, 0, ',');
//						}
//					}
//					for(var k=purchaseCostString.length -1; k>0; k--){
//						if(++count%3 === 0){
//							purchaseCostString.splice(k, 0, ',');
//						}
//					}
//					temp = '';
//					temp2 = '';
//					for(var k=0; k<priceString.length; k++){
//						temp += priceString[k];
//					}
//					for(var k=0; k<purchaseCostString.length; k++){
//						temp2 += purchaseCostString[k];
//					}
//				currentData[j].price = temp;
//				currentData[j].purchase_cost = temp;
//				}


				let priceString = '';			//3자리마다 쉼표 박기 : price
				let temp;
				for(var j=0; j<currentData.length; j++){				
					currentData[j].price = currentData[j].purchase_cost * this.props.savedMarginRatio + currentData[j].purchase_cost;

					priceString = currentData[j].price.toString().split('');		
					let count = 0;
					for(var k=priceString.length -1; k>0; k--){
						if(++count%3 === 0){
							priceString.splice(k, 0, ',');
						}
					}
					temp = '';
					for(var k=0; k<priceString.length; k++){
						temp += priceString[k];
					}
				currentData[j].price = temp;
				}

				current_list.push(
					<tr key={'current' + currentData[i].item_code}>
						<td>{i+1}</td>
						<td>{registered_date}</td>
						<td>{currentData[i].name}</td>
						<td>{currentData[i].size}</td>
						<td>{currentData[i].purchase_cost}</td>
						<td>{currentData[i].price}</td>
						<td>{currentData[i].item_code}</td>
						<td>{currentData[i].barcode}</td>
						<td><a href={`http://54.180.86.49:5000/customer/readItem/${this.state.target}/${currentData[i].item_code}`} target="_blank">보기</a></td>
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
						}.bind(this)}/></td>
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
		const printQRcodeBtn =
			<div>
				<form id="printQRcodeForm" target="_blank" action="http://54.180.86.49:5000/accounts/printQRcode" method="post">
					<input id="src" type="hidden" name="src" value="" />
				</form>
				<button id="printQRcodeBtn" onClick={function(){
					document.getElementById('src').value = JSON.stringify(qrcodeSrc);
					document.getElementById('printQRcodeForm').submit();
				}.bind(this)}>QR코드 인쇄
				</button>
			</div>;

		const saveMarginRatio = 
			<div id="loadAndSaveMarginRatio">
				<div id="savedMarginRatio">현재 마진률 : {this.props.savedMarginRatio}</div>
				<br />
				<input id="marginRatioInput" type="text" name="marginRatio" />
				<button id="marginRatioSaveBtn" onClick={function(){
					this.props.saveMarginRatio(this.state.target, document.getElementById('marginRatioInput').value);
				}.bind(this)}>마진률 수정
				</button>
			</div>

		return (
			<div className="ControlItem">
				<UploadXlsx target={this.state.target} currentData={this.state.currentData} changeRootMode={this.props.changeMode} changeMode={this.changeMode} setUploadedData={this.setUploadedData} resetItem={this.props.resetItem} />
				{printQRcodeBtn}
				{saveMarginRatio}
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
