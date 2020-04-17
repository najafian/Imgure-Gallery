import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from "app/shared/utils/action-type.util";
import {cleanEntity, IPayloadRepository} from "app/shared/type/dataTypes-utils";
import {ActionUri} from "app/shared/utils/action-uri";

/*
* TabID is DONE!
* */
export const ACTION_TYPES = {
  TERMINAL_LIST: ':Techno/TERMINAL_LIST',
  RESET: ':Techno/RESET'
};

export const initialState = {
  loading: false,
  errorMessage: null,
  galleryList: null as any,
};

export type TerminalReduxState = Readonly<typeof initialState>;

// Reducer
export default (state: TerminalReduxState = initialState, action): TerminalReduxState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.TERMINAL_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.TERMINAL_LIST):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.TERMINAL_LIST):
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

export const getImgurGallery: IPayloadRepository<any> = entity => ({
  type: ACTION_TYPES.TERMINAL_LIST,
  payload: axios.get(ActionUri.gallery , cleanEntity(entity))
});
