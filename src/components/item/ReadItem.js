import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000',
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
		let list = [];
		const data = this.props.data;
		for(var i=0; i<data.length; i++){
			list.push(
				<div key={data[i].id}>
					<span>{data[i].id}</span>
					<span>{data[i].name}</span>
					<span>{data[i].registered_date}</span>
				</div>
			)
		}
		return (
			<div className="ReadItem">
				{list}
			</div>
		);
	}
}

export default ReadItem;
