import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from "app/shared/utils/action-type.util";
import {cleanEntity, IGetResultValues} from "app/shared/type/dataTypes-utils";
import {ActionUri} from "app/shared/utils/action-uri";
import {IAlbumDetail} from "app/component/imgur-gallery/album/album-panel";


export const ACTION_TYPES = {
    GALLERY_LIST: ':gallery/GALLERY_LIST',
    RESET: ':gallery/RESET'
};

export const initialState = {
    loading: false,
    errorMessage: null,
    galleryList: {data: [] , status: 0, success: false}
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

export const getImgurGallery: IGetResultValues<any> = queryParams => ({
    type: ACTION_TYPES.GALLERY_LIST,
    payload: axios.get(ActionUri.gallery + queryParams)
});
