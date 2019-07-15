import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
