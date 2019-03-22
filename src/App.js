import React, { Component } from 'react';
import { connect } from 'react-redux'

import { loadPersons, getPersons } from './store';

const mapStateToProps = state => {
  const { loading, loaded, error, list: persons } = getPersons(state);

  return {
    loading,
    loaded,
    error,
    persons
  }
};

class App extends Component {

  componentWillMount() {
    this.props.loadPersons()
  }

  renderContent() {
    const { loading, error, persons } = this.props;

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
      <ul className="list-group">
        {persons.map((person, index) => (
          <li key={index} className="list-group-item">
            <div>{person.name}</div>
            <div className="text-muted small">{person.address}</div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { loading, loaded, error, persons } = this.props;

    console.log({ loading, loaded, error, persons });

    return (
      <div className="container">
        <div className="header">
          <h3>
            Backendless React Addresses Book
          </h3>
        </div>

        {this.renderContent()}
      </div>
    );
  }
}

export default connect(mapStateToProps, { loadPersons })(App);
