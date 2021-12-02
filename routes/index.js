const usersRout = require('./users');

module.exports = (app) => {
    app.use('/users', usersRout);
    
}