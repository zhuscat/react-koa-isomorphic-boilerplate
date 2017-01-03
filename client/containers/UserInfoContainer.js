import React from 'react';
import UserInfo from '../components/UserInfo';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const { userInfo } = state;
  const { name, website } = userInfo.userInfo;
  return {
    name,
    website,
  };
}

export default connect(mapStateToProps)(UserInfo);