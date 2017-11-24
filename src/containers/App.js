import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase } from 'react-redux-firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import * as firebase from 'firebase';
import reducers from '../reducers';
import BirdsFilter from '../containers/BirdsFilter';
import BirdsForm from '../containers/BirdsForm';
import './App.css';

const composer =
  process.env.NODE_ENV !== 'production' ? composeWithDevTools : compose;

const rrfConfig = { userProfile: 'users' }; // react-redux-firebase config

firebase.initializeApp(config); // <- new to v2.*.*

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
)(createStore);

const store = createStoreWithFirebase(reducers, composeEnhancers());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={BirdsFilter} />
            <Route path="/add" component={BirdsForm} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
