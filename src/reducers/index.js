import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import sightingsFilter from './sightings-filter';

const rootReducer = combineReducers({
  birds: sightingsFilter,
  firebase: firebaseStateReducer,
});

export default rootReducer;
