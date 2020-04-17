import {CustomWidgetToast} from "../widgets/toast/CustomWidgetToast";

const initialState = {
    toastAction: new CustomWidgetToast()
};

export type MainOperations = Readonly<typeof initialState>;

export default (state: MainOperations = initialState): MainOperations => state