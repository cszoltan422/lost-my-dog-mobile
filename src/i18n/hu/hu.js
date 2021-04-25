import {
    DASHBOARD_DOG_STATUS_FOUND,
    DASHBOARD_DOG_STATUS_LOST, DASHBOARD_DOG_STATUS_WANDERING,
    DASHBOARD_LIST_END_REACHED,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_DAYS_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_HOURS_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_MINUTES_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_WEEKS_AGO, DASHBOARD_SEARCH_FOUND_TAB,
    DASHBOARD_SEARCH_LOST_WANDERING_TAB,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE,
    DASHBOARD_TITLE
} from "../i18n.keys";

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
    [DASHBOARD_SEARCH_FOUND_TAB]: 'Megtalált',
    [DASHBOARD_DOG_STATUS_LOST]: 'Elveszett',
    [DASHBOARD_DOG_STATUS_WANDERING]: 'Kóbor',
    [DASHBOARD_DOG_STATUS_FOUND]: 'Megtalált'
};