//POST localhost
// interception needed
const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody], authController.signup)

    //route for POST url

    app.post("/ecomm/api/v1/auth/signin",authContoller.signin)

} 

