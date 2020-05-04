const {app, BrowserWindow, BrowserView} = require('electron');
require('electron-reload')(__dirname)


function createWindow() {

    let mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        show: false,
        height: 600,
        width: 800

        
    });
    let winVisor = mainWindow.getBounds();
    console.log(winVisor.height);
    let sidebar = new BrowserView();
    mainWindow.addBrowserView(sidebar);
    sidebar.setBounds({x: 0, y: 0, width: winVisor.width*0.30, height: winVisor.height});
    sidebar.webContents.loadFile('sidebar.html');
    sidebar.setAutoResize({width: true, height: true, horizontal: true, vertical: true});

    let content = new BrowserView();
    mainWindow.addBrowserView(content);
    content.setBounds({x: winVisor.width*0.30, y: 0, width: winVisor.width*0.70, height: winVisor.height});
    content.webContents.loadFile('content.html');
    content.setAutoResize({width: true, height: true, horizontal: true, vertical: true});
    mainWindow.show();
}


app.whenReady().then(createWindow);
