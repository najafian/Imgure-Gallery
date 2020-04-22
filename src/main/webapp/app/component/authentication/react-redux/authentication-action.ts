import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/utils/action-type.util';
import setupAxiosInterceptors from '../../../config/axios-interceptor';
import {ActionUri} from 'app/shared/utils/action-uri';

export const ACTION_TYPES = {
    ACCOUNT: 'authentication/ACCOUNT',
    AUTHENTICATE: 'authentication/AUTHENTICATE',
    LOGOUT: 'authentication/LOGOUT',
    CLEAR_AUTH: 'authentication/CLEAR_AUTH'
};


const initialState = {
    loading: false,
    isAuthenticated: false,
    loginError: false, // Errors returned from server side
    showModalLogin: false,
    account: {},
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action: any): AuthenticationState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.ACCOUNT):
        case REQUEST(ACTION_TYPES.LOGOUT):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.ACCOUNT):
        case FAILURE(ACTION_TYPES.LOGOUT):
            return {
                ...initialState,
                account: undefined
            };
        case SUCCESS(ACTION_TYPES.AUTHENTICATE): {
            setupAxiosInterceptors( action.payload.data.id_token);
            return {
                ...state,
                loading: false,
                isAuthenticated: true
            };
        }
        case SUCCESS(ACTION_TYPES.ACCOUNT): {
            return {
                ...state,
                loading: false,
                account: action.payload.data,
            };
        }
        case ACTION_TYPES.CLEAR_AUTH:
            return {
                ...state,
                loading: false,
                showModalLogin: true,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

/*
* after authenticating, by existing JWT token
* it gets user details from database for setting a custom UI for each User.
* */
export const getUserAccount = () => async (dispatch: any) => await dispatch({
    type: ACTION_TYPES.ACCOUNT,
    payload: axios.get(ActionUri.account)
});

/*
* Authenticating Users!
* */
export const login = (entity: any) => async (dispatch: any) => {
    await dispatch({
        type: ACTION_TYPES.AUTHENTICATE,
        payload: axios.post(ActionUri.auth, entity)
    });
    await dispatch(getUserAccount());
};
