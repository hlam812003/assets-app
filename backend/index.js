require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const isHttpError = require("http-errors");
const createHttpError = require("http-errors");
const userRouter = require("./routes/user");
const assetRouter = require("./routes/asset");
const adminRouter = require("./routes/admin");

const env = require("./utils/validateEnv");
const { requiresAuth, adminAuth } = require("./middleware/auth");

const PORT = env.PORT;

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(
	session({
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		},
		rolling: true,
	})
);

// app.get("/", (req, res) => {
// 	res.json({ message: "ok" });
// });

app.use("/user", userRouter);
app.use("/asset", requiresAuth, assetRouter);
app.use("/admin", requiresAuth, adminAuth, adminRouter);

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
