require('dotenv').config();
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middleware = require('./range');
const statics = jsonServer.defaults({static: './public'});

const PORT = process.env.PORT || 5000;

server.use(statics)
server.use(middleware)
server.use(router)
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})