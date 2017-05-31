var nodemailer = require('nodemailer');
var authData = require('./emailAuth.json');
//宣告發信物件
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: authData.auth
});
var options = {
    from: 'magus5168@gmail.com',
    to: 'magus52941@gmail.com',
    subject: '測試信件',
    html: '',
};

module.exports = {
    send(code, title, trigger){
        options.html = `${code} ${title} ↑${trigger}`
        transporter.sendMail(options, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('訊息發送: ' + info.response);
            }
        });
    }
}
