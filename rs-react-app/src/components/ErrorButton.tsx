import React from 'react';

interface ErrorButtonState {
  shouldThrowError: boolean;
}

class ErrorButton extends React.Component<object, ErrorButtonState> {
  state: ErrorButtonState = {
    shouldThrowError: false,
  };
  handleClick = () => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('This is a test error from ErrorButton');
    }
    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}

export default ErrorButton;
