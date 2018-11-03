import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import api from '../api';

export default class App extends Component {
  state = {
    message: null,
  };

  componentDidMount() {
    api.hello().then(message => this.setState({ message }));
  }

  render() {
    const { message } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{message}</p>
        </header>
      </div>
    );
  }
}
