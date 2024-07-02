const userController = require("../controller/user.controller")


module.exports = function Route(app) {
    app.post("/api/users/logIn",  userController.userLogin);
    app.post("/api/users/signUp", userController.registerUser);
    app.get("/api/users/list", userController.getUserList);
}