const jwt = require("jsonwebtoken");

const middleware = {
  authCheck(req, res, next) {
    const token = req.headers["auth-token"];
    if (token) {
      try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (err) {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  },
  logging(req, res, next) {
    console.log(
      `[${new Date()}] - ${req.user.userId} - ${req.url} - ${req.method}`
    );
    next();
  },
};

module.exports = middleware;
