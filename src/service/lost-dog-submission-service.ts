import ENV from '../environmnent.config';
import {ChippedStatus, LostDogGender, LostDogStatus} from './search-lost-dogs-service';
import axios, {AxiosResponse} from 'axios';

export interface LostDogSubmissionResult {
    id: number;
    message: string;
}

export interface LostDogSubmissionRequest {
    id?: number;
    dateLost?: string;
    description: string;
    dogName: string;
    dogBreed: string;
    age: string;
    gender: LostDogGender;
    color: string;
    status: LostDogStatus;
    chippedStatus: ChippedStatus;
    chipNumber: string;
    contactPhone: string;
    contactEmail: string;
    longitude: number;
    latitude: number;
    base64Content: string;
    avatarImageType: string;
    specialPeculiarities: string;
}

export type LostDogUpdateResult = LostDogSubmissionResult;

export default class LostDogSubmissionService {
    static submitLostDog(token: string, submissionRequest: LostDogSubmissionRequest): Promise<LostDogSubmissionResult> {
        return axios.post(
            `${ENV.API_URL}/api/lost-dog/submit`,
            submissionRequest,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )
            .then((response: AxiosResponse<LostDogSubmissionResult>) => response.data);
    }

    static updateLostDog(token: string, updateRequest: LostDogSubmissionRequest): Promise<LostDogUpdateResult> {
        return axios.post(
            `${ENV.API_URL}/api/lost-dog/update`,
            updateRequest,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )
            .then((response: AxiosResponse<LostDogUpdateResult>) => response.data);
    }
}