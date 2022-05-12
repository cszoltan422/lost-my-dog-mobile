import ENV from '../environmnent.config';

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResult {
    userName: string;
    token: string;
}

export interface AppUser {
    id: number;
    userName: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    creationDate: string;
    lastLoginTime?: string;
    roles: Set<string>;
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
    static login(loginRequest: LoginRequest) {
        return fetch(`${ENV.API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        }).then(response => response.json());
    }

    static fetchUserDetails(token: string) {
        return fetch(`${ENV.API_URL}/api/user/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json());
    }

    static signup(signupRequest: SignupRequest) {
        return fetch(`${ENV.API_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupRequest)
        }).then(response => response.json());
    }
}