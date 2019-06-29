import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index-store';
import Routes from './routes/index-routes';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
