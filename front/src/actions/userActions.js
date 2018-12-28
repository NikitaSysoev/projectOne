import api from '../api';

export const LOAD_USERS_STARTED = 'LOAD_USERS_STARTED';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
export const CREATE_USER_STARTED = 'CREATE_USER_STARTED';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const RENAME_USER = 'RENAME_USER';
export const DELETE_USER = 'DELETE_USER';

const loadUsersStarted = () => ({
  type: LOAD_USERS_STARTED,
});

const loadUsersSuccess = users => ({
  type: LOAD_USERS_SUCCESS,
  payload: users,
});

const loadUsersFailure = error => ({
  type: LOAD_USERS_FAILURE,
  payload: {
    error,
  },
});

export const loadUsers = () => async dispatch => {
  try {
    dispatch(loadUsersStarted());
    const data = await api.getUsers();
    dispatch(loadUsersSuccess(data));
  } catch (error) {
    dispatch(loadUsersFailure(error));
  }
};

const createUserStarted = () => ({
  type: CREATE_USER_STARTED,
});

const createUserSuccess = (id, name) => ({
  type: CREATE_USER_SUCCESS,
  payload: {
    id,
    name,
  },
});

const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: {
    error,
  },
});

export const createUser = (id, name) => async dispatch => {
  try {
    dispatch(createUserStarted());
    await api.addUser(id, name) && dispatch(createUserSuccess(id, name));
  } catch (error) {
    dispatch(createUserFailure(error));
  }
};

export const updateUser = user => ({
  type: RENAME_USER,
  payload: user,
});

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
});
