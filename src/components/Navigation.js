import React, { Component } from 'react';

class Navigation extends Component{
	render(){
		return (
			<nav className="">
				<button className="act_color nav_btn1" onClick={function(){this.props.changeMode('read_account', null, null)}.bind(this)}>모든 거래처</button>
				<button className="act_color nav_btn2" onClick={function(){this.props.changeMode('read_item', null, null)}.bind(this)}>모든 상품</button>
			</nav>
		);
	}
}

export default Navigation;
