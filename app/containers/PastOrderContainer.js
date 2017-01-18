import { connect } from 'react-redux';
import { createReview, deleteReview, updateReview } from '../redux/review'
import { getOrderDetails } from '../redux/orders'
import PastOrder from '../components/PastOrder';

export default connect(
   ({ auth, order }) => ({ auth, order }),
   { createReview, deleteReview, updateReview, getOrderDetails }
)(Profile);

