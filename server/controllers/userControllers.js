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
	
	try{
		const userId= req.params.id
		const updates= req.body

		const updatesUser = await User.findByIdAndUpdate(
			userId, req.body, 
			{new: true, runValidators: true}
		)//so the format of this is the id, the new data and the options. You just have to remember that 'options' always

		if(!updatedUser){
			return res.status(404).json({msg: "User not found"})
		}

		const {...rest, password}= updatedUser._doc
		res.status(200).json(msg:"User successfully updated", user: rest)
	}
	catch(error){
		console.log(error.message)
		return res.status(500).json("Internal Server Error")
	}
};

const deleteUser = async (req, res) => {};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
