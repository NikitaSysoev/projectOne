import React from 'react';
import { connect } from 'react-redux';

import { authPage, userPage } from '../../actions/pageActions';
import './App.css';
import UserPage from '../../pages/UserPage';
import AuthPage from '../../pages/AuthPage';

function App({ auth, users, page }) {
  return (
    <div className="App">
      <div className="App_nav">
        <button type="button" onClick={auth}>
          Auth
        </button>
        <button type="button" onClick={users}>
          Users
        </button>
      </div>
      <div className="App_Content">
        {page === 'auth' && <AuthPage />}
        {page === 'users' && <UserPage />}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    page: state.pages.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    users: () => dispatch(userPage()),
    auth: () => dispatch(authPage()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
