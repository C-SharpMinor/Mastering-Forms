const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "User not found" });
		}
		const isPwdValid = await bcrypt.compare(password, user.password);
		if (!isPwdValid) {
			console.log("Incorrect password");
			return res.status(401).json({ msg: "Invalid Credentials" });
		}
		const token = await jwt.sign(
			{ _id: user._id },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "1h" }
		);

		const { password: userPwd, ...rest } = user._doc;
		return res.status(200).json({ message: "Sign in successful", token, rest });
	} catch (error) {
		return console.log(error.message);
	}
};

const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			res.status(400).json({ msg: "User already exists" }); //I will learn how to replace all this error handling with error middleware
		}
		const hashedPwd = await bcrypt.hash(password, 12);

		const newUser = await User.create({ ...req.body, password: hashedPwd });

		const token = await jwt.sign(
			{ _id: newUser._id },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "1h" }
		);

		res.status(201).json({ msg: "User registered successfully", token });
	} catch (error) {
		return console.log(error.message);
	}
};

module.exports = { signin, signup };
