import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cart from '../components/Cart';
import ConfirmOrder from '../components/ConfirmOrder';
import { placeOrder } from '../redux/orders';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user,
  	pendingOrder: state.orders.pending
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return { 
  	placeOrder: bindActionCreators(placeOrder, dispatch)
  };
}

const ConfirmOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmOrder);

export default ConfirmOrderContainer;