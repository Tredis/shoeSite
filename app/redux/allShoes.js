import axios from 'axios';

const RECEIVE_SHOES = 'RECEIVE_SHOES';

export const receiveShoes = (setShoes) => {
  return {
    type: RECEIVE_SHOES,
    setShoes,
  }
}

export const filterAllShoes = (criteria) => {
  return dispatch => {
    axios({
      method: 'get',
      url: 'api/shoes',
      params: {criteria}
    })
    .then(res => {
      dispatch(receiveShoes(res.data))
    })
  }
}

const shoeReducer = (state=[], action) => {

  switch (action.type) {
    case RECEIVE_SHOES:
      state = action.setShoes;
      return state;
    default:
      return state;

  }
  return state;
}

export default shoeReducer;
