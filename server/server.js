const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const PropertyRouter = require("./routes/propertyRoutes");
const UserRouter = require("./routes/userRoutes");
const AuthRouter = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/properties", PropertyRouter);
app.use("/api/v1/auth", AuthRouter);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.log("MongoDB connection failed", err.message));

app.get("/", (req, res) => {
	res.send("Welcome to the server");
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, (req, res) => {
	console.log(`Server is running on port ${PORT}`);
});
