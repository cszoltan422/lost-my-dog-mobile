import ENV from '../environmnent.config';

export default class UserService {
    static login(username, password) {
        return fetch(`${ENV.API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                password: password
            })
        }).then(response => response.json())
    }

    static fetchUserDetails(token) {
        return fetch(`${ENV.API_URL}/api/user/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
    }
}