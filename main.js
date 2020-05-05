const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
require("electron-reload")(__dirname);

function createWindow() {
    let mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        show: true,
        height: 600,
        width: 960,
    });

    let winVisor = mainWindow.getBounds();
    console.log(winVisor.height + " " + winVisor.width);

    let sidebar = new BrowserView({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.addBrowserView(sidebar);
    sidebar.setBounds({
        x: 0,
        y: 0,
        width: 320,
        height: 600,
    });
    sidebar.setAutoResize({
        width: true,
        height: true,
        horizontal: true,
        vertical: true,
    });
    sidebar.webContents.loadFile("./src/sidebar.html");
    
    let content = new BrowserView({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.addBrowserView(content);
    content.setBounds({
        x: 320,
        y: 0,
        width: 640,
        height: 600,
    });
    content.setAutoResize({
        width: true,
        height: true,
        horizontal: true,
        vertical: true,
    });
    content.webContents.loadFile("content.html");
    mainWindow.show();
}

app.whenReady().then(createWindow);

ipcMain.on('cerrar', (evt, args) => {
    console.log('main - cerrando')
    app.quit();
});
