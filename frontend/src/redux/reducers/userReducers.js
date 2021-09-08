import {
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_SIGNUP_FAILED,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE,
  UPDATE_USER_IMAGES,
  UPDATE_USER_IMAGES_DELETED,
} from "../constants/userConstants";

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userRegister: true, message: action.payload };
    case USER_SIGNUP_FAILED:
      return { loading: false, message: action.payload, error: true };
    default:
      return { loading: false };
  }
};

export const userLoginReducer = (
  state = { user: JSON.parse(localStorage.getItem("DEX_SPLASH_USER")) },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userLogin: true,
        user: action.payload,
        message: "success",
      };
    case USER_UPDATE:
      return {
        loading: false,
        userLogin: true,
        user: {
          ...state.user,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          image: action.payload.image
            ? action.payload.image
            : state.user.image_id,
          image_id: action.payload.image
            ? action.payload.image_id
            : state.user.image,
        },
      };
    case UPDATE_USER_IMAGES:
      return {
        loading: false,
        userLogin: true,
        user: {
          ...state.user,
          images: [
            ...state.user.images,
            {
              _id: action.payload.image._id,
              url: action.payload.image.url,
              image_id: action.payload.image.image_id,
            },
          ],
        },
      };
    case UPDATE_USER_IMAGES_DELETED:
      return {
        loading: false,
        userLogin: true,
        user: {
          ...state.user,
          images: state.user.images.filter(
            (image) => image.image_id !== action.payload
          ),
        },
      };
    case USER_LOGIN_FAILED:
      return { loading: false, message: action.payload, error: true };
    case USER_LOGOUT:
      return { loading: false, user: null };
    default:
      return { loading: false, ...state };
  }
};
