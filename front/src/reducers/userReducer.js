import {
  LOAD_USERS_STARTED,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  CREATE_USER_STARTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
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
    case CREATE_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        entities: [...state.users.entities, action.payload],
        loading: false,
        error: null,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // case RENAME_USER_STARTED:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case RENAME_USER_SUCCESS:
    //   return {
    //     ...state,
    //     entities: [...state.users.entities],
    //     loading: false,
    //     error: null,
    //   };
    // case RENAME_USER_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //   };
    // case DELETE_USER_STARTED:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case DELETE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     entities: [...state.users.entities],
    //     loading: false,
    //     error: null,
    //   };
    // case DELETE_USER_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //   };
    default:
      return state;
  }
}
