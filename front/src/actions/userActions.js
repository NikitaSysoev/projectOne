import api from '../api';

export const LOAD_USERS_STARTED = 'LOAD_USERS_STARTED';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
export const ADD_USER_STARTED = 'ADD_USER_STARTED';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const UPDATE_USER_STARTED = 'UPDATE_USER_STARTED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const DELETE_USER_STARTED = 'DELETE_USER_STARTED';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

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

const addUserStarted = () => ({
  type: ADD_USER_STARTED,
});

const addUserSuccess = (id, name) => ({
  type: ADD_USER_SUCCESS,
  payload: {
    _id: id,
    name,
  },
});

const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
  payload: {
    error,
  },
});

export const addUser = name => async dispatch => {
  try {
    dispatch(addUserStarted());
    const maxEl = await api.addUser(name);
    dispatch(addUserSuccess(maxEl, name));
  } catch (error) {
    dispatch(addUserFailure(error));
  }
};

const updateUserStarted = () => ({
  type: UPDATE_USER_STARTED,
});

const updateUserSuccess = (id, name) => ({
  type: UPDATE_USER_SUCCESS,
  payload: {
    id,
    name,
  },
});

const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: {
    error,
  },
});

export const updateUser = (id, name) => async dispatch => {
  try {
    dispatch(updateUserStarted());
    const maxEl = await api.updateUser(name);
    dispatch(updateUserSuccess(maxEl, name));
  } catch (error) {
    dispatch(updateUserFailure(error));
  }
};

const deleteUserStarted = () => ({
  type: DELETE_USER_STARTED,
});

const deleteUserSuccess = id => ({
  type: DELETE_USER_SUCCESS,
  payload: {
    id,
  },
});

const deleteUserFailure = error => ({
  type: DELETE_USER_FAILURE,
  payload: {
    error,
  },
});

export const deleteUser = id => async dispatch => {
  try {
    dispatch(deleteUserStarted());
    await api.deleteUser(id);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure(error));
  }
};
