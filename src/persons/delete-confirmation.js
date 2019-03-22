import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { removePerson } from '../store';

class DeletePersonConfirmation extends Component {

  state = {
    removing: false,
  };

  close = () => {
    this.setState({
      removing: false,
    });

    this.props.onHide()
  };

  confirm = () => {
    const { person } = this.props;

    this.setState({ removing: true });

    this.props.removePerson(person.objectId)
      .then(() => this.close())
  };

  render() {
    const { person, show } = this.props;
    const { removing } = this.state;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header className="bg-danger text-white" closeButton>
          <Modal.Title>
            Delete Person Confirmation
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you seriously want to delete "<b>{person && person.name}</b>"
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close} disabled={removing}>No</Button>
          <Button variant="danger" onClick={this.confirm} disabled={removing}>Yes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, { removePerson })(DeletePersonConfirmation);
