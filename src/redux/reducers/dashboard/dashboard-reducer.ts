import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    DASHBOARD_INITIAL_SEARCH_DISTANCE_IN_METERS,
    DASHBOARD_LIST_PAGE_SIZE, DASHBOARD_SEARCH_TYPE_LOST
} from '../../../application.constants';
import {LostDog, LostDogSearchParameters} from '../../../service/search-lost-dogs-service';

export interface Pagination {
    currentPage: number;
}

export interface DashboardError {
    show: boolean;
}

export interface DashboardState {
    dataFetched: boolean;
    loading: boolean;
    refreshing: boolean;
    fetchingNew: boolean;
    hasNoMoreData: boolean;
    pagination: Pagination,
    searchParameters: LostDogSearchParameters,
    data: LostDog[],
    error: DashboardError
}

export interface DashboardSetDataPayload {
    clearData: boolean;
    data: LostDog[];
}

export const initialState: DashboardState = {
    dataFetched: false,
    loading: false,
    refreshing: false,
    fetchingNew: false,
    hasNoMoreData: false,
    pagination: {
        currentPage: 0
    },
    searchParameters: {
        radiusInMeters: DASHBOARD_INITIAL_SEARCH_DISTANCE_IN_METERS,
        searchType: DASHBOARD_SEARCH_TYPE_LOST
    },
    data: [],
    error: {
        show: false,
    }
};

const dashboardSlice = createSlice({
   name: 'dashboard',
   initialState,
   reducers: {
       setDashboardLoading: (state, action: PayloadAction<boolean>) => {
           state.loading = action.payload;
       },
       setDashboardPage: (state, action: PayloadAction<number>) => {
           state.pagination.currentPage = action.payload;
       },
       setDashboardRefreshing: (state, action: PayloadAction<boolean>) => {
           state.refreshing = action.payload;
       },
       setDashboardFetchingNew: (state, action: PayloadAction<boolean>) => {
           state.fetchingNew = action.payload;
       },
       dashboardIncrementPage: (state) => {
           state.pagination = {
               currentPage: state.pagination.currentPage + 1
           };
       },
       setDashboardSearchRadius: (state, action: PayloadAction<number>) => {
           state.searchParameters.radiusInMeters = action.payload;
           state.pagination.currentPage = 0;
       },
       setDashboardSearchType: (state, action: PayloadAction<string>) => {
           state.searchParameters.searchType = action.payload;
           state.pagination.currentPage = 0;
       },
       dashboardDataFetched: (state, action: PayloadAction<DashboardSetDataPayload>) => {
           state.dataFetched = true;
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
       setDashboardShowError: (state, action: PayloadAction<boolean>) => {
           state.error.show = action.payload;
       }
   }
});

const dashboardReducer = dashboardSlice.reducer;

export const {
    setDashboardLoading,
    setDashboardPage,
    setDashboardRefreshing,
    setDashboardFetchingNew,
    dashboardIncrementPage,
    setDashboardSearchRadius,
    setDashboardSearchType,
    dashboardDataFetched,
    setDashboardShowError
} = dashboardSlice.actions;
export const dashboardMounted = createAction('dashboard/dashboardMounted');
export default dashboardReducer;