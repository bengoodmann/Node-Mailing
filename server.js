const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const htmlPath = path.join(__dirname, "index.html");

// sending from index.html
fs.readFile(htmlPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading HTML file:", err);
    return;
  }

  let tp = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    service: "gmail",
    auth: {
      user: "dummyprogramtest@gmail.com",
      pass: process.env.pass,
    },
  });

  let mailOptions = {
    from: "'Bes'<dummyprogramtest@gmail.com>",
    to: ["bensonoluchukwuisaac@gmail.com", "bensonsibigamisaac@gmail.com"],
    subject: "HTML Email from index.html",
    html: data,
  };

  tp.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred: " + error.message);
      return;
    }
    console.log("Email sent successfully!");
    console.log("Message ID: " + info.messageId);
  });
});

// sending from a server
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-mail", (req, res) => {
  const { subject, message } = req.body;

  let tp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dummyprogramtest@gmail.com",
      pass: process.env.pass,
    },
  });

  let mailOptions = {
    from: "'Bes'<dummyprogramtest@gmail.com>",
    to: ["bensonoluchukwuisaac@gmail.com", "bensonsibigamisaac@gmail.com"],
    subject: subject,
    html: message,
  };

  tp.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred: " + error.message);
      res.status(500).json({ message: "An error occurred" });
    } else {
      console.log("Email sent successfully!");
      console.log("Message ID: " + info.messageId);
      res.status(200).json({ message: "Email sent successfully" });
    }
  })
});

app.listen(3000, () => {
 console.log("Server started at port:3000")
})