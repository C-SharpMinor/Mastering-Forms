const express = require("express");

const router = express.Router();
const {
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
} = require("../controllers/userControllers");
const AuthMiddleware = require("../middleware/auth");

router
	.route("/")
	.get(AuthMiddleware, getAllUsers)

router.route("update/users/:id").patch(AuthMiddleware, updateUser)
	.get(AuthMiddleware, getUser)
	
	.delete(AuthMiddleware, deleteUser);

module.exports = router;
