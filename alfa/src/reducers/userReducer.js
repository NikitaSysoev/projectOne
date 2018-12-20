import {
  LOAD_USERS,
  CREATE_USER,
  RENAME_USER,
  DELETE_USER,
} from '../actions/userActions';

const initialState = {
  entities: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        entities: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        entities: [...state.users.entities, action.payload],
      };
    case RENAME_USER:
      return {
        ...state,
      };
    case DELETE_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
