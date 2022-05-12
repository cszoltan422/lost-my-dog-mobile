import ENV from '../environmnent.config';

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
    static searchLostDogs(page: number, searchParams: LostDogSearchParameters, locationParameters: Location) {
        return fetch(`${ENV.API_URL}/api/lost-dog/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                longitude: locationParameters.longitude,
                latitude: locationParameters.latitude,
                radius: searchParams.radiusInMeters,
                searchStatus: searchParams.searchType,
                page: page,
              })
          }).then(response => response.json());
    }
}