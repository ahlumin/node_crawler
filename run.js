var http = require('http');
var path = require('path');
var express = require('express');
var nodemailer = require('nodemailer');
var Stock = require('./src/js/get-stock');
var stockSource = require('./stock.json');
var mailHelper = require('./mailHelper.js');

// 載入要監看的目標，設定發送通知預設值(false)
let stockData = stockSource.stocks.map((cur,idx,arr)=>{
    cur.isSend=false;
    return cur;
});

const app = express();
app.use(express.static('src'));

app.get('/', function(req,res){
    res.sendFile(path.resolve('./index.html'));
});

app.get('/get-data', function(req, res){
    Promise.all(Stock.getStock(stockData)).then(val => {

        stockData.forEach((cur,idx)=>{
            if(cur.isSend){
                return;
            }

            var item = val.find((el,idx)=> cur.code === el.code);
            if(parseFloat(item.transaction) >= parseFloat(cur.trigger)){
                mailHelper.send(cur.code, cur.title, cur.trigger);
                cur.isSend = true;
            }
        });

        res.end(JSON.stringify(val));
    });
})

http.createServer(app).listen(5168, '127.0.0.1', function(){
    console.log('nodejs server has been started...')
});
