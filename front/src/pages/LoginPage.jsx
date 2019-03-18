import React, { useState } from 'react';

const LoginPage = props => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const handleLogin = e => setLogin(e.target.value);
  const handlePassword = e => setPass(e.target.value);
  const send = e => {
    e.preventDefault();
    console.log(login);
    console.log(pass);
  };
  return (
    <form action="/login" method="post" onSubmit={send}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleLogin} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handlePassword} />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
  );
};

export default LoginPage;
