import React from 'react';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.password = React.createRef();
    this.state = {
      login: true,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(`The name is: ${this.name.current.value.trim()}`);
    console.log(`The password is: ${this.password.current.value.trim()}`);
  };

  toogleLogin = () => {
    this.setState(prevState => ({
      login: !prevState.login,
    }));
  };

  render() {
    const { login } = this.state;
    return (
      <>
        {login && (
          <>
            <form onSubmit={this.handleSubmit}>
              <div>
                Name:
                <input type="text" ref={this.name} />
              </div>
              <div>
                Password:
                <input type="password" ref={this.password} />
              </div>
              <input type="submit" value="Login" />
            </form>
            <button type="button" onClick={this.toogleLogin}>
              or Register
            </button>
          </>
        )}
        {!login && (
          <button type="button" onClick={this.toogleLogin}>
            or Login
          </button>
        )}
      </>
    );
  }
}
