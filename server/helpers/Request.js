const getURL = req => `${req.protocol}://${req.get('host')}`;

module.exports = {
  getURL
};
