import { AUTH_PAGE, USERS_PAGE } from '../actions/pageActions';

const initialState = {
  page: 'auth'
};

export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_PAGE:
      return {
        page: 'auth'
      };
    case USERS_PAGE:
      return {
        page: 'users'
      };
    default:
      return state;
  }
}
