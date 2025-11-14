// middlewares\errorMiddleware.js

    console.log("came here")


export const errorHandler = (err, req, res, next) => {
  console.log("came here");

  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
};
