const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pageRoute = require("./routes/pageRoute");
const authorRoute = require("./routes/authorRoute");
const appointmentRoute = require("./routes/appointmentRoute");

const app = express();
dotenv.config();


//DB
mongoose.connect(process.env.DB_URL);



//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Routes
app.use("/", pageRoute);
app.use("/authors", authorRoute);
app.use("/appointments", appointmentRoute);



//Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
