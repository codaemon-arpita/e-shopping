import LoginSaga from './containers/Login/sagas';

export default function* IndexSaga() {
  yield [
    LoginSaga(),
  ];
}
