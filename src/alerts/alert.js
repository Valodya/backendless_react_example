import React from 'react'
import { CSSTransition } from 'react-transition-group'

export default class AlertView extends React.Component {

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  close = () => {
    this.props.onClose(this.props.alert)
  }

  stopTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
    }
  }

  startTimer = () => {
    this.stopTimer()

    const closeTimeout = this.props.alert.timeout

    if (closeTimeout) {
      this.closeTimer = setTimeout(this.close, closeTimeout)
    }
  }

  render() {
    const { alert, ...props } = this.props

    return (
      <CSSTransition
        classNames={{
          enter      : 'transition-enter',
          enterActive: 'transition-enter-active',
          exit       : 'transition-exit',
          exitActive : 'transition-exit-active',
        }}
        onMouseLeave={this.startTimer}
        onMouseEnter={this.stopTimer}
        timeout={{ enter: 300, exit: 500 }}
        {...props}>

        <div className="alert alert-primary">
          <button className="close" data-dismiss="alert" aria-label="Close" onClick={this.close}>
            <span aria-hidden="true">&times;</span>
          </button>

          <div className="alert-message">
            {alert.message}
          </div>
        </div>
      </CSSTransition>
    )
  }

}

