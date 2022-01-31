import dexSplash from "../../dexSplash";
import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILED,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILED,
} from "../constants/profileConstants";

import {
  USER_UPDATE,
  UPDATE_USER_IMAGES,
  UPDATE_USER_IMAGES_DELETED,
} from "../constants/userConstants";

export const uploadNewImage = (image) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const formData = new FormData();
    formData.append("image", image.current.files[0]);

    const config = {
      headers: {
        Authorization:
          localStorage.getItem("DEX_SPLASH_USER") &&
          JSON.parse(localStorage.getItem("DEX_SPLASH_USER")).token
            ? `Bearer ${
                JSON.parse(localStorage.getItem("DEX_SPLASH_USER")).token
              }`
            : "",
      },
    };
    const data = await dexSplash.post("/image", formData, config);

    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data.data });
    dispatch({ type: UPDATE_USER_IMAGES, payload: data.data });

    localStorage.setItem(
      "DEX_SPLASH_USER",
      JSON.stringify(getState().userLogin.user)
    );
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAILED,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteImageHandler = (image_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_IMAGE_REQUEST });

    const config = {
      headers: {
        Authorization:
          localStorage.getItem("DEX_SPLASH_USER") &&
          JSON.parse(localStorage.getItem("DEX_SPLASH_USER")).token
            ? `Bearer ${
                JSON.parse(localStorage.getItem("DEX_SPLASH_USER")).token
              }`
            : "",
      },
    };
    const data = await dexSplash.delete("/image/" + image_id, config);

    dispatch({ type: DELETE_IMAGE_SUCCESS, payload: data.data });
    dispatch({ type: UPDATE_USER_IMAGES_DELETED, payload: image_id });

    localStorage.setItem(
      "DEX_SPLASH_USER",
      JSON.stringify(getState().userLogin.user)
    );
  } catch (error) {
    dispatch({
      type: DELETE_IMAGE_FAILED,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPasswordAction =
  (currentPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const config = {
        headers: {
          Authorization:
            localStorage.getItem("DEX_SPLASH_USER") &&
            JSON.parse(localStorage.getItem("DEX_SPLASH_USER")).token
              ? `Bearer ${
                  JSON.parse(localStorage.getItem("DEX_SPLASH_USER")).token
                }`
              : "",
        },
      };
      const data = await dexSplash.post(
        "/user/password-reset",
        { currentPassword, newPassword },
        config
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload:
          error.response && error.response.data
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProfileAction =
  (firstname, lastname, image) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);

      if (image) {
        formData.append("image", image.current.files[0]);
      }

      const config = {
        headers: {
          Authorization:
            localStorage.getItem("DEX_SPLASH_USER") &&
            JSON.parse(localStorage.getItem("DEX_SPLASH_USER")).token
              ? `Bearer ${
                  JSON.parse(localStorage.getItem("DEX_SPLASH_USER")).token
                }`
              : "",
        },
      };

      const data = await dexSplash.post("/user/update", formData, config);

      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.data });

      //update user data
      dispatch({ type: USER_UPDATE, payload: data.data.user });

      localStorage.setItem(
        "DEX_SPLASH_USER",
        JSON.stringify(getState().userLogin.user)
      );
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAILED,
        payload:
          error.response && error.response.data
            ? error.response.data.message
            : error.message,
      });
    }
  };
