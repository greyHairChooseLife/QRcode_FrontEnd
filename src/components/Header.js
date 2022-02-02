import React, { Component } from 'react';

class Header extends Component{
	render(){
		let title = null;
		if(this.props.mode === 'control_account'){
			title = '상품관리';
		}else{
			title = 'HOME PAGE';
		}
		return (
			<header className="Header">
				<h1>{title}</h1>
				<button onClick={function(){this.props.changeMode('read_account', null, null)}.bind(this)}>모든 거래처</button>
				<button onClick={function(){this.props.changeMode('read_item', null, null)}.bind(this)}>모든 상품</button>
			</header>
		);
	}
}

export default Header;
