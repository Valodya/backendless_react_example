import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { createPerson, updatePerson } from '../store';

class PersonEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      person     : props.person || {},
      saving     : false,
      serverError: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevPerson = this.props.person || {};
    const nextPerson = nextProps.person || {};

    if (prevPerson.objectId !== nextPerson.objectId) {
      this.setState({ person: nextPerson })
    }
  }

  close = () => {
    this.setState({
      person     : {},
      saving     : false,
      serverError: null
    });

    this.props.onHide()
  };

  preparePerson() {
    const { person } = this.state;

    return {
      ...person,
      name   : (person.name || '').trim() || null,
      address: (person.address || '').trim() || null,
    }
  }

  save = () => {
    const person = this.preparePerson();

    const action = this.props.person
      ? this.props.updatePerson
      : this.props.createPerson;

    action(person)
      .then(() => this.close())
      .catch(e => this.setState({ serverError: e.message }));
  };

  onNameChange = e => this.setState({ person: { ...this.state.person, name: e.target.value } });
  onAddressChange = e => this.setState({ person: { ...this.state.person, address: e.target.value } });

  render() {
    const { show } = this.props;
    const { person, serverError, saving } = this.state;

    const isNew = !this.props.person;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNew ? 'Add' : 'Edit'} Person
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                className="form-control"
                placeholder="Input name"
                value={person.name || ''}
                onChange={this.onNameChange}
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input
                className="form-control"
                placeholder="Input address"
                value={person.address || ''}
                onChange={this.onAddressChange}
              />
            </div>

            {serverError && (
              <Alert variant="danger">
                {serverError}
              </Alert>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.close}>
            Close
          </Button>
          <Button variant="primary" onClick={this.save} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, { createPerson, updatePerson })(PersonEditor);
