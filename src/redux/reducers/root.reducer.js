import { combineReducers } from 'redux';
import { reducer as appReducer } from './application/application.reducer';

const rootReducer = combineReducers({
    application: appReducer
});

export default rootReducer;