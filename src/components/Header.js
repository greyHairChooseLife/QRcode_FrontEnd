import React, { Component } from 'react';

class Header extends Component{
	render(){
		return (
			<header className="Header">
				<h1>{this.props.title}</h1>
				<button onClick={function(){this.props.changeMode('read_account', null, null)}.bind(this)}>거래처</button>
				<button onClick={function(){this.props.changeMode('read_item', null, null)}.bind(this)}>모든상품</button>
			</header>
		);
	}
}

export default Header;
