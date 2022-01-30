import axios from 'axios';
import React, { Component } from 'react';
import ReadEveryAccounts from './components/ReadEveryAccounts';
import ReadEveryItems from './components/ReadEveryItems';
import './App.css';

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

class App extends Component{
	constructor() {
		super();
		this.state = {
			mode: 'read_accounts',
			logIn: false,
			accounts: null,
			items: null,
		}
	}
	postIt = async () => {
		const P_result = await api.post('/harvest',
			{
				name: 'Point Guard',
			});
		console.log('from post: ', P_result);
	}
	getEveryAccounts = async () => {
		const result = await api.get('/accounts/read_all');
		this.setState({
			accounts: result.data,
		})
		console.log(this.state.accounts);
	}
	getEveryItems = async () => {
		const result = await api.get('/items/read_all');
		this.setState({
			items: result.data,
		})
		console.log(this.state.items);
	}
	changeMode = () => {
		if(this.state.items === null)
			this.getEveryItems();
		let toWhat = null;
		if(this.state.mode === 'read_accounts')
			toWhat = 'read_items'
		else
			toWhat = 'read_accounts'
		this.setState({
			mode: toWhat,
		})
	}
	componentDidMount(){
		this.getEveryAccounts();
	}
	getConetent(){
		if(this.state.mode === 'read_accounts'){
			if(this.state.accounts !== null){
				return <ReadEveryAccounts 
						id={this.state.accounts[0].id} 
						name={this.state.accounts[0].name}
						registered_date={this.state.accounts[0].registered_date}
						></ReadEveryAccounts>
			}else{
				console.log('accounts are null');
				return 
			}
		}else if(this.state.mode === 'read_items'){
			if(this.state.items !== null){
				return <ReadEveryItems 
						id={this.state.items[0].id} 
						name={this.state.items[0].name}
						registered_date={this.state.items[0].registered_date}
						purchase_cost={this.state.items[0].purchase_cost}
						size={this.state.items[0].size}
						></ReadEveryItems>
			}else{
				console.log('items are null');
				return
			}

		}
	}

	render(){

		return (
		<div className="App">
			<h2>CONNNECTION TEST</h2>
			<span>READ: </span>
			<button onClick={this.changeMode}>accounts</button>
			<button onClick={this.changeMode}>items</button>
			<br></br><br></br>
			<button onClick={this.postIt}>POST</button>
			<br></br><br></br>
			{this.getConetent()}
		</div>
		);
	}
}

export default App;
