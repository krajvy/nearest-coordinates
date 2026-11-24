import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface CommonProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<CommonProps, ErrorBoundaryState> {
  constructor(props: CommonProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('App Error:', error, errorInfo);
  }

  override render(): ReactNode {
    return this.props.children;
  }
}

export default ErrorBoundary;
