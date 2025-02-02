import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM
} from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = idStream => async dispatch => {
  const response = await streams.get(`/streams/${idStream}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (idStream, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${idStream}`, formValues);
  console.log(response.data)
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");  
};

export const deleteStream = idStream => async dispatch => {
  await streams.delete(`/streams/${idStream}`);

  dispatch({ type: DELETE_STREAM, payload: idStream });
  history.push('/')
};
