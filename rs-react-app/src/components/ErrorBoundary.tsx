import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    console.error('Error caught by ErrorBoundary:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('Uncaught error:', error);
    console.error('Error Info:', errorInfo);
    console.log('Error Boundary Report:', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '20px',
            border: '1px solid #f00',
            borderRadius: '5px',
            margin: '10px',
          }}
        >
          <h1>Oops! Something went wrong.</h1>
          <p>We apologize for the inconvenience. Here are the error details:</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error Details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
