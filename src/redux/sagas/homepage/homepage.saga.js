import { takeLatest, select, call, put } from 'redux-saga/effects';
import { ON_HOMEPAGE_MOUNTED } from '../../actions/homepage/action-types/action.types';
import { onHomepageLoading, onHomepageDataFetched } from '../../actions/homepage/action-creators/action.creators';
import SearchLostDogsService from '../../../service/SearchLostDogsService';

export function* homepageMountedWatcherSaga() {
    yield takeLatest([ON_HOMEPAGE_MOUNTED], homepageMountedSaga);
}

function* homepageMountedSaga() {
    const homepageInitialized = yield select((state) => state.homepage.homepageInitialized);

    if (!homepageInitialized) {
        yield put(onHomepageLoading());
        const data = yield call(SearchLostDogsService.searchLostDogs);
        yield put(onHomepageDataFetched(data));
    }
}