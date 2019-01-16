import React from 'react';

import './App.css';
import UserList from '../UserList';
import UserCreateForm from '../UserCreateForm';

export default function App() {
  return (
    <div className="App">
      <UserCreateForm />
      <UserList />
    </div>
  );
}
