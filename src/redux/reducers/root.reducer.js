import { combineReducers } from 'redux';
import { reducer as appReducer } from './application/application.reducer';
import { reducer as homepageReducer } from './homepage/homepage.reducer';

const rootReducer = combineReducers({
    application: appReducer,
    homepage: homepageReducer
});

export default rootReducer;