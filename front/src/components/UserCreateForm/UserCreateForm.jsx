import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';

import './UserCreateForm.css';

import { addUser } from '../../actions/userActions';

class UserCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  create = () => {
    const { createUser } = this.props;
    const { inputValue } = this.state;
    createUser(inputValue);
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
          <Button onClick={this.create} disabled={!inputValue.trim()}>
            Create user
          </Button>
        </Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: name => dispatch(addUser(name)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(UserCreateForm);
