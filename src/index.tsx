// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your Redux store
import App from './App';
import ErrorBoundary from './ErrorBoundary';

// Wrap your App component with ErrorBoundary
const AppWithBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Render AppWithBoundary instead of App
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppWithBoundary />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);