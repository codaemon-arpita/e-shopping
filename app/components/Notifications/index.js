import React, { Component } from 'react';
import Messages from './Messages';

class Notifications extends Component {
  constructor(props){
    super(props)
    this.state = { showMessage: true };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ showMessage: false}), 4000);
  }
  
  render() {
    const { requesting, errors, successful, messages } = this.props
    return (
      <div>
        { this.state.showMessage ? (
          <div className="account-messages">
            {requesting && <span>Updating account...</span>}
            {!requesting && errors && !!errors.length && (
              <Messages error messages={errors} />
            )}
            {!requesting && successful && !!messages.length && (
              <Messages messages={messages} />
            )}
          </div>
        ) : ''
      }
      </div>
    )
  }
}
export default Notifications
