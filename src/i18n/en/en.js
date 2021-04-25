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
    [DASHBOARD_TITLE]: 'Dashboard',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_MINUTES_AGO]: 'minute(s) ago',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_HOURS_AGO]: 'hour(s) ago',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_DAYS_AGO]: 'day(s) ago',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_WEEKS_AGO]: 'week(s) ago',
    [DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]: 'over a month ago',
    [DASHBOARD_LIST_END_REACHED]: 'You\'ve reached the end!',
    [DASHBOARD_SEARCH_PARAMETERS_DISTANCE]: 'Distance',
    [DASHBOARD_SEARCH_LOST_WANDERING_TAB]: 'Lost / Wandering',
    [DASHBOARD_SEARCH_FOUND_TAB]: 'Found',
    [DASHBOARD_DOG_STATUS_LOST]: 'Lost',
    [DASHBOARD_DOG_STATUS_WANDERING]: 'Wandering',
    [DASHBOARD_DOG_STATUS_FOUND]: 'Found'
};