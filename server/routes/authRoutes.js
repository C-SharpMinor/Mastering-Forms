const express = require("express");
const router = express.Router();

const { signin, signup } = require("../controllers/authController");

router.route("/sign-in").post(signin);
router.route("/sign-up").post(signup);

module.exports = router;
