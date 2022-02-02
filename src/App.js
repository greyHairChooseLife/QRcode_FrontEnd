import React, { Component } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
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
		let header, nav, article = null;
		
		if(this.state.mode === 'read_account'){
			header = <Header mode={this.state.mode} changeMode={this.changeMode} />;
			nav = <Navigation changeMode={this.changeMode} />
			article = <ReadAccount
				resetAccount={this.resetAccount}
				data={this.state.accounts}
				changeMode={this.changeMode} />;
		}
		else if(this.state.mode === 'update_account'){
			header = <Header mode={this.state.mode} changeMode={this.changeMode} />;
			nav = <Navigation changeMode={this.changeMode} />
			article = <UpdateAccount 
				data={this.state.accounts}
				updateTarget={this.state.updateTarget}
				targetOfList={this.state.targetOfList}
				changeMode={this.changeMode} />;
		}
		else if(this.state.mode === 'delete_account'){
			article = <DeleteAccount
				target={this.state.updateTarget}
				changeMode={this.changeMode} />;
		}
		else if(this.state.mode === 'read_item'){
			header = <Header mode={this.state.mode} changeMode={this.changeMode} />;
			nav = <Navigation changeMode={this.changeMode} />
			article = <ReadItem resetItem={this.resetItem} data={this.state.items} />;
		}
		else if(this.state.mode === 'control_account'){
			header = <Header mode={this.state.mode} changeMode={this.changeMode} />;
			nav = <Navigation changeMode={this.changeMode} />
			article = <p>control by account!!</p>;
		}

		return (
		<div className="App">
			{header}
			{nav}
			{article}
		</div>
		);
	}
}

export default App;
