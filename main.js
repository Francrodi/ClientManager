const {app, BrowserWindow} = require('electron');
require('electron-reload')(__dirname)


function createWindow() {

    let mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });




mainWindow.loadFile('index.html');
mainWindow.maximize();
//win2.loadFile('test1.html');
// win2.once("ready-to-show", win2.show());
}

global.popWindow = function() {
    let win2 = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win2.loadFile('test.html')
}

app.whenReady().then(createWindow);
//app.whenReady().then(popWindow);