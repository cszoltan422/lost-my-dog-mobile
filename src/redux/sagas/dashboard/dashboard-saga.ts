import {takeLatest, call, select, put, delay} from 'redux-saga/effects';
import SearchLostDogsService, {LostDog, LostDogSearchParameters} from '../../../service/search-lost-dogs-service';
import {
    ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
    ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
    ON_DASHBOARD_FETCH_NEW_PAGE,
    ON_DASHBOARD_MOUNTED,
    ON_DASHBOARD_REFRESH_PAGE
} from '../../actions/dashboard/action-types/action-types';
import {
    onDashboardDataFetched,
    onDashboardFetchingNewPage,
    onDashboardLoading,
    onDashboardRefreshing,
    onDashboardResetPaginationDry,
    onDashboardDataFetchError
} from '../../actions/dashboard/action-creators/action-creators';
import {ON_SUBMIT_FORM_SUBMIT_SUCCESS} from '../../actions/submit-form/action-types/action-types';
import {Action, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {Pagination} from '../../reducers/dashboard/dashboard-reducer';
import {ApplicationLocation} from '../../reducers/application/application-reducer';

const CLEAR_DATA_ACTIONS = [
    ON_DASHBOARD_MOUNTED,
    ON_DASHBOARD_REFRESH_PAGE,
    ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
    ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
    ON_SUBMIT_FORM_SUBMIT_SUCCESS
];

const ACTION_TYPE_STATUS_CHANGE_HANDLER = new Map<string, {(): Action}[]>([
    [
        ON_DASHBOARD_MOUNTED,
        [onDashboardLoading]
    ],
    [
        ON_DASHBOARD_REFRESH_PAGE,
        [onDashboardRefreshing]
    ],
    [
        ON_DASHBOARD_FETCH_NEW_PAGE,
        [onDashboardFetchingNewPage]
    ],
    [
        ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
        [onDashboardLoading]
    ],
    [
        ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
        [onDashboardLoading]
    ],
    [
        ON_SUBMIT_FORM_SUBMIT_SUCCESS,
        [onDashboardLoading, () => onDashboardResetPaginationDry(0)]
    ]
]);

export function* dashboardFetchActionWatcherSaga() {
    yield takeLatest([
        ON_DASHBOARD_MOUNTED,
        ON_DASHBOARD_REFRESH_PAGE,
        ON_DASHBOARD_FETCH_NEW_PAGE,
        ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
        ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM,
        ON_SUBMIT_FORM_SUBMIT_SUCCESS
    ], dashboardFetchActionSaga);
}

function* dashboardFetchActionSaga(action: PayloadAction) {
    const statusChangeHandlers = ACTION_TYPE_STATUS_CHANGE_HANDLER.get(action.type);
    if (statusChangeHandlers) {
        for (let i = 0; i < statusChangeHandlers.length; i = i + 1) {
            yield put(statusChangeHandlers[i]());
        }
    }

    const pagination: Pagination = yield select((state: RootState) => state.dashboard.pagination);
    const searchParameters: LostDogSearchParameters = yield select((state: RootState) => state.dashboard.searchParameters);
    let currentLocation: ApplicationLocation = yield select((state: RootState) => state.application.location);
    if (!currentLocation.isPresent) {
        while (!currentLocation.isPresent) {
            yield delay(1000);
            currentLocation = yield select((state) => state.application.location);
        }
    }
    const locationParameters = {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude
    };

    try {
        const result: LostDog[] = yield call(SearchLostDogsService.searchLostDogs, pagination.currentPage, searchParameters, locationParameters);
        const clearData = CLEAR_DATA_ACTIONS.includes(action.type);
        yield put(onDashboardDataFetched(clearData, result));
    } catch (error) {
        yield put(onDashboardDataFetchError());
    }
}