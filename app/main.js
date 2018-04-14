const electron = require('electron');
const { dialog } = require('electron');
// import { dialog }  from 'electron';
const getmac = require('getmac');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 900,
        fullscreenable: true,
        height: 600
    })

    //获取机器mac地址
    getmac.getMac(function(err, macAddress) {
        if (err) throw err;
        var macAddress = macAddress; //获取mac地址
        //console.log(macAddress);
        // mainWindow.loadURL("http://weixin.xajlnkyjy.com/tp323/renshi.php", {
        //     userAgent: macAddress,
        //     host: macAddress,
        // });
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }))
    });

    // mainWindow.setTitle(macAddress);
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
    //注册打开控制台的快捷键
    /*globalShortcut.register('ctrl+shift+alt+e', function () {
        let win = BrowserWindow.getFocusedWindow();
        if (win) {
            win.webContents.openDevTools({ detach: true });
        }
    });*/
    mainWindow.setMenu(null);
    // mainWindow.maximize();
    mainWindow.on('close', event => {
        let num = dialog.showMessageBox({
            title: '确认退出系统吗？',
            type: 'warning',
            message: '如果确认退出请点击确认，否则点击取消！',
            buttons: ['确认', '取消'],
        });
        if (num !== 0) event.preventDefault();
    });
    mainWindow.on('closed', function(event) {
        mainWindow = null
    })
}
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
    }
})

if (shouldQuit) {
    app.quit()
}
app.on('ready', createWindow)

app.on('window-all-closed', function(event) {
    if (process.platform !== 'darwin') {
        app.quit()
    }

})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.