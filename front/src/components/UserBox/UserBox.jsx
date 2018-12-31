import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import { updateUser, deleteUser } from '../../actions/userActions';

import './UserBox.css';

class UserBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renaming: false,
    };
  }

  rename = () => {
    const { id } = this.props;
    const { renaming } = this.state;
    this.setState(state => {
      return {
        renaming: !state.renaming,
      };
    });
    if (renaming) {
      console.log(id);
    }
  };

  delete = e => {
    e.preventDefault();
    const { removeUser, id } = this.props;
    removeUser(id);
  };

  render() {
    const { renaming } = this.state;
    const { name } = this.props;
    return (
      <div className="UserBox">
        {!renaming ? <div>{name}</div> : <input type="text /" />}
        <div>
          <Button color="secondary" onClick={this.rename}>
            {!renaming ? 'Rename' : 'Ok'}
          </Button>
          <Button color="danger" onClick={this.delete}>
            Delete
          </Button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    renameUser: (id, name) => dispatch(updateUser(id, name)),
    removeUser: id => dispatch(deleteUser(id)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(UserBox);
