export default class SearchLostDogsService {
    static searchLostDogs(page, searchParams) {
        return fetch('https://lost-my-dog-staging.herokuapp.com/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjc3pvbHRhbjQyMiIsImV4cCI6MTYyMTE1MjcxMCwiaWF0IjoxNjIwNTQ3OTEwfQ.0XRSMIo8aLyNb50_zxUNr5fdxMYzmbpqBw9gnAVohHc'
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