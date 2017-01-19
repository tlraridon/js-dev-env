import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';      //gzip

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', function(req, res) {
    // hard-coding for dev simplicity / mocking production db
    res.json([
        { "id": 1, "firstName": "John", "lastName": "Doe", "email": "jdoe@test.com" },
        { "id": 2, "firstName": "Jane", "lastName": "Green", "email": "jgreen@test.com" },
        { "id": 3, "firstName": "Bob", "lastName": "Dylan", "email": "bdylan@test.com" }
    ]);
});

app.listen(port, function(err) {
    if(err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);

    }
});
