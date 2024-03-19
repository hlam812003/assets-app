require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const isHttpError = require("http-errors");
const createHttpError = require("http-errors");
const userRouter = require("./routes/user");
const assetRouter = require("./routes/asset");
const assetFilter =require('./routes/departmentFilter');
const typeFilter = require('./routes/typeFilter');
// const assetRouter = require("./routes/asset");

const PORT = 3001;

const app = express();

app.use(morgan("dev")); 

app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.json({ message: "ok" });
});

app.use("/user", userRouter);
app.use("/asset", assetRouter);
app.use('/types', typeFilter);
app.use('/departments', assetFilter);

app.use((req, res, next) => {
	next(createHttpError(404, "Endpoint not found!"));
});

app.use((error, req, res, next) => {
	console.error(error);
	let errorMessage = "An unknown error occurred!";
	let statusCode = 500;
	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
	}
	res.status(statusCode).json({ error: errorMessage });
});

app.listen(PORT, () => {
	console.log("Server running on port: " + PORT);
});