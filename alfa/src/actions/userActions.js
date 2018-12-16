export const loadUsers = payload => ({
  type: 'LOAD_USERS',
  payload,
});

export const createUser = (id, name) => ({
  type: 'CREATE_USER',
  payload: {
    id,
    name,
  },
});

export const updateUser = user => ({
  type: 'RENAME_USER',
  payload: user,
});

export const deleteUser = user => ({
  type: 'DELETE_USER',
  payload: user,
});
