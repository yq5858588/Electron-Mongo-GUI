// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var os=require("os");
var networkInterfaces=os.networkInterfaces();
// console.info(networkInterfaces);
// document.write(networkInterfaces.sdfg[0].mac);

const getmac = require('getmac');

//获取机器mac地址
let macAddress = "";
getmac.getMac(function(err, macAddress) {
    if (err) throw err;
    var macAddress = macAddress; //获取mac地址
    console.log(macAddress);
});



