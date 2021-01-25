module.exports = (req, res, next) => {
    console.log('inside Not Found');
    res.status(404);
    res.json({error: 'Not Found!'});
}