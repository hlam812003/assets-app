// const express = require('express');
// const router = express.Router();
// const user = require('../services/user');

// // Sign-in route
// router.post('/', async (req, res) => {
//     let { username, password } = req.body;
//     username = username.trim();
//     password = password.trim();
//     console.log(username)
//     console.log(password)
    
//     try {
//         // Validate input fields
//         if (username === "" || password === "") {
//             return res.json({
//                 status: "FAILED",
//                 message: "Empty input fields",
//             });
//         }

//         // Authenticate user
//         const userData = await user.loginUser(username, password);
//         if (userData) {

//             return res.json({
//                 status: "SUCCESS",
//                 message: "User signed in successfully",
//                 userData
//             });
//         } else {
//             return res.status(401).json({
//                 status: "FAILED",
//                 message: "Invalid credentials"
//             });
//         }
//     } catch (error) {
//         console.error('Error signing in user:', error);
//         return res.status(500).json({
//             status: "FAILED",
//             error: "Internal Server Error"
//         });
//     }
// });

// module.exports = router;