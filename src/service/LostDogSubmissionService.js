import ENV from '../environmnent.config';

export default class LostDogSubmissionService {
    static submitLostDog(token, submissionRequest) {
        return fetch(`${ENV.API_URL}/api/lost-dog/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...submissionRequest
            })
        }).then(response => response.json());
    }

    static updateLostDog(token, updateRequest) {
        return fetch(`${ENV.API_URL}/api/lost-dog/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...updateRequest
            })
        }).then(response => response.json());
    }
}