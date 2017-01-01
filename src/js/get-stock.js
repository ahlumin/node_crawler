var cheerio = require('cheerio');
var _request = require('request');
var iconv  = require('iconv-lite');

module.exports = {
    getStock(){
        var stocks = [
        {
            title:'台積電',
            code:'2330'
        },
        {
            title:'佳必琪',
            code:'6197'
        },
        {
            title:'鴻準',
            code:'2354'
        },
        {
            title:'銘異',
            code:'3060'
        }];
   
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
                            title:val.code + val.title,
                            transaction:$(tdList[1]).text(),            //成交
                            buy:$(tdList[2]).text(),                    //買進
                            sell:$(tdList[3]).text(),                   //賣出
                            change:$(tdList[4]).text().split('\n')[0],  //漲跌
                            tickets:$(tdList[5]).text(),                //張數
                            open:$(tdList[7]).text(),                   //開盤
                            highest:$(tdList[8]).text(),                //最高
                            lowest:$(tdList[9]).text(),                 //最低
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