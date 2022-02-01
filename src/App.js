import axios from 'axios';
import React, { Component } from 'react';
import CreateAccount from './components/account/CreateAccount';
import ReadAccount from './components/account/ReadAccount';
import UpdateAccount from './components/account/UpdateAccount';
import ReadEveryItems from './components/item/ReadEveryItems';
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
			accounts: [],
			items: [],
		}
	}

	componentDidMount(){
		this.getEveryAccounts();
	}

	postIt = async () => {
		const P_result = await api.post('/harvest',
			{
				name: 'Point Guard',
			});
	}

	getEveryAccounts = async () => {
		const result = await api.get('/accounts/read_all');
		this.setState({
			accounts: result.data,
		})
	}

	getEveryItems = async () => {
		const result = await api.get('/items/read_all');
		this.setState({
			items: result.data,
		})
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

	render(){
		return (
		<div className="App">
			<div className="sub">
				<h1>HOME PAGE</h1>
				<div>crud of accounts, button for read_all_item</div>
				<br></br><br></br>
				<CreateAccount onPost={this.getEveryAccounts} />
				<br></br><br></br>
				<span>READ: </span>
				<button onClick={this.changeMode}>accounts</button>
				<button onClick={this.changeMode}>items</button>
				<br></br><br></br>
				<button onClick={this.postIt}>POST test</button>
			</div>

			<ReadAccount data={this.state.accounts} />
			<UpdateAccount data_length={this.state.accounts.length} />

		</div>
		);
	}
}

export default App;
