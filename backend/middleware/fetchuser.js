var jwt = require("jsonwebtoken");
const JWT_SECRET = "idontlikecoding";

//Creating the middleware 'fetchuser'
const fetchuser = (req, res, next) => {
  // Get user from jwt and add id to req obj
  const awtToken = req.header("token");
  if (!awtToken) {
    res.status(401).send({ error: "Use valid tokens to authenticate" });
  }
  try {
    const data = jwt.verify(awtToken, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Something  went wrong ");
  }
};

module.exports = fetchuser;
