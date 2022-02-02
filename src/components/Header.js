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
			</header>
		);
	}
}

export default Header;
