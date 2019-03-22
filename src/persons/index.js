import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { loadPersons, getPersons } from '../store';

import Editor from './editor';
import DeleteConfirmation from './delete-confirmation';

const mapStateToProps = state => {
  const { loading, loaded, error, list: persons } = getPersons(state);

  return {
    loading,
    loaded,
    error,
    persons
  }
};

class Persons extends Component {

  state = {
    showEditor : false,
    editorProps: null,

    showDeleteConfirmation : false,
    deleteConfirmationProps: null,
  };

  showEditor = person => this.setState({ showEditor: true, editorProps: { person } });
  hideEditor = () => this.setState({ showEditor: false, editorProps: null });

  showDeleteConfirmation = person => this.setState({ showDeleteConfirmation : true, deleteConfirmationProps: { person } });
  hideDeleteConfirmation = () => this.setState({ showDeleteConfirmation: false, deleteConfirmationProps: null });

  componentWillMount() {
    this.props.loadPersons();
  }

  onAddClick = () => this.showEditor(null);
  onEditClick = person => this.showEditor(person);
  onDeleteClick = person => this.showDeleteConfirmation(person);

  renderPerson = person => {
    return (
      <li key={person.objectId} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div>{person.name}</div>
          <div className="text-muted small">{person.address}</div>
        </div>

        <ButtonGroup>
          <Button size="sm" variant="outline-primary" onClick={() => this.onEditClick(person)}>Edit</Button>
          <Button size="sm" variant="outline-danger" onClick={() => this.onDeleteClick(person)}>Delete</Button>
        </ButtonGroup>
      </li>
    );
  };

  render() {
    const { loading, error, persons } = this.props;
    const { showEditor, editorProps, showDeleteConfirmation, deleteConfirmationProps } = this.state;

    if (loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )
    }

    return (
      <div>
        <div className="mb-2">
          <Button onClick={this.onAddClick}>Add new Person</Button>
          <Editor {...editorProps} show={showEditor} onHide={this.hideEditor}/>
        </div>

        <ul className="list-group">
          {persons.map(this.renderPerson)}
        </ul>

        <DeleteConfirmation
          {...deleteConfirmationProps}
          show={showDeleteConfirmation}
          onHide={this.hideDeleteConfirmation}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, { loadPersons })(Persons);
