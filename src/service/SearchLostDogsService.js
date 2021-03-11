export default class SearchLostDogsService {
    static searchLostDogs() {
        return fetch("http://localhost:8080/api/lost-dog/search", {
            method: "POST",
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