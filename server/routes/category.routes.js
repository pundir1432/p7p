const categoryController = require("../controller/category.controller")


module.exports = function Route(app) {
    app.post("/api/addCategory",  categoryController.addCategory);
    // app.post("/api/users/signUp", userController.register);
}