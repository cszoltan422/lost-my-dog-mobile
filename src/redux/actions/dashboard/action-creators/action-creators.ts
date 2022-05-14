import {
    ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
    ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
    ON_DASHBOARD_DATA_FETCH_ERROR,
    ON_DASHBOARD_DATA_FETCHED,
    ON_DASHBOARD_FETCH_NEW_PAGE, ON_DASHBOARD_FETCHING_NEW_PAGE,
    ON_DASHBOARD_HIDE_ALERT,
    ON_DASHBOARD_LOADING,
    ON_DASHBOARD_MOUNTED, ON_DASHBOARD_REFRESH_PAGE,
    ON_DASHBOARD_REFRESHING, ON_DASHBOARD_RESET_PAGINATION_DRY
} from '../action-types/action-types';
import {LostDog} from '../../../../service/search-lost-dogs-service';

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

export const onDashboardResetPaginationDry = (page: number) => {
    return {
        type: ON_DASHBOARD_RESET_PAGINATION_DRY,
        payload: page
    };
};

export const onDashboardChangeRadiusSearchParam = (radius: number) => {
    return {
        type: ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
        payload: radius
    };
};

export const onDashboardChangeSearchTypeParam = (searchType: string) => {
    return {
        type: ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
        payload: searchType
    };
};

export const onDashboardDataFetched = (clearData: boolean, data: LostDog[]) => {
    return {
        type: ON_DASHBOARD_DATA_FETCHED,
        payload: {
            clearData,
            data
        }
    };
};

export const onDashboardDataFetchError = () => {
    return {
        type: ON_DASHBOARD_DATA_FETCH_ERROR
    };
};

export const onDashboardHideAlert = () => {
    return {
        type: ON_DASHBOARD_HIDE_ALERT
    };
};
