const {app, BrowserWindow} = require('electron');
require('electron-reload')(__dirname)


function createWindow() {

    let win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })

win.loadFile('index.html');
win.maximize();
}

app.whenReady().then(createWindow)