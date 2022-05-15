import { combineReducers } from 'redux';
import applicationReducer from './application/application-reducer';
import dashboardReducer from './dashboard/dashboard-reducer';
import loginReducer from './login/login-reducer';
import { reducer as signUpReducer } from './signup/signup-reducer';
import { reducer as submitFormReducer } from './submit-form/submit-form-reducer';
import {enableMapSet} from 'immer';

enableMapSet();

const rootReducer = combineReducers({
    application: applicationReducer,
    dashboard: dashboardReducer,
    login: loginReducer,
    signup: signUpReducer,
    submitForm: submitFormReducer
});

export default rootReducer;