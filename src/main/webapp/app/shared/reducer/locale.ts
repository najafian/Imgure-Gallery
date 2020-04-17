import axios from 'axios';
import {TranslatorContext, Storage, translate} from 'react-jhipster';

export const ACTION_TYPES = {
  SET_LOCALE: 'locale/SET_LOCALE'
};

const initialState = {
  currentLocale: undefined,
  isRtl: undefined
};

export type LocaleState = Readonly<typeof initialState>;

export default (state: LocaleState = initialState, action): LocaleState => {
  if (action.type === ACTION_TYPES.SET_LOCALE) {
    const currentLocale = action.locale;
    if (state.currentLocale !== currentLocale) {
      TranslatorContext.setLocale(currentLocale);
    }
    return {
      isRtl: translate('style.isRtl') === 'true',
      currentLocale
    };
  } else {
    return state;
  }
};

export const setLocale = locale => async dispatch => {
  const response = await axios.get(`i18n/${locale}.json`, {baseURL: ''});
  TranslatorContext.registerTranslations(locale, response.data);
  dispatch({
    type: ACTION_TYPES.SET_LOCALE,
    locale
  });
};
