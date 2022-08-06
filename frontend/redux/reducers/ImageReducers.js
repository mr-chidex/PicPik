import {
  GET_IMAGES_FAILED,
  GET_IMAGES_REQUEST,
  GET_IMAGES_SUCCESS,
  GET_IMAGE_FAILED,
  GET_IMAGE_REQUEST,
  GET_IMAGE_SUCCESS,
} from "../constants/ImageConstants";

export const getImagesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_IMAGES_REQUEST:
      return { loading: true };
    case GET_IMAGES_SUCCESS:
      return {
        loading: false,
        images: action.payload?.images,
        total: action.payload?.total,
        success: true,
      };
    case GET_IMAGES_FAILED:
      return { loading: false, error: true, message: action.payload };
    default:
      return state;
  }
};

export const getImageReducer = (
  state = { success: false, loading: false },
  action
) => {
  switch (action.type) {
    case GET_IMAGE_REQUEST:
      return { loading: true };
    case GET_IMAGE_SUCCESS:
      return { loading: false, image: action.payload, success: true };
    case GET_IMAGE_FAILED:
      return { loading: false, error: true, message: action.payload };
    default:
      return state;
  }
};
