import dexSplash from "../../dexSplash";
import {
  GET_IMAGES_FAILED,
  GET_IMAGES_REQUEST,
  GET_IMAGES_SUCCESS,
  GET_IMAGE_FAILED,
  GET_IMAGE_REQUEST,
  GET_IMAGE_SUCCESS,
} from "../constants/ImageConstants";

export const getImagesActions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_IMAGES_REQUEST });

    const images = await dexSplash.get("/image");
    dispatch({
      type: GET_IMAGES_SUCCESS,
      payload: { images: images.data.images, total: images.data.total },
    });
  } catch (error) {
    dispatch({
      type: GET_IMAGES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getImageActions = (imageId) => async (dispatch) => {
  try {
    dispatch({ type: GET_IMAGE_REQUEST });

    const image = await dexSplash.get(`/image/${imageId}`);
    dispatch({ type: GET_IMAGE_SUCCESS, payload: image.data });
  } catch (error) {
    dispatch({
      type: GET_IMAGE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
