import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
import {
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_DAYS_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_HOURS_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_MINUTES_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_WEEKS_AGO, DASHBOARD_LIST_ITEM_DISAPPEARED_JUST_NOW
} from '../../i18n/i18n.keys';
import i18n from '../../i18n/i18n';

export const getTimeDifferenceString = (timeFromString) => {
    const timeFrom = moment.utc(timeFromString).local();
    const timeTo = moment.tz(moment(), Localization.timezone);

    const difference = moment.duration(timeTo.diff(timeFrom));
    const differenceInMinutes = Math.floor(difference.asMinutes());
    const differenceInHours = Math.floor(difference.asHours());
    const differenceInDays = Math.floor(difference.asDays());
    const differenceInWeeks = Math.floor(difference.asWeeks());

    let result;
    if (differenceInMinutes < 5) {
        result = i18n.t(DASHBOARD_LIST_ITEM_DISAPPEARED_JUST_NOW);
    } else if (differenceInMinutes < 60) {
        result = `${differenceInMinutes} ${i18n.t(DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_MINUTES_AGO)}`;
    } else if (differenceInHours < 24) {
        result = `${differenceInHours} ${i18n.t(DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_HOURS_AGO)}`;
    } else if (differenceInDays < 7) {
        result = `${differenceInDays} ${i18n.t(DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_DAYS_AGO)}`;
    } else if (differenceInWeeks < 4) {
        result = `${differenceInWeeks} ${i18n.t(DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_WEEKS_AGO)}`;
    } else {
        result = `${i18n.t(DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO)}`;
    }

    return result;

};

export const formatIsoTime = (isoTimeString) => {
    const timeInLocalTimezone = moment.utc(isoTimeString).local();
    return timeInLocalTimezone.format('YYYY. MM. DD, HH:mm');
};

export const getCurrentTimeWithTimezone = () => {
    return moment().tz(Localization.timezone).format();
};
