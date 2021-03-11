import { createReducer } from '@reduxjs/toolkit';
import { ON_HOMEPAGE_LOADING, ON_HOMEPAGE_DATA_FETCHED } from '../../actions/homepage/action-types/action.types';
import handleHomepageLoading from './handler/handleHomepageLoading';
import handleHomepageDataFetched from './handler/handleHomepageDataFetched';

export const initialState = {
    homepageInitialized: false,
    homepageLoading: false,
    homepageData: []
};

export const reducer = createReducer(initialState, {
    [ON_HOMEPAGE_LOADING]: (state) => {
        handleHomepageLoading(state);
    },
    [ON_HOMEPAGE_DATA_FETCHED]: (state, action) => {
        handleHomepageDataFetched(state, action);
    }
});