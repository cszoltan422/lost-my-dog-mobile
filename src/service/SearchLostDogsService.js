export default class SearchLostDogsService {
    static searchLostDogs(page, searchParams) {
        return fetch('https://lost-my-dog-staging.herokuapp.com/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjc3pvbHRhbjQyMiIsImV4cCI6MTYxNzQ0MzkxNywiaWF0IjoxNjE2ODM5MTE3fQ.p7riTg80-sK0Z4WuE0S1oLyIBM5Xl8CrVUnngoG0xuk'
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