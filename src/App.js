import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <Routes />
      <h1>moacir</h1>
    </Provider>
  );
}

export default App;
