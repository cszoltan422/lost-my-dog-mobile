import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../components/navigation/lost-my-dog-navigator';

export interface LoginState {
    username: string;
    password: string;
    loading: boolean;
    error: string;
}

export const initialState: LoginState = {
    username: '',
    password: '',
    loading: false,
    error: '',
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setLoginPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setLoginLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        loginSuccess: (state) => {
            state.loading = false;
            state.username = '';
            state.password = '';
            state.error = '';
        },
        loginError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

const loginReducer = loginSlice.reducer;

export const { setLoginUsername, setLoginPassword, setLoginLoading, loginSuccess, loginError } = loginSlice.actions;
export const loginAttempt = createAction<NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>>('login/loginAttempt');
export default loginReducer;