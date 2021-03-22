import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from './en/en';
import hu from './hu/hu';

i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = {
    en,
    hu
};

export default i18n;