const {app, BrowserWindow, BrowserView} = require('electron');
require('electron-reload')(__dirname)


function createWindow() {

    let mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
        
    });

/* BROWSER VIEW
let view = new BrowserView()
mainWindow.setBrowserView(view)
view.setBounds({x: 0, y: 0, width: 200, height: 200})
view.webContents.loadFile('test.html')
*/

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