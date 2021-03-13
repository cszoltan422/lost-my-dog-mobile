export default class SearchLostDogsService {
    static searchLostDogs() {
        return fetch('https://lost-my-dog-staging.herokuapp.com/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjc3pvbHRhbjQyMiIsImV4cCI6MTYxNTY5NzI5MCwiaWF0IjoxNjE1NjYxMjkwfQ.iEfE07dj0PSUUpg34vXARJBVAFXlxe9zNCLFyxYQNBU'
            },
            body: JSON.stringify({
                longitude: 0,
                latitude: 0,
                radius: 1000000
              })
          }).then(response => response.json())
    }
}