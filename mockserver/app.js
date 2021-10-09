const express = require('express');
const dashboardData = require('./data/dashboard.json');

const app = express();
const port = 8080;

app.post('/api/lost-dog/search', (req, res) => {
    res.status(200);
    res.contentType('application/json');
    res.send(JSON.stringify(dashboardData));
});

app.listen(8080, () => {
    console.log(`Listening at http://localhost:${port}`)
});