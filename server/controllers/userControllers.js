const User = require("../models/userModel.js");

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({});
		if (allUsers) {
			res.status(200).json({
				message: "Users fetched successfully",
				allUsers,
			});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const { email } = req.body;
		const userExists = await User.findOne({ email });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const { username, email, isAdmin } = req.body;
		const userExists = await User.findOne({ email });

		if (!userExists) {
			const newUser = await User.create({ username, email, isAdmin });
			res.status(201).json(newUser);
		} else {
			res
				.status(409)
				.json({ message: "User already exists", user: userExists });
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const updateUser = async (req, res) => {
	const { email } = req.body;
	const user = User.update({ email });
};

const deleteUser = async (req, res) => {};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
