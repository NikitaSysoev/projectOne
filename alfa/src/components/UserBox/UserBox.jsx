import React, { Component } from 'react';
import { Button } from 'reactstrap';

import './UserBox.css';

export default class UserBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renaming: false,
    };
  }

  renameUser = e => {
    const { renaming } = this.state;
    e.preventDefault();
    this.setState({
      renaming: !renaming,
    });
  };

  deleteUser = e => {
    e.preventDefault();
  };

  render() {
    const { renaming } = this.state;
    return (
      <div className="UserBox">
        {!renaming && <div>Name</div>}
        {renaming && <input type="text /" />}
        <div>
          <Button color="secondary" onClick={this.renameUser}>
            {!renaming ? 'Rename' : 'Ok'}
          </Button>
          <Button color="danger" onClick={this.deleteUser}>
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
