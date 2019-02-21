import React from 'react';

import UserList from '../components/UserList';
import UserCreateForm from '../components/UserCreateForm';

export default function UserPage() {
  return (
    <>
      <UserCreateForm />
      <UserList />
    </>
  );
}
