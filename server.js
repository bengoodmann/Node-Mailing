const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const htmlPath = path.join(__dirname, "index.html");


fs.readFile(htmlPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading HTML file:", err);
    return;
  }

  let tp = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    service: 'gmail',
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
