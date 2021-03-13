export default class SearchLostDogsService {
    static searchLostDogs() {
        return fetch('https://lost-my-dog-staging.herokuapp.com/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer DEMO_TOKEN'
            },
            body: JSON.stringify({
                longitude: 0,
                latitude: 0,
                radius: 1000000
              })
          }).then(response => response.json())
    }
}