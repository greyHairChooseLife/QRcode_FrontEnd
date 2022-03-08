import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://54.180.86.49:5000',
})

class ReadItem extends Component{
	getEveryItems = async () => {
		const result = await api.get('/items/read_all');
		this.props.resetItem(result.data);
	}
	componentDidMount(){
		this.getEveryItems();
	}
	render(){
		let table = null;
		let list = [];
		const data = this.props.data;
		data.sort((a, b) => {			//정렬좀 해 주고
		  if (a.accountName > b.accountName) return 1;			//조건 1 : 거래처
		  else if (a.accountName < b.accountName) return -1;
		  else if (a.itemName > b.itemName) return 1;			//조건 2 : 상품명
		  else if (a.itemName < b.itemName) return -1;
		});
		table = 
			<table className="u-full-width">
				<thead>
					<tr>
						<th>거래처</th>
						<th>상품명</th>
						<th>사이즈</th>
						<th>매입원가</th>
						<th>마진율</th>
						<th>판매가</th>
						<th>등록일</th>
					</tr>
				</thead>
				<tbody>
					{list}
				</tbody>
			</table>
		for(var i=0; i<data.length; i++){
			let ezDate = data[i].registered_date.split('T')[0];

			let priceString = '';			//3자리마다 쉼표 박기 : price
			let temp;
			for(var j=0; j<data.length; j++){				
				data[j].price = data[j].purchase_cost * data[j].margin_ratio + data[j].purchase_cost;

				priceString = data[j].price.toString().split('');		
				let count = 0;
				for(var k=priceString.length -1; k>0; k--){
					if(++count%3 === 0){
						priceString.splice(k, 0, ',');
					}
				}
				temp = '';
				for(var k=0; k<priceString.length; k++){
					temp += priceString[k];
				}
			data[j].price = temp;
			}

			list.push(
				<tr key={data[i].barcode}>
					<th>{data[i].accountName}</th>
					<th>{data[i].itemName}</th>
					<th>{data[i].size}</th>
					<th>{data[i].purchase_cost}</th>
					<th>{data[i].margin_ratio}</th>
					<th>{data[i].price}</th>
					<th>{ezDate}</th>
				</tr>
			)
		}
		return (
			<div className="ReadItem">
				{table}
			</div>
		);
	}
}

export default ReadItem;
