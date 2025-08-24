const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const pageRoute = require("./routes/pageRoute");
const authorRoute = require("./routes/authorRoute");
const appointmentRoute = require("./routes/appointmentRoute");

const app = express();
dotenv.config();

global.userIN = null;

//DB
mongoose.connect(process.env.DB_URL);



//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/SmartEduDB' })
}));



//Routes
app.use("/", pageRoute);
app.use("/authors", authorRoute);
app.use("/appointments", appointmentRoute);
app.use((req, res, next) => {
    userIN = req.session.userID;
    next();
});



//Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
