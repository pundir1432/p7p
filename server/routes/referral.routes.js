const express = require("express");
const referralController = require("../controller/referral.controller");
const referralRoute = express.Router();
const {deleteExpiredCoupons}= require("../middleware/jwt");

referralRoute.post("/generateCoupon", referralController.generateCoupon);
referralRoute.post("/useCoupon" ,deleteExpiredCoupons, referralController.applyCoupon);


module.exports = referralRoute;