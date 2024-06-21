const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret.config");

exports.signup = async (req, res) => {
    // logic to create the user
    // 1. Read the request body
    
    const request_body = req.body;
  
    // 2. Insert the data in the users collection in MongoDB
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    };
  
    try {
        const user_created = await user_model.create(userObj);
        // return this user
        res.status(201).send(user_created);
    } catch (err) {
        console.log("error while registering the user", err);
        res.status(500).send({
            message: "some error happened while registering the user"
        });
    }
    // 3. Return the response back to the user
};

exports.signin = async (req, res) => {
    // Check if the user id is present in the system
    const user = await user_model.findOne({ userId: req.body.userId });

    if (user == null) {
        return res.status(400).send({
            message: "user id passed is not a valid user id"
        });
    }

    // Password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            message: "wrong password passed"
        });
    }

    // Using jwt we will create the access token with a given TTL and return
    const token = jwt.sign({ id: user.userId }, secret.secret, {
        expiresIn: 120
    });

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    });
};
