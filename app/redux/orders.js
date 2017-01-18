import axios from 'axios';
import { browserHistory } from 'react-router';

/* --------------    ACTION CONSTANTS    ---------------- */

const GET_USER_ORDERS = 'GET_USER_ORDERS';
const SELECT_ORDER = 'SELECT_ORDER'
const GET_USER_CURRENT_ORDER = 'GET_USER_CURRENT_ORDER';
const REMOVE_SHOE_FROM_ORDER = 'REMOVE_SHOE_FROM_ORDER';
const PLACE_ORDER = 'PLACE_ORDER';

/* --------------    ACTION CREATORS    ----------------- */

const get_user_orders = orders => ({ type: GET_USER_ORDERS, orders });
const select_order = shoes => ({ type: SELECT_ORDER, shoes });
const getPendingOrder = order => ({ type: GET_USER_CURRENT_ORDER, order });
const place_order = order => ({type: PLACE_ORDER, order});
const removeShoeFromOrder = payload => ({ type: REMOVE_SHOE_FROM_ORDER, payload });

/* ------------------    REDUCER    --------------------- */

var defaultState = {
   orders: [],
   pending: {},
   selected: {},
}
export default function (order = defaultState, action){
  console.log("ORDER: ", order)
  console.log("ACTION: ", action)
   const nextStore = obj => Object.assign({}, order, obj)
   switch (action.type){
      case GET_USER_ORDERS: return nextStore({orders: action.orders})
      case SELECT_ORDER: return nextStore({selected: action.shoes})
      case GET_USER_CURRENT_ORDER:
          return Object.assign({}, order, {pending: action.order})
  		case REMOVE_SHOE_FROM_ORDER:
          let editedOrder = action.payload.order;
          let index = editedOrder.shoe_inventories.indexOf(editedOrder.shoe_inventories.find(shoe => action.payload.shoe.id === shoe.id));
          editedOrder.shoe_inventories.splice(index, 1);
          return Object.assign({}, order, {pending: editedOrder})
      case PLACE_ORDER:
          return Object.assign({}, order, {pending: {}})
      default: return order
   }
}

/* --------------    THUNKS/DISPATCHERS    -------------- */

export const getUserOrders = user_id => dispatch => {
   axios.get(`/api/orders/`, {user_id}) 
   .then(res => dispatch(get_user_orders(res.data)))
   .catch(err => console.error(`Problem fetching orders for user: ${id}`, err));
};

export const getOrderDetails = id => dispatch => {
   axios.get(`/api/orders/${id}`) 
   .then(res => dispatch(select_order(res.data)))
   .catch(err => console.error(`Problem fetching order: ${id}`, err));
};

export const fetchPendingOrder = user => dispatch => {
  axios.get(`/api/orders/pending/${user.id}`)
  .then(res => dispatch(getPendingOrder(res.data)))
  .catch(err => console.error('Problem fetching user\'s orders', err));
};
export const removeShoe = (orderId, shoeInventoryId) => dispatch => {
  axios.delete(`/api/orders/pending/${orderId}/${shoeInventoryId}`)
  .then(res => {
    console.log("RESDATA: ", res.data);
    return dispatch(removeShoeFromOrder(res.data))
  })
  .catch(err => console.error('Cannot remove', err));
};

export const placeOrder = order => dispatch => {
   axios.put(`/api/orders/pending/${order.id}`)
   .then(res => dispatch(place_order(res.data)))
   .catch(err => console.error(`Cound not place order ${order.id}`, err));
 };