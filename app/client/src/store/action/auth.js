import {
  LOGIN_SUCCESS,
  AUTH_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOAD_USER_SUCCESS,
  LOGOUT,
} from "../types";

import axios from "axios";
import dispatchFail from "./functions/dispatchFail";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

// loaduser
export const loadUser = () => async dispatch => {
  if (!localStorage.token) return dispatch({ type: AUTH_FAIL });
  setAuthToken();

  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
  } catch (error) {
    // const errors = error.response.data.errors;
    // dispatchFail(dispatch, "danger", errors);
    dispatch({ type: AUTH_FAIL });
  }
};

// login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const body = JSON.stringify({ email, password });

    const res = await axios.post("/api/auth", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    dispatchFail(dispatch, "danger", errors);

    dispatch({ type: AUTH_FAIL });
  }
};
//logout user
export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert("Ausgeloggt", "success"));
};
// register user
export const register = (name, email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/register", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
    dispatch(setAlert("Erfolgreich registriert", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    dispatchFail(dispatch, "danger", errors);
    dispatch({ type: REGISTER_FAIL });
  }
};

// export const register = (name,email, password) => async dispatch => {

// }
// export const register = (name,email, password) => async dispatch => {

// }
