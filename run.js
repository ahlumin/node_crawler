var http = require('http');
var path = require('path');
var express = require('express');
var Stock = require('./src/js/get-stock');

const app = express();

app.use(express.static('src'));


app.get('/', function(req,res){
    res.sendFile(path.resolve('./index.html'));
});

app.get('/get-data', function(req, res){
    Promise.all(Stock.getStock()).then(val => {
        res.end(JSON.stringify(val));
    });
})

http.createServer(app).listen(5168, '127.0.0.1', function(){
    console.log('nodejs server has been started...')
});