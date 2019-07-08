/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import login from './containers/Login/reducer';


export default combineReducers({
  form,
  login,
});
