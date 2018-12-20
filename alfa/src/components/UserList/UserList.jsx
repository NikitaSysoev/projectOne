import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserBox from '../UserBox';
import api from '../../api';

import { loadUsers } from '../../actions/userActions';

import './UserList.css';

class UserList extends Component {
  componentDidMount() {
    const { loadUsers, users } = this.props;
    api.getUsers().then(data => loadUsers(data));
    console.log(users);
  }

  render() {
    return (
      <div className="UserList">
        <UserBox />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.entities,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: users => dispatch(loadUsers(users)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
