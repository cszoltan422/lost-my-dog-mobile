import ENV from '../environmnent.config';
import axios, {AxiosResponse} from 'axios';

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResult {
    userName: string;
    token: string;
}

export interface UserDetails {
    id: number;
    userName: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    creationDate: string;
    lastLoginTime?: string;
    roles: string[];
    locked: boolean;
}

export interface SignupRequest {
    userName: string;
    password: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
}

export interface SignupResult {
    userName: string;
    success: boolean;
}

export default class UserService {
    static login(loginRequest: LoginRequest): Promise<LoginResult> {
        return axios.post<LoginResult>(
            `${ENV.API_URL}/api/login`,
            loginRequest,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
            .then((response: AxiosResponse<LoginResult>) => response.data);
    }

    static fetchUserDetails(token: string): Promise<UserDetails> {
        return axios.get(`${ENV.API_URL}/api/user/details`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((result: AxiosResponse<UserDetails>) => result.data);
    }

    static signup(signupRequest: SignupRequest): Promise<SignupResult> {
        return axios.post(
            `${ENV.API_URL}/api/register`,
            signupRequest,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
            .then((result: AxiosResponse<SignupResult>) => result.data);
    }
}