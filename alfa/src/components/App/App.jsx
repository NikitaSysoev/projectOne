import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export default class App extends Component {
  state = {
    message: null
  };

  componentDidMount() {
    fetch("http://localhost:8080/hello")
      .then(res => res.json())
      .then(res => this.setState({ message: res.message }));
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
