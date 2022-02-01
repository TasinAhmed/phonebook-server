const errorController = (error, req, res, next) => {
  // responding to client
  console.log("error");
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      type: error.type,
    },
  });
};

module.exports = errorController;
