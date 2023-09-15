const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });
app.use(express.urlencoded({ extended: true }));

const users = [
  { email: "akhil@gmail.com", password: "akhil123" },
  { email: "kumar@gmail.com", password: "kumar123" },
  { email: "rahul@gmail.com", password: "rahul123" },
  { email: "john@gmail.com", password: "john123" },
  { email: "ashiq@gmail.com", password: "ashiq123" },
  { email: "arun@gmail.com", password: "arun123" },
];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (data) => data.email === email && data.password === password
  );

  if (user) {
    const data = {
      email,
      date: Date(),
    };
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: "1min",
    });
    console.log(token);
    res.cookie("token",token).redirect("/profile");
  } else {
    res.redirect("/");
  }
});

app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/profile.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
