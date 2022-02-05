const {app, BrowserWindow} = require('electron')

const server = require('./server');

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    title:'Ambulance cards',
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + '/public/favicon.ico'
  })
  let HOST = process.env.HOST || "localhost"
  let PORT = process.env.PORT || 5000
  mainWindow.loadURL(`http://${HOST}:${PORT}`)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('resize', function(e,x,y){
  mainWindow.setSize(x, y);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})