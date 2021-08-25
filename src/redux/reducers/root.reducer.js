import { combineReducers } from 'redux';
import { reducer as appReducer } from './application/application.reducer';
import { reducer as dashboardReducer } from './dashboard/dashboard.reducer';
import { reducer as loginReducer } from './login/login.reducer';
import { reducer as signUpReducer } from './signup/signup.reducer';

const rootReducer = combineReducers({
    application: appReducer,
    dashboard: dashboardReducer,
    login: loginReducer,
    signup: signUpReducer
});

export default rootReducer;