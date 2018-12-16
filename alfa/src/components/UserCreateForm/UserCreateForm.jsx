import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import './UserCreateForm.css';

export default class UserCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  addUser = e => {
    e.preventDefault();
    const { addUser } = this.props;
    const { inputValue } = this.state;
    addUser(1, inputValue);
  };

  onCheckValue = e => {
    e.preventDefault();
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="UserCreateForm">
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="text"
              placeholder="Enter Name"
              onChange={this.onCheckValue}
              value={inputValue}
            />
          </FormGroup>
          <Button onClick={this.addUser} disabled={!inputValue.trim()}>
            Create user
          </Button>
        </Form>
      </div>
    );
  }
}
