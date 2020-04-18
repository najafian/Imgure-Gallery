import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from "app/shared/utils/action-type.util";
import {cleanEntity, IPayloadRepository} from "app/shared/type/dataTypes-utils";
import {ActionUri} from "app/shared/utils/action-uri";


export const ACTION_TYPES = {
  GALLERY_LIST: ':IMGUR/GALLERY_LIST',
  RESET: ':IMGUR/RESET'
};

export const initialState = {
  loading: false,
  errorMessage: null,
  galleryList: null as any,
};

export type GalleryReduxState = Readonly<typeof initialState>;

// Reducer
export default (state: GalleryReduxState = initialState, action): GalleryReduxState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GALLERY_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.GALLERY_LIST):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.GALLERY_LIST):
      return {
        ...state,
        loading: false,
        galleryList: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const getImgurGallery: IPayloadRepository<any> = queryParams => ({
  type: ACTION_TYPES.GALLERY_LIST,
  payload: axios.get(ActionUri.gallery + queryParams)
});
