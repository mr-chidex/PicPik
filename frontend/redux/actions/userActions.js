import dexSplash from "../../dexSplash";
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_SIGNUP_FAILED,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const userSignUpAction =
  (firstname, lastname, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });

      const data = await dexSplash.post("/users/signup", {
        firstname,
        lastname,
        email,
        password,
      });
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.data.message });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload:
          error.response && error.response.data
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userSignInAction =
  (email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const data = await dexSplash.post("/users/signin", {
        email,
        password,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data,
      });

      localStorage.setItem(
        "DEX_SPLASH_USER",
        JSON.stringify(getState().userLogin.user)
      );
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userLogoutAction = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("DEX_SPLASH_USER");
};
