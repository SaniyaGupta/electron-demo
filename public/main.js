const { app, BrowserWindow, screen, ipcMain } = require("electron");
let win;
let closeWindow;
let screenWidth;
let mainWindowPosition;
function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  screenWidth = width;
  const screenHeight = height;

  const opts = { show: false };
  if (BrowserWindow.getFocusedWindow()) {
    let current_win = BrowserWindow.getFocusedWindow();
    const pos = current_win.getPosition();
    Object.assign(opts, {
      x: pos[0] + 22,
      y: pos[1] + 22,
    });
  }
  // Create the browser window.
  win = new BrowserWindow({
    width: (screenWidth * 50) / 100,
    height: screenHeight,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindowPosition = win.getPosition();
  win.loadURL("http://localhost:3000");

  closeWindow = new BrowserWindow({
    width: 50,
    height: 50,
    x: mainWindowPosition[0] - 50,
    y: mainWindowPosition[1] + 200,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  closeWindow.loadFile(`./src/smallWindow.html`);

  // Open the DevTools.
  closeWindow.webContents.openDevTools();
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("toggle-window", (event, arg) => {
  if (win.isVisible()) {
    win.hide();
    closeWindow.setPosition(screenWidth - 100, 300);
    closeWindow.setSize(100, 50);
    closeWindow.webContents.send("show-hide", "show");
  } else {
    closeWindow.setPosition(
      mainWindowPosition[0] - 50,
      mainWindowPosition[1] + 200
    );
    closeWindow.setSize(50, 50);
    win.show();
    closeWindow.webContents.send("show-hide", "hide");
  }
});
ipcMain.on("bmi-data", (event, arg) => {
  closeWindow.webContents.send("bmi", arg);
});
