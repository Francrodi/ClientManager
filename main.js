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