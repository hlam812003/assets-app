// const app = require('./server');
// const mysql = require('mysql2');

// const PORT = process.env.PORT || 8080;

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'assets-app',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });
// // Attempt to perform a simple query to the database to check the connection
// // pool.query('SELECT * from authentication', (error, results, fields) => {
// //     if (error) {
// //         console.error('Error connecting to the database:', error);
// //         return;
// //     }
// //     console.log('Successfully connected to the database.');
// //     // Start the server only if the database connection is successful
// //     app.listen(PORT, () => {
// //         console.log(`Server is running on port ${PORT}`);
// //     });
// // });

// app.listen(PORT, () => {
//     // console.log(`${pool.user}`);
//     // console.log(`${pool.password}`);
//     // console.log(`${pool.database}`);
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");
const authenticationRouter = require("./routes/authentication")
const seachRouter = require("./routes/search")


app.use(express.json());

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