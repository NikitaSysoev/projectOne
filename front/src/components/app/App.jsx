import React from 'react';
import { connect } from 'react-redux';

import { registerPage, userPage, loginPage } from '../../actions/pageActions';
import './App.css';
import UserPage from '../../pages/UserPage';
import RegisterPage from '../../pages/RegisterPage';
import LoginPage from '../../pages/LoginPage';

const App = ({ register, users, login, page }) => {
  return (
    <div className="App">
      <div className="App_nav">
        <button type="button" onClick={register}>
          Register
        </button>
        <button type="button" onClick={login}>
          Login
        </button>
        <button type="button" onClick={users}>
          Users
        </button>
      </div>
      <div className="App_Content">
        {page === 'register' && <RegisterPage />}
        {page === 'login' && <LoginPage />}
        {page === 'users' && <UserPage />}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    page: state.pages.page
  };
}

function mapDispatchToProps(dispatch) {
  return {
    users: () => dispatch(userPage()),
    register: () => dispatch(registerPage()),
    login: () => dispatch(loginPage())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
