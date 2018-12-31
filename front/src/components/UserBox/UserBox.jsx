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
    const { id } = this.props;
    const { renaming } = this.state;
    e.preventDefault();
    this.setState(state => {
      return {
        renaming: !state.renaming,
      };
    });
    if (renaming) {
      console.log(id);
    }
  };

  deleteUser = e => {
    const { id } = this.props;
    e.preventDefault();
    console.log(id);
  };

  render() {
    const { renaming } = this.state;
    const { name } = this.props;
    return (
      <div className="UserBox">
        {!renaming ? <div>{name}</div> : <input type="text /" />}
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
