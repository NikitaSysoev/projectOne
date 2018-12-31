import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserBox from '../UserBox';

import { loadUsers } from '../../actions/userActions';

import './UserList.css';

class UserList extends Component {
  componentDidMount() {
    const { loadUsers } = this.props;
    loadUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div className="UserList">
        {users.length ? (
          users.map(item => (
            <UserBox key={item._id} name={item.name} id={item._id} />
          ))
        ) : (
          <p>No users</p>
        )}
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
    loadUsers: () => dispatch(loadUsers()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
