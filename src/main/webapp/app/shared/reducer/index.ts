import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';
import locale, {LocaleState} from './locale';
import mainOperations, {MainOperations} from "./actions-reducer";

export interface IRootState {
  readonly locale: LocaleState;
  readonly mainOperations: MainOperations
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  locale,
  mainOperations,
  loadingBar,
});

export default rootReducer;
