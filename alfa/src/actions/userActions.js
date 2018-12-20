export const LOAD_USERS = 'LOAD_USERS';
export const CREATE_USER = 'CREATE_USER';
export const RENAME_USER = 'RENAME_USER';
export const DELETE_USER = 'DELETE_USER';

export const loadUsers = payload => ({
  type: LOAD_USERS,
  payload,
});

export const createUser = (id, name) => ({
  type: CREATE_USER,
  payload: {
    id,
    name,
  },
});

export const updateUser = user => ({
  type: RENAME_USER,
  payload: user,
});

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
});
