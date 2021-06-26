import {takeEvery, fork, call, put} from 'redux-saga/effects';
import {getProcedures} from '../services/api';
//import {browserHistory} from 'react-router';

function* fetchProcedures(feathersApp) {
  const procedures = yield call(getProcedures, feathersApp);
  yield put({type: "GET_ALL_PROCEDURES", procedures});
}
function* getProceduresSaga(feathersApp) {
  yield* takeEvery("GET_ALL_PROCEDURES", fetchProcedures, feathersApp);
}
export default function* root(feathersApp) {
  yield [
    fork(getProceduresSaga, feathersApp)
  ]
}
