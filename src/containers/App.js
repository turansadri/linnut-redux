import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase } from 'react-redux-firebase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import reducers from '../reducers';
import Navigation from '../components/Navigation';
import Sightings from '../containers/Sightings';
import BirdsForm from '../containers/BirdsForm';
import BirdsUpdater from '../containers/BirdsUpdater';
import './App.css';

// const composer =
//   process.env.NODE_ENV !== 'production' ? composeWithDevTools : compose;

const rrfConfig = { userProfile: 'users' }; // react-redux-firebase config

const config = firebaseConfig;

firebase.initializeApp(config); // <- new to v2.*.*

const composeEnhancers = composeWithDevTools({});

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
)(createStore);

const store = createStoreWithFirebase(reducers, composeEnhancers());

const Main = styled.main`
  display: grid;
  grid-template-rows: auto 40px;
  height: 100vh;
`;
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Main>
        <Switch>
          <Route exact path="/" component={Sightings} />
          <Route path="/add" component={BirdsForm} />
          <Route path="/update/:id" component={BirdsForm} />
          <Route path="/updater" component={BirdsUpdater} />
        </Switch>
        <Navigation />
      </Main>
    </BrowserRouter>
  </Provider>
);

export default App;
