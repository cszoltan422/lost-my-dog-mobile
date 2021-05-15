export default class SearchLostDogsService {
    static searchLostDogs(page, searchParams) {
        return fetch('http://localhost:8080/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                longitude: 19.137403,
                latitude: 47.45742,
                radius: searchParams.radiusInMeters,
                searchStatus: searchParams.searchType,
                page: page,
              })
          }).then(response => response.json())
    }
}