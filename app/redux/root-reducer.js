import { combineReducers } from 'redux';
import user from './user';
import orders from './orders';
import review from './review';
import shoes from './allShoes';
import auth from './auth';
import singleShoe from './singleShoe';

export default combineReducers({
	user,
	orders,
	review,
	shoes,
	auth,
	singleShoe,
});