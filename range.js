module.exports = (req, res, next) => {
    res.header('Content-Range', 'page 0-20/20');
    next();
}