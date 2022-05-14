import ENV from '../environmnent.config';
import axios, {AxiosResponse} from 'axios';

export interface Location {
    longitude: number;
    latitude: number;
}

export interface LostDogSearchParameters {
    radiusInMeters: number;
    searchType: string;
}

export type LostDogStatus = 'LOST' | 'WANDERING' | 'FOUND';

export type ChippedStatus = 'YES' | 'NO' | 'UNKNOWN';

export type LostDogGender = 'UNKNOWN' | 'MALE' | 'FEMALE';

export interface LostDog {
    id: number;
    submittedByUserId: number;
    dogName: string;
    dogBreed: string;
    age: number;
    longitude: number;
    latitude: number;
    dateLost: string;
    contactPhone: string;
    contactEmail: string;
    status: LostDogStatus;
    gender: LostDogGender;
    color: string;
    description: string;
    chippedStatus: ChippedStatus;
    chipNumber: string;
    specialPeculiarities: string;
    city: string;
    countryCode: string;
    avatarFilename: string;
}

export default class SearchLostDogsService {
    static searchLostDogs(page: number, searchParams: LostDogSearchParameters, locationParameters: Location): Promise<LostDog[]> {
        return axios.post<LostDog[]>(
            `${ENV.API_URL}/api/lost-dog/search`,
            {
                longitude: locationParameters.longitude,
                latitude: locationParameters.latitude,
                radius: searchParams.radiusInMeters,
                searchStatus: searchParams.searchType,
                page: page,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
            .then((response: AxiosResponse<LostDog[]>) => response.data);
    }
}