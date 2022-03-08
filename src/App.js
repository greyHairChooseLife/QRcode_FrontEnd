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
//modules
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://54.180.86.49:5000',
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
			targetOfList: null,
			marginRatio: null,
		}
	}
	loadMarginRatio = async (target) => {
		const result = await api.post('/accounts/loadMarginRatio', {
			target: target,
		});
		this.setState({
			marginRatio: result.data[0].margin_ratio,
		})
	}
	saveMarginRatio = async (target, value) => {
		const result = await api.post('/accounts/saveMarginRatio', {
			target: target,
			value: value,
		});
		this.setState({
			marginRatio: value,
		})
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
			article = <ReadItem resetItem={this.resetItem} data={this.state.items} savedMarginRatio={this.state.savedMarginRatio}/>;
		}
		else if(this.state.mode === 'control_item'){
			header = <Header mode={this.state.mode} changeMode={this.changeMode} />;
			nav = <Navigation changeMode={this.changeMode} />
			article = <ControlItem target={this.state.updateTarget} resetItem={this.resetItem} data={this.state.items} changeMode={this.changeMode} savedMarginRatio={this.state.marginRatio} loadMarginRatio={this.loadMarginRatio} saveMarginRatio={this.saveMarginRatio} />
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
