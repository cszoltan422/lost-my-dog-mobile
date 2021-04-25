export default class SearchLostDogsService {
    static searchLostDogs(page, searchParams) {
        return fetch('https://lost-my-dog-staging.herokuapp.com/api/lost-dog/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjc3pvbHRhbjQyMiIsImV4cCI6MTYxOTg2NjExOCwiaWF0IjoxNjE5MjYxMzE4fQ.wlAwGJWW0w0U6309-FsZJdfXj8BjnE8IzYKXJ19Tpwo'
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