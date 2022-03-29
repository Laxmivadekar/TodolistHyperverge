const express=require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB=require("./config/db");

const app=express()

// connect database
connectDB();

// we will create these todoRoutes in the future
const todoRoutes = require("./routes/api/todo");

// Init middleware
app.use(express.json({extended:false}))
app.use(cors());
app.use(bodyParser.json());

// var utcSeconds = 1234567890;
// var d1 = new Date(0); // The 0 there is the key, which sets the date to the epoch
// d1.setUTCSeconds(utcSeconds);
// var d2 = new Date(1394104654000)
// console.log(d1>d2);
// console.log(d2>d1);


app.use("/api/v1", todoRoutes);
app.use("/api/v1/users",require("./routes/api/users"))
app.use("/api/v1/auth",require("./routes/api/auth"))

const PORT = 8000

app.listen(PORT,() => console.log(`server started on post ${PORT}`))

