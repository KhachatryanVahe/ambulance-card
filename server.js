require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8080;
console.log('Server connected successfully....');
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});