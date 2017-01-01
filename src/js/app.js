
function getdata(){
    return new Promise((resolve, reject) =>{
        $.ajax({
            url:'./get-data',
            type:'GET',
            success:function(val){
                resolve(val);
            }
        });
    });
}

function roll(){
    getdata().then(val=>{
        var data = JSON.parse(val);
        $('.main table tbody').html('')
        data.forEach((x, y) =>{
            $('.main table tbody').append('<tr><td>' + x.title + '</td><td>' + 
                                                       x.transaction + '</td><td>' + 
                                                       x.buy + '</td><td>' + 
                                                       x.sell + '</td><td><span class="' + (x.change.indexOf('△') != -1 ? 'red' : 'green') + '">' + 
                                                       x.change + '</span></td><td>' + 
                                                       x.tickets + '</td><td>' + 
                                                       x.open + '</td><td>' + 
                                                       x.highest + '</td><td>' + 
                                                       x.lowest + '</td></tr>');
        });
    });
}

$(function(){
    roll();
    setInterval(roll, 3000);
});