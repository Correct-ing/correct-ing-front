import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { produce } from '../../node_modules/immer/dist/immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD'; // input 값 변경 감지
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // input 값 초기화

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

const [DUP, DUP_SUCCESS, DUP_FAILURE] = createRequestActionTypes('auth/DUP');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const register = createAction(REGISTER, ({ id, email, password }) => ({
  id,
  email,
  password,
}));

export const login = createAction(LOGIN, ({ id, password }) => ({
  id,
  password,
}));

export const dup = createAction(DUP, ({ username }) => ({
  username,
}));

const dupSaga = createRequestSaga(DUP, authAPI.isIdDup);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(DUP, dupSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    id: '', // 아이디 값
    email: '', // 닉네임 값
    password: '', // 비밀번호 값
    passwordConfirm: '', // 비밀번호 확인 값
  },
  login: {
    id: '', // 아이디 값
    password: '', // 비밀번호 값
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [DUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [DUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
