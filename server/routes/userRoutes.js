const express = require("express");

const router = express.Router();
const {
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
} = require("../controllers/userControllers");
const AuthMiddleware = require("../middleware/auth");

router.route("/").get(AuthMiddleware, getAllUsers);

router.route("/update/:id").patch(AuthMiddleware, updateUser);
router.route("/:id").get(AuthMiddleware, getUser);
router.route("/delete/:id").delete(AuthMiddleware, deleteUser);

module.exports = router;
