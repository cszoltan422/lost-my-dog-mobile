import ENV from '../environmnent.config';

export default class SearchLostDogsService {
    static searchLostDogs(page, searchParams, locationParameters) {
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
          }).then(response => response.json())
    }
}