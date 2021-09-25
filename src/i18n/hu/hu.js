import {
    DASHBOARD_DOG_STATUS_FOUND,
    DASHBOARD_DOG_STATUS_LOST,
    DASHBOARD_DOG_STATUS_WANDERING,
    DASHBOARD_LIST_END_REACHED,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_DAYS_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_HOURS_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_MINUTES_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_WEEKS_AGO,
    DASHBOARD_SEARCH_FOUND_TAB,
    DASHBOARD_SEARCH_LOST_WANDERING_TAB,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE,
    DASHBOARD_TITLE,
    DETAILS_CALL_OWNER,
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_AGE_YEARS,
    DETAILS_DOG_BREED_LABEL_TITLE,
    DETAILS_DOG_CHIP_NUMBER,
    DETAILS_DOG_CITY_LABEL_TITLE,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_DATE_LOST_LABEL_TITLE,
    DETAILS_DOG_DESCRIPTION_LABEL_TITLE,
    DETAILS_DOG_HAS_CHIP, DETAILS_DOG_HAS_CHIP_NO, DETAILS_DOG_HAS_CHIP_UNKNOWN,
    DETAILS_DOG_HAS_CHIP_YES,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_FEMALE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_SEX_MALE,
    DETAILS_DOG_STATUS_LABEL_TITLE, DETAILS_INPUT_REQUIRED,
    DETAILS_MAP_VIEW_MARKER_TITLE,
    DETAILS_SEND_MESSAGE, DETAILS_SUBMIT_BUTTON_TITLE,
    EMAIL_EXISTS,
    LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION,
    LOCATION_PERMISSION_ASK_DESCRIPTION,
    LOCATION_PERMISSION_BUTTON_TITLE,
    LOCATION_PERMISSION_DENIED_BUTTON_TITLE,
    LOCATION_PERMISSION_DENIED_TITLE,
    LOCATION_PERMISSION_TITLE, LOCATION_PICKER_CURRENT_COORDINATES, LOCATION_PICKER_INFO_DESCRIPTION,
    LOGIN_EMPTY_PASSWORD_OR_USERNAME,
    LOGIN_FORGOT_PASSWORD_PLACEHOLDER,
    LOGIN_LOGIN_TEXT,
    LOGIN_PASSWORD_PLACEHOLDER,
    LOGIN_SIGN_UP_TEXT,
    LOGIN_USERNAME_PLACEHOLDER,
    LOGIN_WRONG_PASSWORD_OR_USERNAME,
    SIGN_UP_SCREEN_TITLE,
    SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER,
    SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR,
    SIGNUP_EMAIL_PLACEHOLDER,
    SIGNUP_EMAIL_VALIDATION_ERROR,
    SIGNUP_FIRST_NAME_PLACEHOLDER,
    SIGNUP_FIRST_NAME_VALIDATION_ERROR,
    SIGNUP_LAST_NAME_PLACEHOLDER,
    SIGNUP_LAST_NAME_VALIDATION_ERROR,
    SIGNUP_NAME_ORDER,
    SIGNUP_PASSWORD_PLACEHOLDER,
    SIGNUP_PASSWORD_VALIDATION_ERROR,
    SIGNUP_USERNAME_PLACEHOLDER,
    SIGNUP_USERNAME_VALIDATION_ERROR,
    SUBMIT_DOG_TITLE,
    USER_NAME_EXISTS
} from '../i18n.keys';
import {SIGNUP_SCREEN_NAME_ORDER_LAST} from '../../application.constants';

export default {
    [DASHBOARD_TITLE]: 'Kezdőoldal',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_MINUTES_AGO]: 'perce',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_HOURS_AGO]: 'órája',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_DAYS_AGO]: 'napja',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_WEEKS_AGO]: 'hete',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]: 'több mint egy hónapja',
    [DASHBOARD_LIST_END_REACHED]: 'Elérted a lista végét!',
    [DASHBOARD_SEARCH_PARAMETERS_DISTANCE]: 'Távolság',
    [DASHBOARD_SEARCH_LOST_WANDERING_TAB]: 'Elveszett / Kóbor',
    [DASHBOARD_SEARCH_FOUND_TAB]: 'Talált',
    [DASHBOARD_DOG_STATUS_LOST]: 'Elveszett',
    [DASHBOARD_DOG_STATUS_WANDERING]: 'Kóbor',
    [DASHBOARD_DOG_STATUS_FOUND]: 'Talált',
    [DETAILS_DOG_DESCRIPTION_LABEL_TITLE]: 'Leírás',
    [DETAILS_DOG_NAME_LABEL_TITLE]: 'Név',
    [DETAILS_DOG_BREED_LABEL_TITLE]: 'Fajta',
    [DETAILS_DOG_SEX_LABEL_TITLE]: 'Nem',
    [DETAILS_DOG_COLOR_LABEL_TITLE]: 'Szín',
    [DETAILS_DOG_STATUS_LABEL_TITLE]: 'Státusz',
    [DETAILS_DOG_AGE_LABEL_TITLE]: 'Kor',
    [DETAILS_DOG_AGE_YEARS]: 'éves',
    [DETAILS_DOG_HAS_CHIP]: 'Chippelt',
    [DETAILS_DOG_CHIP_NUMBER]: 'Chip #',
    [DETAILS_DOG_CITY_LABEL_TITLE]: 'Város',
    [DETAILS_DOG_DATE_LOST_LABEL_TITLE]: 'Dátum',
    [DETAILS_DOG_SEX_MALE]: 'Hím',
    [DETAILS_DOG_SEX_FEMALE]: 'Nőstény',
    [DETAILS_DOG_HAS_CHIP_YES]: 'Igen',
    [DETAILS_DOG_HAS_CHIP_NO]: 'Nem',
    [DETAILS_DOG_HAS_CHIP_UNKNOWN]: 'Nem tudni',
    [DETAILS_SEND_MESSAGE]: 'Üzenet küldése',
    [DETAILS_CALL_OWNER]: 'Gazdi hívása',
    [DETAILS_MAP_VIEW_MARKER_TITLE]: 'Utolsó ismert tartózkodás',
    [LOCATION_PERMISSION_TITLE]: 'Helymeghatarozás engedélyezése',
    [LOCATION_PERMISSION_BUTTON_TITLE]: 'Engedély megadása',
    [LOCATION_PERMISSION_ASK_DESCRIPTION]: 'A Helymeghatarozás funkció szükséges a közelben levő megosztások megjelenítéséhez és az új megosztások megjelenítéséhez. Az alkalmazás használatának megkezdéséhez nyomja meg a „Hely engedélyezése” gombot. Ha nem működik, kérjük, látogassa meg az eszköz beállításait, és engedélyezze az alkalmazás hozzáférését a Helymeghatarozás funkcióhoz.',
    [LOCATION_PERMISSION_DENIED_TITLE]: 'Hoppá',
    [LOCATION_PERMISSION_DENIED_BUTTON_TITLE]: 'Beallitások megnyitása',
    [LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION]: 'Az alkalmazás működéséhez szükséges Helymeghatarozás funkció. Nyomja meg a „Beállítások megnyitása” gombot, és engedélyezze a helymeghatározási funkciót ehhez az alkalmazáshoz.',
    [LOGIN_USERNAME_PLACEHOLDER]: 'Felhasználónév...',
    [LOGIN_PASSWORD_PLACEHOLDER]: 'Jelszó...',
    [LOGIN_FORGOT_PASSWORD_PLACEHOLDER]: 'Elfelejtetted a jelszavad?',
    [LOGIN_LOGIN_TEXT]: 'Bejelentkezés',
    [LOGIN_SIGN_UP_TEXT]: 'Regisztráció',
    [LOGIN_EMPTY_PASSWORD_OR_USERNAME]: 'A felhasználónév vagy a jelszó üres',
    [LOGIN_WRONG_PASSWORD_OR_USERNAME]: 'Hibás felhasználónév vagy a jelszó!',
    [SUBMIT_DOG_TITLE]: 'Elveszett kutya jelentése',
    [SIGN_UP_SCREEN_TITLE]: 'Regisztráció',
    [SIGNUP_USERNAME_PLACEHOLDER]: 'Felhasználónév',
    [SIGNUP_PASSWORD_PLACEHOLDER]: 'Jelszó',
    [SIGNUP_CONFIRM_PASSWORD_PLACEHOLDER]: 'Jelszó megerősítése',
    [SIGNUP_EMAIL_PLACEHOLDER]: 'Email',
    [SIGNUP_FIRST_NAME_PLACEHOLDER]: 'Keresztnév',
    [SIGNUP_LAST_NAME_PLACEHOLDER]: 'Vezetéknév',
    [SIGNUP_NAME_ORDER]: SIGNUP_SCREEN_NAME_ORDER_LAST,
    [SIGNUP_USERNAME_VALIDATION_ERROR]: 'Olyan felhasználónevet válasszon ami legalább 5 karakter hosszú és az angol abc karaktereiből vagy számokból áll.',
    [SIGNUP_PASSWORD_VALIDATION_ERROR]: 'Kérjük adjon meg egy megfelelő jelszót. A jelszónak legalább:\n\t* 8 karakter hosszúnak kell lennie\n\t* tartalmaznia kell legalább egy számot\n\t* kisbetűkből és nagybetűkből kell hogy álljon.',
    [SIGNUP_CONFIRM_PASSWORD_VALIDATION_ERROR]: 'A jelszavak nem egyeznek.',
    [SIGNUP_EMAIL_VALIDATION_ERROR]: 'Kérjük adjon meg egy megfelelő email címet.',
    [SIGNUP_FIRST_NAME_VALIDATION_ERROR]: 'Kérjük adja meg a keresztnevét',
    [SIGNUP_LAST_NAME_VALIDATION_ERROR]: 'Kérjük adja meg a vezetéknevét',
    [USER_NAME_EXISTS]: 'A felhasználónév foglalt',
    [EMAIL_EXISTS]: 'A jelszó foglalt',
    [LOCATION_PICKER_INFO_DESCRIPTION]: 'Koppints a térképre, hogy a kutya utolsó ismert tartózkodási helyét megváltoztasd!',
    [LOCATION_PICKER_CURRENT_COORDINATES]: 'Jelenlegi koordináták: ',
    [DETAILS_SUBMIT_BUTTON_TITLE]: 'Küldés',
    [DETAILS_INPUT_REQUIRED]: 'Ez a mező nem lehet üres'
};
// á é í ú ü ű ó ő