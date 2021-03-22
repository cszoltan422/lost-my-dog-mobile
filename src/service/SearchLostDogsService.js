export default class SearchLostDogsService {
    static searchLostDogs() {
        return fetch('https://lost-my-dog-staging.herokuapp.com/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjc3pvbHRhbjQyMiIsImV4cCI6MTYxNzAzNzE5OCwiaWF0IjoxNjE2NDMyMzk4fQ.8WFBc_7lGHfUf97YVkPchXE3UPqAUzguOqw3zAdJE3g'
            },
            body: JSON.stringify({
                longitude: 19.137403,
                latitude: 47.45742,
                radius: 1000000,
                page: 0
              })
          }).then(response => response.json())
    }
}