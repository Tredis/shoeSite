import axios from 'axios';

const SINGLE_SHOE = 'SINGLE_SHOE';

export const receiveShoe = (shoe) => {
  return {
    type: SINGLE_SHOE,
    shoe,
  }
}

export const getShoeModel = (modelId) => {
  return dispatch => {
    axios.get(`/api/shoes/${modelId}`)
    .then(res => {
      console.log('HERE"S RES.DATA', res.data);
      dispatch(receiveShoe(res.data))
    })
  }
}

const initialShoeState = {
  shoe: {},
}

const singleShoeReducer = (state=initialShoeState, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case SINGLE_SHOE:
      nextState.shoe = action.shoe;
      return nextState;
      break;

    default:
    return state;

  }
  return nextState;
}

export default singleShoeReducer;
