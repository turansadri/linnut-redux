import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import birdsFilter from './birds-filter';

const rootReducer = combineReducers({
  birds: birdsFilter,
  firebase: firebaseStateReducer,
});

export default rootReducer;
