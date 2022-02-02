import React, { Component } from 'react';
import CreateAccount from './components/account/CreateAccount';
import ReadAccount from './components/account/ReadAccount';
import UpdateAccount from './components/account/UpdateAccount';
import DeleteAccount from './components/account/DeleteAccount';
import ReadItem from './components/item/ReadItem';
import './App.css';

class App extends Component{
	constructor() {
		super();
		this.state = {
			mode: 'read_account',
			logIn: false,
			accounts: [],
			items: [],
			updateTarget: null,
			targetOfList: null,
		}
	}

	changeMode = (mode, target, i) => {
		this.setState({
			mode: mode,
			updateTarget: target,
			targetOfList: i, 
		})
	}

	resetAccount = (accounts) => {
		this.setState({
			accounts: accounts,
		})
	}

	resetItem = (items) => {
		this.setState({
			items: items,
		})
	}

	render(){
		let content = null;
		if(this.state.mode === 'read_account')
			content = <ReadAccount resetAccount={this.resetAccount} data={this.state.accounts} changeMode={this.changeMode} />;
		else if(this.state.mode === 'update_account'){
			content = <UpdateAccount 
			data={this.state.accounts}
			updateTarget={this.state.updateTarget}
			targetOfList={this.state.targetOfList}
			changeMode={this.changeMode}
				/>;
		}
		else if(this.state.mode === 'delete_account'){
			content = <DeleteAccount
			target={this.state.updateTarget}
			changeMode={this.changeMode}
				/>;
		}
		else if(this.state.mode === 'read_item')
			content = <ReadItem resetItem={this.resetItem} data={this.state.items} />

		return (
		<div className="App">
			<div className="sub">
				<h1>HOME PAGE</h1>
				<div>crud of accounts, button for read_all_item</div>
				<br></br><br></br>
				<CreateAccount changeMode={this.changeMode} />
				<br></br><br></br>
				<span>READ: </span>
				<button onClick={function(){this.changeMode('read_account', null, null)}.bind(this)}>거래처</button>
				<button onClick={function(){this.changeMode('read_item', null, null)}.bind(this)}>모든상품</button>
				<br></br><br></br>
				<button onClick={this.postIt}>POST test</button>
			</div>

			{content}

		</div>
		);
	}
}

export default App;
