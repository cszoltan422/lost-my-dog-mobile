import ENV from '../environmnent.config';
import {ChippedStatus, LostDogGender, LostDogStatus} from './search-lost-dogs-service';

export interface LostDogSubmissionRequest {
    dogName: string;
    dogBreed: string;
    age: number;
    gender: LostDogGender;
    color: string;
    contactPhone: string;
    contactEmail: string;
    description: string;
    longitude: number;
    latitude: number;
    dateLost: string;
    status: LostDogStatus;
    base64Content: string;
    avatarImageType: string;
    chippedStatus: ChippedStatus;
    chipNumber: string;
    specialPeculiarities: string;
}

export interface LostDogSubmissionResult {
    id: number;
    message: string;
}

export interface LostDogUpdateRequest {
    id: number;
    dogName?: string;
    dogBreed?: string;
    age?: number;
    gender?: LostDogGender;
    color?: string;
    contactPhone?: string;
    contactEmail?: string;
    description?: string;
    longitude?: number;
    latitude?: number;
    dateLost?: string;
    status?: LostDogStatus;
    base64Content?: string;
    avatarImageType?: string;
    chippedStatus?: ChippedStatus;
    chipNumber?: string;
    specialPeculiarities?: string;
}

export type LostDogUpdateResult = LostDogSubmissionResult;

export default class LostDogSubmissionService {
    static submitLostDog(token: string, submissionRequest: LostDogSubmissionRequest) {
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

    static updateLostDog(token: string, updateRequest: LostDogUpdateRequest) {
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