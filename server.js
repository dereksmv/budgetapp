const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const debtsAndIncome = require("./routes/api/networth")
const goals = require("./routes/api/goals")
const templates = require("./routes/api/templates")
const budgets = require("./routes/api/budgets")
const path = require("path")
const favicon = require("serve-favicon")

const dotenv = require("dotenv").config();
const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// DB Config
const db = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false } )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname+'/build/favicon.ico'))
} )

app.use("/api/users", users);

app.use("/api/networth", debtsAndIncome)

app.use("/api/goals", goals)

app.use("/api/new-template", templates)

app.use("/api/budgets", budgets)

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});
