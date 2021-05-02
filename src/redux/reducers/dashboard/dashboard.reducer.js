import { createReducer } from '@reduxjs/toolkit';
import {
    ON_DASHBOARD_LOADING,
    ON_DASHBOARD_DATA_FETCHED,
    ON_DASHBOARD_REFRESHING,
    ON_DASHBOARD_FETCHING_NEW_PAGE,
    ON_DASHBOARD_DATA_FETCH_ERROR,
    ON_DASHBOARD_HIDE_ALERT,
    ON_DASHBOARD_REFRESH_PAGE,
    ON_DASHBOARD_FETCH_NEW_PAGE,
    ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM,
    ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM
} from '../../actions/dashboard/action-types/action.types';
import {
    DASHBOARD_INITIAL_SEARCH_DISTANCE_IN_METERS,
    DASHBOARD_INITIAL_SEARCH_TYPE,
    DASHBOARD_LIST_PAGE_SIZE, DASHBOARD_SEARCH_TYPES
} from '../../../application.constants';

export const initialState = {
    loading: false,
    refreshing: false,
    fetchingNew: false,
    hasNoMoreData: false,
    pagination: {
        currentPage: 0
    },
    searchParameters: {
        radiusInMeters: DASHBOARD_INITIAL_SEARCH_DISTANCE_IN_METERS,
        searchType: DASHBOARD_SEARCH_TYPES[DASHBOARD_INITIAL_SEARCH_TYPE]
    },
    data: [],
    error: {
        code: '',
        message: '',
        show: false,
    }
};

export const reducer = createReducer(initialState, {
    [ON_DASHBOARD_LOADING]: (state) => {
        state.loading = true;
    },
    [ON_DASHBOARD_REFRESH_PAGE]: (state) => {
        state.pagination.currentPage = 0;
    },
    [ON_DASHBOARD_REFRESHING]: (state) => {
        state.refreshing = true;
    },
    [ON_DASHBOARD_FETCH_NEW_PAGE]: (state) => {
        state.pagination = {
            currentPage: state.pagination.currentPage + 1
        }
    },
    [ON_DASHBOARD_FETCHING_NEW_PAGE]: (state) => {
        state.fetchingNew = true;
    },
    [ON_DASHBOARD_CHANGE_RADIUS_SEARCH_PARAM]: (state, action) => {
        state.searchParameters.radiusInMeters = action.payload;
        state.pagination.currentPage = 0;
    },
    [ON_DASHBOARD_CHANGE_SEARCH_TYPE_PARAM]: (state, action) => {
        state.searchParameters.searchType = action.payload;
        state.pagination.currentPage = 0;
    },
    [ON_DASHBOARD_DATA_FETCHED]: (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.fetchingNew = false;
        state.hasNoMoreData = action.payload.data.length < DASHBOARD_LIST_PAGE_SIZE;
        if (action.payload.clearData) {
            state.data = [...action.payload.data];
        } else {
            state.data = [...state.data, ...action.payload.data];
        }
    },
    [ON_DASHBOARD_DATA_FETCH_ERROR]: (state, action) => {
        state.error = {
            show: true,
            code: action.payload.code,
            message: action.payload.message
        };
    },
    [ON_DASHBOARD_HIDE_ALERT]: (state) => {
        state.error.show = false;
    }
});