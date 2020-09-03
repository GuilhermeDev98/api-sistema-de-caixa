const {
  app,
  BrowserWindow,
  screen,
  globalShortcut,
  ipcMain,
} = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

process.env.GOOGLE_API_KEY = "YOUR_KEY_HERE";

process.env["API_URL"] = isDev
  ? "http://127.0.0.1:3333/api/v1/"
  : "https://sistema-de-caixa.herokuapp.com/api/v1/";

console.log(process.env["API_URL"]);

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    useContentSize: true,
    icon: path.join(__dirname, "./logo.png"),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${__dirname}/../build/index.html`
  );

  mainWindow.on("closed", () => (mainWindow = null));

  mainWindow.webContents.on("did-fail-load", (err) => {
    console.log("did-fail-load", err);
  });

  mainWindow.setMenuBarVisibility(isDev);

  globalShortcut.register("Control+Shift+I", () => isDev);
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("close-me", (evt, arg) => {
  app.quit();
});
