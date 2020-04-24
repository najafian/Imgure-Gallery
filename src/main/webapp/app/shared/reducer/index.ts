import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';
import locale, {LocaleState} from './locale';
import mainOperations, {MainOperations} from './actions-reducer';
import authentication, {AuthenticationState}  from 'app/component/authentication/react-redux/authentication-action';
import galleryReduxState,{GalleryReduxState} from 'app/component/imgur-gallery/react-redux/imgur-action';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly mainOperations: MainOperations;
  readonly loadingBar: any;
  readonly galleryReduxState:GalleryReduxState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  mainOperations,
  loadingBar,
  galleryReduxState
});

export default rootReducer;
