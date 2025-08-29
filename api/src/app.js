const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authorRoute = require("./routes/authorRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const cors = require('cors');

const app = express();
app.use(cors({ origin: process.env.Client_URL || 'http://localhost:8080' }));
dotenv.config();

//DB
mongoose.connect(process.env.DB_URL);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.use("/authors", authorRoute);
app.use("/appointments", appointmentRoute);

//Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
