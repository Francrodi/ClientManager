const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
const sqlite3 = require("sqlite3").verbose();

function createWindow() {
    console.log("Creando ventana principal...");
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
// CONECTAR A BASE DE DATOS
const db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
        console.error(err);
    }
    console.log("Conexion con base de datos establecida...");
});
const sqlCrearTabla = `CREATE TABLE IF NOT EXISTS clientes(
    nombre TEXT NOT NULL,
    apellido TEXT,
    telefono TEXT,
    direccion TEXT,
    observaciones TEXT
)`;

db.run(sqlCrearTabla, () => {
    console.log("Tabla Creada");
});

app.whenReady().then(createWindow);

ipcMain.on("cerrar", (evt, args) => {
    db.close((err) => {
        if (err) {
            console.error(err);
        }
        console.log("Conexion con base de datos cerrada...");
    });
    console.log("Cerrando aplicacion...");
    app.quit();
});

ipcMain.on("nueva-ventana", (evt, args) => {
    cargarVentana(args, 2);
});

ipcMain.on("cliente-form", (evt, args) => {
    console.log(args);
    db.run(
        `INSERT INTO clientes (nombre, apellido, telefono, direccion, observaciones)
    VALUES ($nombre, $apellido, $telefono, $direccion, $observaciones)
    `,
        {
            $nombre: args.nombre,
            $apellido: args.apellido,
            $telefono: args.telefono,
            $direccion: args.direccion,
            $observaciones: args.observaciones,
        },
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Cliente insertado exitosamente!");
            }
        }
    );
    db.all("SELECT * FROM clientes", [], (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            rows.forEach((row) => {
                console.log(row);
            });
        }
    });
});
