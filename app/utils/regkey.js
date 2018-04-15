const globalShortcut = require('global-shortcut');
registerShortcut();

function registerShortcut() {
    function doRegister(cmd, callback) {
        globalShortcut.register(cmd, callback);
    }

    let registed = globalShortcut.isRegistered('F12');
    if (registed) return;

    doRegister('F12', function() {
        let win = BrowserWindow.getFocusedWindow();
        if (!win) return;
        win.webContents.toggleDevTools();
        console.log("toggleDevTools F12");
    });

    doRegister('F6', function() {
        let win = BrowserWindow.getFocusedWindow();
        if (!win) return;
        win.webContents.toggleDevTools();
        console.log("toggleDevTools F6");
    });

    doRegister('F5', function() {
        let win = BrowserWindow.getFocusedWindow();
        if (!win) return;
        win.reload();
        console.log("refresh");
    });

    return;
}