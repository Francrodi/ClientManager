const {app, BrowserWindow} = require('electron');
require('electron-reload')(__dirname)


function createWindow() {

    let win = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

win.loadFile('index.html')

}

app.whenReady().then(createWindow)