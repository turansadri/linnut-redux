import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase } from 'react-redux-firebase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { firebaseConfig } from '../config';
import * as firebase from 'firebase';
import reducers from '../reducers';
import Navigation from '../components/Navigation';
import BirdsFilter from '../containers/BirdsFilter';
import BirdsForm from '../containers/BirdsForm';
import BirdsUpdater from '../containers/BirdsUpdater';
import './App.css';
import 'input-moment/dist/input-moment.css';

const composer =
  process.env.NODE_ENV !== 'production' ? composeWithDevTools : compose;

const rrfConfig = { userProfile: 'users' }; // react-redux-firebase config

const config = firebaseConfig;

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
            <Navigation />
            <Switch>
              <Route exact path="/" component={BirdsFilter} />
              <Route path="/add" component={BirdsForm} />
              <Route path="/updater" component={BirdsUpdater} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
