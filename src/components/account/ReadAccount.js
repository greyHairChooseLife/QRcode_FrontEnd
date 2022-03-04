import React, { Component } from 'react';
import axios from 'axios';
import CreateAccount from './CreateAccount';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class ReadAccount extends Component{
	getEveryAccounts = async () => {
		const result = await api.get('/accounts/read_all');
		this.props.resetAccount(result.data);
	}
	componentDidMount(){
		this.getEveryAccounts();
	}

	render(){
		let list = [];
		let table = null;
		const data = this.props.data;
		table = 
			<table className="u-full-width">
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th>거래처명</th>
						<th>연락처</th>
						<th>주소</th>
						<th>비고</th>
						<th>등록일</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{list}
				</tbody>
			</table>
		for(var i=0; i<data.length; i++){
			(function(m){
				let ezContact = String(data[m].contact).split('');
				if(ezContact.length === 10){
					ezContact.splice(3, 0, '-');
					ezContact.splice(7, 0, '-');
				}else if(ezContact.length === 11){
					ezContact.splice(3, 0, '-');
					ezContact.splice(8, 0, '-');
				}
				let ezDate = String(data[m].registered_date).split('T');

				list.push(
						<tr key={data[m].id}>
							<button className="ctrItmBtn" onClick={function(){
								this.props.changeMode('control_item', data[m].id, null);
							}.bind(this)}
								>상품 관리</button>
							<th></th>
							<th>{data[m].name}</th>
							<th>{ezContact}</th>
							<th>{data[m].address}</th>
							<th>{data[m].note}</th>
							<th>{ezDate[0]}</th>
							<th></th>
							<button className="updateBtn" onClick={function(){
								this.props.changeMode('update_account', data[m].id, m);
							}.bind(this)}>수정</button>
							<th></th>
							<button className="deleteBtn" onClick={function(){
								console.log('btn: ', data[m].id, m);
								this.props.changeMode('delete_account', data[m].id, m);
							}.bind(this)}>삭제</button>
						</tr>
				)
			}.bind(this))(i)
		}

		return (
			<div className="ReadAccount">
				{table}
			</div>
		);
	}
}

export default ReadAccount;
