import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
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
        result = i18n.t('dashboard.card.submittedTimes.justNow');
    } else if (differenceInMinutes < 60) {
        result = `${differenceInMinutes} ${i18n.t('dashboard.card.submittedTimes.minutesAgo')}`;
    } else if (differenceInHours < 24) {
        result = `${differenceInHours} ${i18n.t('dashboard.card.submittedTimes.hoursAgo')}`;
    } else if (differenceInDays < 7) {
        result = `${differenceInDays} ${i18n.t('dashboard.card.submittedTimes.daysAgo')}`;
    } else if (differenceInWeeks < 4) {
        result = `${differenceInWeeks} ${i18n.t('dashboard.card.submittedTimes.weeksAgo')}`;
    } else {
        result = `${i18n.t('dashboard.card.submittedTimes.monthsAgo')}`;
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
