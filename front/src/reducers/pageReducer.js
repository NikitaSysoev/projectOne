import { REGISTER_PAGE, USERS_PAGE, LOGIN_PAGE } from '../actions/pageActions';

const initialState = {
  page: 'register'
};

export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_PAGE:
      return {
        page: 'register'
      };
    case LOGIN_PAGE:
      return {
        page: 'login'
      };
    case USERS_PAGE:
      return {
        page: 'users'
      };
    default:
      return state;
  }
}
