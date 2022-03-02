import React, { Component } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ReadAccount from './components/account/ReadAccount';
import UpdateAccount from './components/account/UpdateAccount';
import DeleteAccount from './components/account/DeleteAccount';
import ReadItem from './components/item/ReadItem';
import ControlItem from './components/item/ControlItem';
import CreateAccount from './components/account/CreateAccount';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
//import './App.css';
import './css/normalize.css';
import './css/skeleton.css';
import './css/my.css';

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
		let header, nav, create_acc, article = null;
		
		if(this.state.mode === 'read_account'){
			header = <Header mode={this.state.mode} changeMode={this.changeMode} />;
			nav = <Navigation changeMode={this.changeMode} />
			article = <ReadAccount
				resetAccount={this.resetAccount}
				data={this.state.accounts}
				changeMode={this.changeMode} />;
			create_acc = <CreateAccount changeMode={this.changeMode}/>
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
		else if(this.state.mode === 'control_item'){
			header = <Header mode={this.state.mode} changeMode={this.changeMode} />;
			nav = <Navigation changeMode={this.changeMode} />
			article = <ControlItem target={this.state.updateTarget} resetItem={this.resetItem} data={this.state.items} changeMode={this.changeMode} />
		}

		return (
		<div className="App">
			{header}
			{nav}
			{create_acc}
			{article}
		</div>
		);
	}
}

export default App;
