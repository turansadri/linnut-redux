import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import birdsFilter from '../reducers/birds-filter';
import BirdsFilter from '../containers/BirdsFilter';

const composer = process.env.NODE_ENV !== 'production' ? composeWithDevTools : compose;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  birdsFilter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BirdsFilter />
      </Provider>
    );
  }
}

export default App;
