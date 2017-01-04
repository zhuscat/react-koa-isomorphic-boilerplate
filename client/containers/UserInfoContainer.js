import { connect } from 'react-redux';
import UserInfo from '../components/UserInfo';

function mapStateToProps(state) {
  const { userInfo } = state;
  const { name, website } = userInfo.userInfo;
  return {
    name,
    website,
  };
}

export default connect(mapStateToProps)(UserInfo);
