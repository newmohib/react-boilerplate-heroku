import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { SIGNUP_SUBMIT } from './constants';

import request from 'utils/request';
import { makeSelectSignupInput } from 'containers/Signup/selectors';



export function* signupSubmitApi() {
  const signupInputObj = yield select(makeSelectSignupInput());
  console.log("input data in saga", signupInputObj);

  let testData = {
    username:"mohib",
    password:"123456",
    firstName:"Mohib",
    lastName:"Rahmn",
    email:"mohib@gmail.com",
    phone:"01812334720",
    gender:"Mail",
    birthDate:"2008-11-11 11:12:01"
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      testData
    ),
  };

  // const requestURL = `https://jsonplaceholder.typicode.com/posts`;
  const requestURL = `http://localhost:4000/signup`;
  const responseUsers = yield call(request, requestURL, options);
  console.log("after submit", responseUsers);
  //insertId,serverStatus:2, affectedRows,

  // yield put(getUsers(responseUsers));

}

// Individual exports for testing
export default function* signupSaga() {
  // See example in containers/HomePage/saga.js

  yield takeLatest(SIGNUP_SUBMIT, signupSubmitApi);
}
