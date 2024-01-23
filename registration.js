const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const url = "mongodb://localhost:27017/registration_app";

mongoose.connect(url, {
  useNewUrlParser: true,
  connectTimeoutMS: 30000,
  family: 4,
});

mongoose.connection.on("error", (err) =>
  console.error("Mongoose connecting error ", err)
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/registration", (req, res) => {
  const { fullname, email, status, password, confirmPassword } = req.body;

  const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    status: String,
    password: String,
    confirmPassword: String,
  });

  const UserModel = mongoose.model("registration_app", userSchema, "users");

  const newUser = new UserModel({
    fullname,
    email,
    status,
    password,
    confirmPassword,
  });

  newUser
    .save()
    .then(() => res.json({ message: "Registration completed successefully!" }))
    .catch((err) => {
      console.error("Error saving user:", err);
      res.status(500).json({ message: "Error saving user" });
    });
});

app.listen(3000, () => console.log("The server running on the port 300"));
