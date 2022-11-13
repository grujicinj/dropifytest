const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1780,
        height: 860,
        minWidth: 450,
        minHeight: 700,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            "sandbox": true,
            //devTools: false
        }
    })

    win.removeMenu()
    
    

    win.loadFile('index.html')

    ipcMain.on('minimize-window', () => {
        win.minimize();
    });

    ipcMain.on('maximize-window', () => {
        if(win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });
}

const createMainWindow = () => {
    const win = new BrowserWindow({
        width: 1780,
        height: 860,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            "sandbox": true,
            devTools: false
        }
    })

    win.removeMenu()
    
    win.setResizable(false)

    win.loadFile('mainapp.html')
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('asynchronous-message', (event, arg) => {
    app.quit();
    createMainWindow();
})