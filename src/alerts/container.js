import React, { Component } from 'react'
import { TransitionGroup } from 'react-transition-group'

import AlertsManager from './manager'
import AlertView from './alert'

export default class AlertsContainer extends Component {

  state = {
    items: [],
  }

  componentDidMount() {
    AlertsManager.subscribe(this.onAlertsChange)
  }

  onAlertsChange = items => {
    this.setState({ items })
  }

  onItemClose = alert => {
    AlertsManager.remove(alert._id)
  }

  render() {
    const { items } = this.state

    return (
      <TransitionGroup className="alerts-container">
        {items.map(alert => (
          <AlertView key={alert._id} alert={alert} onClose={this.onItemClose}/>
        ))}
      </TransitionGroup>
    )
  }

}
