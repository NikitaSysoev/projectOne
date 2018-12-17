import React, { Component } from 'react';

import UserBox from '../UserBox';
import api from '../../api';
import store from '../../store/store';

import './UserList.css';

class UserList extends Component {
  componentDidMount() {
    const { loadUser } = this.props;
    api.getUsers().then(users => loadUser(users));
    const state = store.getState();
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

export default UserList;
