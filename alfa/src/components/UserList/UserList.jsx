import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserBox from '../UserBox';
import api from '../../api';

import { loadUsers } from '../../actions/userActions';
import store from '../../store/store';

import './UserList.css';

class UserList extends Component {
  componentDidMount() {
    const { loadUsers } = this.props;
    api.getUsers().then(users => console.log(users));
    api.getUsers().then(users => loadUsers(users));
    // const state = store.getState();
    // console.log(state.users);
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
  return state.users;
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => dispatch(loadUsers()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
