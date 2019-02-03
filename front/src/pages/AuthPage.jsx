import React from 'react';
import api from '../api';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      loginPage: true,
      login: '',
      password: '',
      passwordRepeat: '',
      loginError: null,
      passwordError: null,
      passwordRepeatError: null,
    };
    this.state = {
      ...this.initialState,
    };
  }

  login = e => {
    e.preventDefault();
    const { login, password } = this.state;
    this.testLogin(login);
    this.testPassword(password);
    console.log(this.state);
  };

  register = e => {
    e.preventDefault();
    const { login, password } = this.state;
    this.testLogin(login);
    this.testPassword(password);
    console.log(this.state);
  };

  testLogin = login => {
    const test = api.TestLogin(login);
    if (test.status) {
      this.setState({
        loginError: null,
      });
    }
    if (!test.status) {
      this.setState({
        loginError: test.message,
      });
    }
  };

  testPassword = password => {
    const { passwordRepeat } = this.state;
    const test = api.PasswordTest(password);
    if (password !== passwordRepeat) {
      this.setState({
        passwordRepeatError: true,
      });
    }
    if (password === passwordRepeat) {
      this.setState({
        passwordRepeatError: null,
      });
    }
    if (test.status) {
      this.setState({
        passwordError: null,
      });
    }
    if (!test.status) {
      this.setState({
        passwordError: test.message,
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toogleLogin = () => {
    this.setState(prevState => ({
      ...this.initialState,
      loginPage: !prevState.loginPage,
    }));
  };

  render() {
    const {
      loginPage,
      passwordRepeat,
      login,
      password,
      loginError,
      passwordError,
      passwordRepeatError,
    } = this.state;
    return (
      <>
        {loginPage && (
          <>
            <form onSubmit={this.login}>
              <div>
                Name:
                <input
                  type="text"
                  name="login"
                  value={login}
                  onChange={this.handleChange}
                />
                <p style={{ color: 'red' }}>{!!loginError && loginError}</p>
              </div>
              <div>
                Password:
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <p style={{ color: 'red' }}>
                  {!!passwordError && passwordError}
                </p>
              </div>
              <input
                type="submit"
                value="Login"
                disabled={!(login.trim() && password.trim())}
              />
            </form>
            <button type="button" onClick={this.toogleLogin}>
              or Register
            </button>
          </>
        )}
        {!loginPage && (
          <>
            <form onSubmit={this.register}>
              <div>
                Enter the Name:
                <input
                  type="text"
                  name="login"
                  value={login}
                  onChange={this.handleChange}
                />
                <p style={{ color: 'red' }}>{!!loginError && loginError}</p>
              </div>
              <div>
                Enter the Password:
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <p style={{ color: 'red' }}>
                  {!!passwordError && passwordError}
                </p>
              </div>
              <div>
                Repeat the Password:
                <input
                  type="password"
                  name="passwordRepeat"
                  value={passwordRepeat}
                  onChange={this.handleChange}
                />
              </div>
              <p style={{ color: 'red' }}>
                {passwordRepeatError && 'пароли не совпадают'}
              </p>
              <input
                type="submit"
                value="Register"
                disabled={
                  !(login.trim() && password.trim() && passwordRepeat.trim())
                }
              />
            </form>
            <button type="button" onClick={this.toogleLogin}>
              or Login
            </button>
          </>
        )}
      </>
    );
  }
}
