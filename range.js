module.exports = (req, res, next) => {
    res.append('Access-Control-Expose-Headers', 'Content-Range');
    res.append('Content-Range', 'page 0-20/20');
    next();
}