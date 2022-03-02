import React, { Component } from 'react';

class Header extends Component{
	render(){
//		let subject = null;
//		if(this.props.mode === 'control_item'){
//			subject = '상품 관리';
//		}else{
//			subject = '거래처 관리';
//		}
		let subject = '충북제일종합주방';


		return (
			<header className="">
				<h5 className="tag">{subject}</h5>
			</header>
		);
	}
}

export default Header;
