import React, { useState } from 'react';

const RegisterPage = props => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const handleLogin = e => setLogin(e.target.value);
  const handlePassword = e => setPass(e.target.value);
  const handlePassword2 = e => setPass2(e.target.value);
  const register = e => {
    e.preventDefault();
    console.log(login);
    console.log(pass);
    console.log(pass2);
    fetch("http://localhost:8000/register", {
      mode: 'no-cors',
      method: "POST",
      body: {password: pass, password2: pass2 }
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status === 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  };
  return (
    <form action="/register" method="post" onSubmit={register}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleLogin} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handlePassword} />
      </div>
      <div>
        <label>Repeat Password:</label>
        <input type="password" name="password2" onChange={handlePassword2} />
      </div>
      <div>
        <input type="submit" value="Register" />
      </div>
    </form>
  );
};

export default RegisterPage;