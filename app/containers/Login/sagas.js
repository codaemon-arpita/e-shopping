import { take, call, put, cancelled, fork } from 'redux-saga/effects';

import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

function loginApi(email, password) {
  const formData = new FormData();
  formData.append('user[email]', email);
  formData.append('user[password]', password);

  return (
    fetch('http://demo4479506.mockable.io/login', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(json => json)
      .catch(error => {
        throw error;
      })
  );
}


export function* loginFlow(email, password, api) {
  let account;
  if (!api) {
    api = loginApi // eslint-disable-line no-param-reassign
  }
  try {
    account = yield call(api, email, password);
    if (account.session && account.session.errors) {
      throw account.session.errors
    }
    yield put({ type: LOGIN_SUCCESS });
    sessionStorage.setItem('account', JSON.stringify(account));
    
   
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  }
  return account;
}

// the watcher which will watch for any action
function* loginWatcher() {
  while (true) {
    const userLoadingAction = yield take([LOGIN_REQUESTING, LOGOUT_REQUESTING]);
    if (userLoadingAction.type === 'LOGIN_REQUESTING') {
      console.log("in LOGIN_REQUESTING");
      yield fork(loginFlow, userLoadingAction.email, userLoadingAction.password);
    }

  }
}

export default loginWatcher;
// Individual exports for testing
