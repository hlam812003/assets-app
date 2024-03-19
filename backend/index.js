require('dotenv').config();
const db = require('./services/db');
const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require("./routes/user");
const authenticationRouter = require("./routes/authentication");
const seachRouter = require("./routes/search");
const assetRouter = require('./routes/asset');
const assetFilter =require('./routes/departmentFilter');
const typeFilter = require('./routes/typeFilter');

let PORT = 3001;

  
  // GET method to retrieve asset info based on department_id


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(
    express.urlencoded({
        extended: true,
    })
);
/*app.get("/fetchById/:id",(req, res)=>{
    const fetchId = req.params.id;
    db.query('select *from asset where department_id=?',fetchId,(err,result)=>{
        if (err){console.log(err)}
        else{
            res.send(result)
        }
    })
})*/

// Use the route/asset
app.use('/types', typeFilter);
app.use('/departments', assetFilter);
app.use('/assets', assetRouter);

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

app.listen(PORT, () => {
    console.log(`Example app listening at localhost:${PORT}`);
});