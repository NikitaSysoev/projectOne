const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'CREATE_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'RENAME_USER':
      return state.filter(obj => obj.id === action.payload.id);
    case 'DELETE_USER':
      return [...state];
    default:
      return state;
  }
};

export default usersReducer;
