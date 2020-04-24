import {CustomWidgetToast} from '../widgets/toast/CustomWidgetToast';

const toastAct = new CustomWidgetToast();
export const initMainState = {
  toastAction: toastAct
};

export type MainOperations = Readonly<typeof initMainState>;

export default (state: MainOperations = initMainState): MainOperations => state
