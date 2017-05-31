var cheerio = require('cheerio');
var _request = require('request');
var iconv  = require('iconv-lite');

module.exports = {
    getStock(stocks){
        var promiseList =[];
        stocks.forEach(function(val, index){

            promiseList.push(new Promise((resolve,reject) => {
                _request({
                    url:'https://tw.stock.yahoo.com/q/q?s=' + val.code,
                    method:'GET',
                    encoding:null
                }, function(err, resp, body){
                    if(!err){
                        $ = cheerio.load(iconv.decode(new Buffer(body), "big5"));
                        var tdList = $('td[bgcolor="#FFFfff"]');
                        resolve({
                            code:val.code,
                            title:val.code + val.title,
                            transaction:$(tdList[1]).text(),            //成交
                            buy:$(tdList[2]).text(),                    //買進
                            sell:$(tdList[3]).text(),                   //賣出
                            change:$(tdList[4]).text().split('\n')[0],  //漲跌
                            tickets:$(tdList[5]).text(),                //張數
                            open:$(tdList[7]).text(),                   //開盤
                            highest:$(tdList[8]).text(),                //最高
                            lowest:$(tdList[9]).text(),                 //最低
                            trigger:val.trigger
                        });
                    }
                    else
                    {
                        console.log('！！！ERROR:');
                        console.log(err);
                        reject('error');
                    }
                });
            }));
        });
        return promiseList;
    }
}
