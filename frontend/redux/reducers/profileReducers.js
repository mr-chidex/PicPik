import {
  UPLOAD_IMAGE_FAILED,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
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

export const imageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        success: true,
      };
    case UPLOAD_IMAGE_FAILED:
      return { loading: false, error: true, message: action.payload };
    default:
      return state;
  }
};

export const deleteImageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_IMAGE_REQUEST:
      return { loading: true };
    case DELETE_IMAGE_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        success: true,
      };
    case DELETE_IMAGE_FAILED:
      return { loading: false, error: true, message: action.payload };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_FAILED:
      return { loading: false, error: true, message: action.payload };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload.message };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
        user: action.payload.user,
      };
    case UPDATE_PROFILE_FAILED:
      return { loading: false, error: true, message: action.payload };
    default:
      return state;
  }
};
