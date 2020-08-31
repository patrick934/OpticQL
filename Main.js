const {app, BrowserWindow} = require('electron')      
function createWindow () {   
  // Create the browser window.     
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.     win.loadFile('index.html')   }   
  // win.loadFile('./client/index.html')
  win.loadURL('http://localhost:3000/')   


}

app.on('ready', createWindow)

