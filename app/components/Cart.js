import React, { Component } from 'react';
import axios from 'axios';
import ShoeOrderCard from './ShoeOrderCard';

export default (props) => {
	const arrToMap = props.pendingOrder.shoe_inventories;
	const order = props.pendingOrder;
	const removeShoe = props.removeShoe;

	return (
		<div>
			{ arrToMap ? (
				arrToMap.map( shoe => {
					return (<div>
						<ShoeOrderCard key={shoe.id} shoe={shoe} order={order} removeShoe={ removeShoe } />
						<button className="btn btn-xs btn-danger" onClick={() => removeShoe(order.id, shoe.id)}> x </button>
					</div>)
					})
				) : null
			}
			<a href="/confirm" className="btn btn-lg btn-success"> PLACE ORDER </a>
		</div>
		)

}
