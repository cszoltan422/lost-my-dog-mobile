import { combineReducers } from 'redux';
import { reducer as appReducer } from './application/application.reducer';
import { reducer as dashboardReducer } from './dashboard/dashboard.reducer';

const rootReducer = combineReducers({
    application: appReducer,
    dashboard: dashboardReducer
});

export default rootReducer;