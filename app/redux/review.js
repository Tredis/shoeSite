import axios from 'axios';
import { browserHistory } from 'react-router';

/* --------------    ACTION CONSTANTS    ---------------- */

const GET_USER_REVIEWS= 'GET_USER_REVIEWS'
const SELECT_REVIEW   = 'SELECT_REVIEW'
const CREATE_REVIEW   = 'CREATE_REVIEW'
const DELETE_REVIEW   = 'DELETE_REVIEW'
const UPDATE_REVIEW   = 'UPDATE_REVIEW'
//const UPDATE_RATING   = 'UPDATE_RATING'
//const UPDATE_COMMENT  = 'UPDATE_COMMENT'
//const UPVOTE_COMMENT  = 'UPVOTE_COMMENT'
//const DOWNVOTE_COMMENT= 'DOWNVOTE_COMMENT'

/* --------------    ACTION CREATORS    ----------------- */

const get_user_reviews= list  => ({type: GET_USER_REVIEWS, list   });
const select_review   = id    => ({type:   SELECT_REVIEW,  id     });
const create_review   = review=> ({type:   CREATE_REVIEW,  review });
const delete_review   = id    => ({type:   DELETE_REVIEW,  id     });
const update_review   = review=> ({type:   UPDATE_REVIEW,  review });

/* ------------------    REDUCER    --------------------- */

export default function (review = { list:[], selected:{} }, action){
   const nextStore = obj => Object.assign({}, review, obj)
   switch (action.type){
      case GET_USER_REVIEWS: return nextStore({list: action.list})
      case SELECT_REVIEW:
         return nextStore({
            selected: review.list.find(review => review.id == action.id)
         })
      case CREATE_REVIEW: return ({
            list: [...review.list, action.review],
            selected: action.review,
         })
      case DELETE_REVIEW: return ({
            list: review.list.filter(review => review.id !== action.id),
            selected:{},
         })
      case UPDATE_REVIEW: return ({
            list: review.list.map(review => 
               review.id === action.review.id ? action.review : review)
           ,selected: action.review
         })
      default: return review
   }
}

/* --------------    THUNKS/DISPATCHERS    -------------- */

export const createReview = review => dispatch => 
   axios.post(`/api/comments`, review)
   .then(res => dispatch(createReview(res.data)))
   .catch(err => console.error('Problem adding new review', err));

export const getOrderReviews = id => dispatch => 
   axios.get(`/api/comments/`, {id})
   .then(res => dispatch(get_user_reviews(res.data)))
   .catch(err => console.error('Problem retrieving user\'s reviews', err));

export const deleteReview = id => dispatch => 
   axios.delete(`/api/comments/${id}`)
   .then(dispatch(remove_review(id)))
   .catch(err => console.error(`Removing review: ${id} unsuccesful`, err));

export const updateReview = review => dispatch => 
   axios.put(`/api/comments/${id}`, review)
   .then(res => dispatch(update_review(res.data)))
   .catch(err => console.error(`Updating review: ${id} unsuccesful`, err));

export const updateRating = (id, rating) => dispatch => //just use updateReview
   axios.put(`/api/comments/${id}`, rating)
   .then(res => dispatch(update_review(res.data)))
   .catch(err => console.error(`Updating review: ${id} unsuccesful`, err));

export const updateComment = (id, comment) => dispatch => //just use updateReview
   axios.put(`/api/comments/${id}`, comment)
   .then(res => dispatch(update_review(res.data)))
   .catch(err => console.error(`Updating review: ${id} unsuccesful`, err));

export const voteComment = (id, dir) => dispatch => //just use updateReview
   axios.put(`/api/comments/vote/${id}`, dir)
   .then(res => dispatch(update_review(res.data)))
   .catch(err => console.error(`Updating review: ${id} unsuccesful`, err));


