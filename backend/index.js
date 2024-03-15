const express = require("express");
const cors = require('cors');
const app = express();
const port = 3001;
const userRouter = require("./routes/user");
const authenticationRouter = require("./routes/authentication")
const seachRouter = require("./routes/search")

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/user", userRouter);

app.use("/signin", authenticationRouter);
/* Error handler middleware */
app.use("/search", seachRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});