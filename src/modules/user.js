import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_FAILURE] =
  createRequestActionTypes('user/GET_TOKEN');

export const getToken = createAction(
  GET_TOKEN,
  ({ accessToken, refreshToken }) => ({
    accessToken,
    refreshToken,
  }),
);

const getTokenSaga = createRequestSaga(GET_TOKEN, authAPI.getNewToken);

export function* userSaga() {
  yield takeLatest(GET_TOKEN, getTokenSaga);
}

const initialState = {
  tokenRes: null,
  tokenErr: null,
};

const user = handleActions(
  {
    [GET_TOKEN_SUCCESS]: (state, { payload: tokenRes }) => ({
      ...state,
      tokenErr: null,
      tokenRes,
    }),
    [GET_TOKEN_FAILURE]: (state, { payload: tokenErr }) => ({
      ...state,
      tokenErr,
    }),
  },
  initialState,
);

export default user;
