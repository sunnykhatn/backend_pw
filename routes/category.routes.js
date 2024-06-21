//POST localhost:8080/ecomm/api/v1/categories
const authMw = require("../middlewares/auth.mw")
const category_controller = require("../controllers/category.controller");
const auth_mw = require("../middleware/auth.mw");

module.exports = (app) => {
    app.post("/ecomm/api/v1/categories", [auth_mw.verifyToken, authMw.isAdmin], category_controller.createNewCategory);
};
