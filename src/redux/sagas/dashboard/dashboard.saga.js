import { takeLatest, call, select, put } from 'redux-saga/effects';
import SearchLostDogsService from '../../../service/SearchLostDogsService';
import {
    ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
    ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
    ON_DASHBOARD_FETCH_NEW_PAGE,
    ON_DASHBOARD_MOUNTED,
    ON_DASHBOARD_REFRESH_PAGE
} from '../../actions/dashboard/action-types/action.types';
import {
    onDashboardDataFetched,
    onDashboardFetchingNewPage,
    onDashboardLoading,
    onDashboardRefreshing
} from '../../actions/dashboard/action-creators/action.creators';

const CLEAR_DATA_ACTIONS = [
    ON_DASHBOARD_MOUNTED,
    ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
    ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
    ON_DASHBOARD_REFRESH_PAGE
];
const ACTION_TYPE_STATUS_CHANGE_HANDLER = {
    ON_DASHBOARD_MOUNTED: onDashboardLoading,
    ON_DASHBOARD_REFRESH_PAGE: onDashboardRefreshing,
    ON_DASHBOARD_FETCH_NEW_PAGE: onDashboardFetchingNewPage,
    ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM: onDashboardLoading,
    ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM: onDashboardLoading,
}

export function* dashboardFetchActionWatcherSaga() {
    yield takeLatest([
        ON_DASHBOARD_MOUNTED,
        ON_DASHBOARD_REFRESH_PAGE,
        ON_DASHBOARD_FETCH_NEW_PAGE,
        ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
        ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM
    ], dashboardFetchActionSaga);
}

function* dashboardFetchActionSaga(action) {
    const statusChangeHandler = ACTION_TYPE_STATUS_CHANGE_HANDLER[action.type];
    if (statusChangeHandler) {
        yield put(statusChangeHandler());
    }

    try {
        const pagination = yield select((state) => state.dashboard.pagination);
        const searchParameters = yield select((state) => state.dashboard.searchParameters);

        const data = yield call(SearchLostDogsService.searchLostDogs, pagination.currentPage, searchParameters);

        const clearData = CLEAR_DATA_ACTIONS.includes(action.type);
        yield put(onDashboardDataFetched(clearData, data));
    } catch (e) {
        console.log(e);
    }
}