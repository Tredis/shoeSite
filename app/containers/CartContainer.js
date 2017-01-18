import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { removeShoe } from '../redux/orders';

const mapStateToProps = (state, ownProps) => {
  return {
  	pendingOrder: state.orders.pending
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
  	removeShoe: function(orderId, shoeId) {
  		dispatch(removeShoe(orderId, shoeId));
  	}
  };
}

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

export default CartContainer;