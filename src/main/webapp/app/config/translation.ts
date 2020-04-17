import { TranslatorContext, Storage } from 'react-jhipster';
import {setLocale} from 'app/shared/reducer/locale';


TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  en: { name: 'English' },
  de: { name: 'Deutsch' },
  tr: { name: 'Türkçe' }
};

export const locales = Object.keys(languages).sort();

export const registerLocale = store => {
  store.dispatch(setLocale(Storage.session.get('locale', 'en')));
};
