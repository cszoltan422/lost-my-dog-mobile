import {takeLatest, call, select, put, delay} from 'redux-saga/effects';
import SearchLostDogsService, {LostDog, LostDogSearchParameters} from '../../../service/search-lost-dogs-service';
import {ON_SUBMIT_FORM_SUBMIT_SUCCESS} from '../../actions/submit-form/action-types/action-types';
import {Action, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {
    dashboardDataFetched, dashboardIncrementPage, dashboardMounted,
    Pagination, setDashboardFetchingNew,
    setDashboardLoading,
    setDashboardPage,
    setDashboardRefreshing, setDashboardSearchRadius, setDashboardSearchType, setDashboardShowError
} from '../../reducers/dashboard/dashboard-reducer';
import {ApplicationLocation} from '../../reducers/application/application-reducer';

const CLEAR_DATA_ACTIONS = [
    dashboardMounted.type,
    setDashboardPage.type,
    setDashboardSearchRadius.type,
    setDashboardSearchType.type,
    ON_SUBMIT_FORM_SUBMIT_SUCCESS
];

const ACTION_TYPE_STATUS_CHANGE_HANDLER = new Map<string, {(): Action}[]>([
    [
        dashboardMounted.type,
        [() => setDashboardLoading(true)]
    ],
    [
        setDashboardPage.type,
        [() => setDashboardRefreshing(true)]
    ],
    [
        dashboardIncrementPage.type,
        [() => setDashboardFetchingNew(true)]
    ],
    [
        setDashboardSearchRadius.type,
        [() => setDashboardLoading(true)]
    ],
    [
        setDashboardSearchType.type,
        [() => setDashboardLoading(true)]
    ],
    [
        ON_SUBMIT_FORM_SUBMIT_SUCCESS,
        [() => setDashboardLoading(true), () => setDashboardPage(0)]
    ]
]);

export function* dashboardFetchActionWatcherSaga() {
    yield takeLatest([
        dashboardMounted.type,
        setDashboardPage.type,
        dashboardIncrementPage.type,
        setDashboardSearchRadius.type,
        setDashboardSearchType.type,
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
        yield put(dashboardDataFetched({
            clearData: clearData,
            data: result
        }));
    } catch (error) {
        yield put(setDashboardLoading(false));
        yield put(setDashboardShowError(true));
    }
}