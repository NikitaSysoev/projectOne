import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import api from '../../api';
import UserList from '../UserList';
import UserCreateForm from '../UserCreateForm';

import {
  createUser,
  updateUser,
  deleteUser,
  loadUsers,
} from '../../actions/userActions';

class App extends Component {
  componentDidMount() {
    // api.getUsers().then(users => this.setState({ users }));
  }

  render() {
    const { addUser, renameUser, removeUser, users, loadUser } = this.props;
    return (
      <div className="App">
        <div className="container">
          <UserCreateForm addUser={addUser} />
          <UserList
            users={users}
            renameUser={renameUser}
            removeUser={removeUser}
            loadUser={loadUser}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...props,
    users: state.users,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    ...props,
    loadUser: () => dispatch(loadUsers()),
    addUser: () => dispatch(createUser()),
    renameUser: () => dispatch(updateUser()),
    removeUser: () => dispatch(deleteUser()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
