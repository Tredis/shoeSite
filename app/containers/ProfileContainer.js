import { connect } from 'react-redux';
import { updateName, updateAddress } from '../redux/auth'
import Profile from '../components/Profile';

export default connect(
   ({ auth, order }) => ({ auth, order }),
   { updateName, updateAddress }
)(Profile);

