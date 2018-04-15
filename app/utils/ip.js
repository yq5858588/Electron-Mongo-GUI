var os = require('os');
var ip = function() {
    console.log('obtain an IP address');
}

ip.prototype.address = function() {
    var network = os.networkInterfaces();
    console.log(network);
    for(var i = 0; i < network.en1.length; i++) {
        var json = network.en1[i];
        if(json.family == 'IPv4') {
            console.log(json.address);
        }
    }
}
module.exports = ip;

/**
 * 使用方法
        var ip = require('./utils/ip');

        ip = new ip();

        ip.address();
 */