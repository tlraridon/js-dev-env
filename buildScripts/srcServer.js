import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev'

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPach: config.output.publicPath
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
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
