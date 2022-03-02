import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class CreateAccount extends Component{
	constructor() {
		super();
		this.state = {
			mode: 'off',
		}
	}

	createAccount = async (values) => {
		const data = {
			name: values.name.value,
			contact: values.contact.value,
			address: values.address.value,
			note: values.note.value,
		}
		const result = await api.post('/accounts/create_account',{
				data: data,
			});
		this.props.changeMode('just for re-rendering', null, null);
		this.props.changeMode('read_account', null, null);
	}

	checkVulnerable = (data) => {
		if(data.name.value === '')
			return alert('거래처명을 입력하세요.');
		if(data.contact.value === '')
			return alert('연락처를 입력하세요.');
		const testData = data.contact.value.split('');
		for(var i=0; i<testData.length; i++){
			if(testData[i].charCodeAt(0) < 48 || testData[i].charCodeAt(0) > 57)
				return alert('아니, 숫자만 입력해야죠.');
		}
		if(data.address.value === '')
			return alert('주소를 입력하세요.');
		return 'fine'
	}

	render(){
		let powerBtn, article = null;
		if(this.state.mode === 'on'){
			article = 
				<form className="createAccForm" onSubmit={function(e){
					e.preventDefault();
					if(this.checkVulnerable(e.target) === 'fine')
						this.createAccount(e.target)
				}.bind(this)}>
					<input type="text" name="name" placeholder="거래처명" />
					<input type="text" name="contact" placeholder="연락처" />
					<input type="text" name="address" placeholder="주소" />
					<input type="text" name="note" placeholder="비고" />
					<input type="submit" value="등 록" />
				</form>;
			powerBtn =
				<button className="powerBtn" onClick={function(e){
					this.setState({
						mode: 'off',
					})
				}.bind(this)}>
					<i className="fa fa-window-close-o" aria-hidden="true"></i> 취소
				</button>
		}else if(this.state.mode === 'off'){
			powerBtn =
				<button className="powerBtn" onClick={function(e){
					this.setState({
						mode: 'on',
					})
				}.bind(this)}>
					<i className="fa fa-plus-square-o" aria-hidden="true"></i> 거래처 추가
				</button>
		}

		return (
			<div className="CreateAccount">
				{powerBtn}
				{article}
			</div>
		);
	}
}

export default CreateAccount;
