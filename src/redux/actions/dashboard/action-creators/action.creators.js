import {
    ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
    ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
    ON_DASHBOARD_DATA_FETCH_ERROR,
    ON_DASHBOARD_DATA_FETCHED,
    ON_DASHBOARD_FETCH_NEW_PAGE, ON_DASHBOARD_FETCHING_NEW_PAGE,
    ON_DASHBOARD_HIDE_ALERT,
    ON_DASHBOARD_LOADING,
    ON_DASHBOARD_MOUNTED, ON_DASHBOARD_REFRESH_PAGE,
    ON_DASHBOARD_REFRESHING
} from '../action-types/action.types';

export const onDashboardMounted = () => {
    return {
        type: ON_DASHBOARD_MOUNTED
    };
};

export const onDashboardLoading = () => {
    return {
        type: ON_DASHBOARD_LOADING
    };
};

export const onDashboardRefreshPage = () => {
    return {
        type: ON_DASHBOARD_REFRESH_PAGE
    };
};

export const onDashboardRefreshing = () => {
    return {
        type: ON_DASHBOARD_REFRESHING
    };
};

export const onDashboardFetchNewPage = () => {
    return {
        type: ON_DASHBOARD_FETCH_NEW_PAGE
    };
};

export const onDashboardFetchingNewPage = () => {
    return {
        type: ON_DASHBOARD_FETCHING_NEW_PAGE
    };
};

export const onDashboardChangeRadiusSearchParam = (radius) => {
    return {
        type: ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
        payload: radius
    };
};

export const onDashboardChangeSearchTypeParam = (searchType) => {
    return {
        type: ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
        payload: searchType
    };
};

export const onDashboardDataFetched = (clearData, data) => {
    return {
        type: ON_DASHBOARD_DATA_FETCHED,
        payload: {
            clearData,
            data
        }
    };
};

export const onDashboardDataFetchError = (error) => {
    return {
        type: ON_DASHBOARD_DATA_FETCH_ERROR,
        payload: error
    };
};

export const onDashboardHideAlert = () => {
    return {
        type: ON_DASHBOARD_HIDE_ALERT
    };
};
