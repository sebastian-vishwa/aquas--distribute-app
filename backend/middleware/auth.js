module.exports = (req, res, next) => {
  req.user = { id: 'PLACEHOLDER_USER_ID', role: 'customer' };
  next();
};