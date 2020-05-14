const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
require("electron-reload")(__dirname);

function createWindow() {
    let mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        frame: false,
        show: true,
        height: 600,
        width: 960,
    });

    let sidebar = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
        },
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
            nodeIntegration: true,
        },
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
    console.log(content.id); // 2
    mainWindow.show();
}

function cargarVentana(args, id) {
    switch (args) {
        case "btn-buscar-cliente":
            BrowserView.fromId(id).webContents.loadFile("src/busqueda.html");
            break;

        case "btn-nuevo-cliente":
            BrowserView.fromId(id).webContents.loadFile(
                "src/agregarCliente.html"
            );
            break;

        case "btn-listar-clientes":
            BrowserView.fromId(id).webContents.loadFile(
                "src/listarClientes.html"
            );
            break;

        default:
            console.log("Error");
            break;
    }
}

app.whenReady().then(createWindow);

ipcMain.on("cerrar", (evt, args) => {
    console.log("Cerrando...");
    app.quit();
});

ipcMain.on("nueva-ventana", (evt, args) => {
    cargarVentana(args, 2);
});

ipcMain.on("cliente-form", (evt, args) => {
    console.log(`form recibida! args = ${args}`);
});
