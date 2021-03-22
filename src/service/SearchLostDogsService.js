export default class SearchLostDogsService {
    static searchLostDogs() {
        return fetch('https://lost-my-dog-staging.herokuapp.com/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer DEMO_TOKEN'
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