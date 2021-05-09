export default class SearchLostDogsService {
    static searchLostDogs(page, searchParams) {
        return fetch('https://lost-my-dog-staging.herokuapp.com/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjc3pvbHRhbjQyMiIsImV4cCI6MTYyMDU0OTE3OCwiaWF0IjoxNjE5OTQ0Mzc4fQ.3-fIXQ2jA1SnnP7ZmijBzSpmN75MlBu5FmYZ-S-ArX0'
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