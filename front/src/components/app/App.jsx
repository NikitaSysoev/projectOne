import React, { Component } from 'react';

import './App.css';
import UserList from '../UserList';
import UserCreateForm from '../UserCreateForm';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <UserCreateForm />
        <UserList />
      </div>
    );
  }
}
