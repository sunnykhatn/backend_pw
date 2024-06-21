const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");

// Middleware to check if the request body for sign-up is proper and correct
const verifySignUpBody = async (req, res, next) => {
  try {
    // Check for the name
    if (!req.body.name) {
      return res.status(400).send({
        message: "failed ! name was not provided in request body"
      });
    }
    // Check for the email
    if (!req.body.email) {
      return res.status(400).send({
        message: "failed ! email was not provided in request body"
      });
    }
    // Check for the userId
    if (!req.body.userId) {
      return res.status(400).send({
        message: "failed ! userId was not provided in request body"
      });
    }

    // Check if the user with the same userId exists
    const user = await user_model.findOne({ userId: req.body.userId });

    if (user) {
      return res.status(400).send({
        message: "failed ! user with same userId exists"
      });
    }

    next();

  } catch (err) {
    console.log("error while validating the request object", err);
    res.status(500).send({
      message: "error while validating the request body"
    });
  }
}

// Middleware to check if the request body for sign-in is proper and correct
const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "userId is not provided"
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "password is not provided"
    });
  }
  next();
}

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  // Check if the token is present in the header
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: "no token found : UnAuthorized"
    });
  }

  // If it's the valid token
  jwt.verify(token, auth_config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "UnAuthorized !"
      });
    }
    const user = await user_model.findOne({ userId: decoded.id });
    if (!user) {
      return res.status(400).send({
        message: "UnAuthorized, this user for this token doesn't exist"
      });
    }
    // Set the user info in the req body
    req.user = user;
    next();
  });
}

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user.userType == "ADMIN") {
    next();
  } else {
    return res.status(403).send({
      message: "only ADMIN users are allowed to access this endpoint"
    });
  }
}

module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
  verifyToken: verifyToken,
  isAdmin: isAdmin
}
