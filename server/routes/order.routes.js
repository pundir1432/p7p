const orderController = require("../controller/order.controller");

module.exports = function Route(app) {
    app.get("/api/getOrder", orderController.getOrder);
}
