const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		throw new Error("Token not provided");
	}

	try {
		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Throws if invalid
		console.log(decoded);

		req.user = decoded; // Attach user data to request
		console.log(req.user)
		next(); // Proceed to controller
	} catch (error) {
		console.log(error.message);
		return res.status(401).json('You are not signed in!')
	}

};

module.exports = AuthMiddleware;


