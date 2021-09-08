import { combineReducers } from "redux";

import { userSignupReducer, userLoginReducer } from "./userReducers";
import {
  imageUploadReducer,
  resetPasswordReducer,
  updateProfileReducer,
  deleteImageReducer,
} from "./profileReducers";
import { getImageReducer, getImagesReducer } from "./ImageReducers";

const allReducers = combineReducers({
  userSignup: userSignupReducer,
  userLogin: userLoginReducer,
  newImage: imageUploadReducer,
  passwordReset: resetPasswordReducer,
  updatedProfile: updateProfileReducer,
  single_image: getImageReducer,
  all_images: getImagesReducer,
  deleted_image: deleteImageReducer,
});

export default allReducers;
