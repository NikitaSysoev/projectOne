import {
  LOAD_USERS_STARTED,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  ADD_USER_STARTED,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  UPDATE_USER_STARTED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_STARTED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../actions/userActions';

const initialState = {
  loading: false,
  entities: [],
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        entities: action.payload,
        loading: false,
        error: null,
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        entities: [...state.entities, action.payload],
        loading: false,
        error: null,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        entities: [...state.users.entities],
        loading: false,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case DELETE_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        entities: [...state.entities.filter(item => item._id !== action.payload.id)],
        loading: false,
        error: null,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
