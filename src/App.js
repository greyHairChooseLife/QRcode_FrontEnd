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
			mode: 'read_account',
			logIn: false,
			accounts: [],
			items: [],
			updateTarget: null,
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

	changeMode = (mode, i) => {
		this.setState({
			mode: mode,
			updateTarget: i,
		})
	}

	render(){
		let content = null;
		if(this.state.mode === 'read_account')
			content = <ReadAccount data={this.state.accounts} onUpdate={this.changeMode} />;
		else if(this.state.mode === 'update_account'){
			content = <UpdateAccount 
			data={this.state.accounts}
			target={this.state.updateTarget}
				/>;
		}
		else if(this.state.mode === 'read_item')
			content = 'read items Component';
		return (
		<div className="App">
			<div className="sub">
				<h1>HOME PAGE</h1>
				<div>crud of accounts, button for read_all_item</div>
				<br></br><br></br>
				<CreateAccount onPost={this.getEveryAccounts} />
				<br></br><br></br>
				<span>READ: </span>
				<button>accounts</button>
				<button>items</button>
				<br></br><br></br>
				<button onClick={this.postIt}>POST test</button>
			</div>

			{content}

		</div>
		);
	}
}

export default App;
