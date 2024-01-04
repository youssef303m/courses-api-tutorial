module.exports = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((err) => {
      res.status(500).json({ status: "error", message: err.message });
    });
  };
};
