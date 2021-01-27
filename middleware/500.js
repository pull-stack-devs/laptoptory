module.exports = (err, req, res) => {
    console.log('inside Err Handler', err);
    res.status(500).json({ error: 'We have an issue we will fix it soon!' });
  };