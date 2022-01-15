require('dotenv').config();
const path = require('path');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = require('./range')

const PORT = process.env.PORT || 5000;

server.use(middlewares)
server.use(router)
server.get('*', function (req, res) {
  res.json({ message: "Hello from server!" })
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})