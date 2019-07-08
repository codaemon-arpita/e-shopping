/*
 *
 * Login reducer
 *
 */

// import { fromJS } from 'immutable';
import { LOGIN_REQUESTING, LOGOUT_SUCCESS, LOGOUT_REQUESTING, LOGOUT_ERROR, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{body: 'Logging in...', time: new Date()}],
        errors: [],
      };
    case LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      };
    case LOGIN_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      };
    case LOGOUT_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{body: 'Logging out...', time: new Date()}],
        errors: [],
      };
    case LOGOUT_ERROR:
    return {
      errors: state.errors.concat([{
        body: action.error.toString(),
        time: new Date(),
      }]),
      messages: [],
      requesting: false,
      successful: false,
    };
    case LOGOUT_SUCCESS:
    return {
      errors: [],
      messages: [],
      requesting: false,
      successful: true,
    };
    default:
      return state;
  }
};

export default reducer;
