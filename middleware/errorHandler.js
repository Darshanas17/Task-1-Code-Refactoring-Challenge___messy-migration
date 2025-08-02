module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const response = { error: "Internal Server Error" };
  if (process.env.NODE_ENV !== "production") {
    response.message = err.message;
  }
  res.status(500).json(response);
};
