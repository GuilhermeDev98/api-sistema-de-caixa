const electron = require("electron");
const { globalShortcut } = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    useContentSize: true,
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
