const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const sendpulse = require("sendpulse-api");

const API_USER_ID = process.env.SEND_PULSE_ID;
const API_SECRET = process.env.SEND_PULSE_SECRET;
const TOKEN_STORAGE = "/tmp/";

sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function () {
  console.log("SendPulse API initialized");
});

app.post("/bulk-emails", (req, res) => {
  const { subject, sender_name, sender_email, to, bcc, html, textbody } =
    req.body;

  var answerGetter = function (data) {
    // res.send(data);
  };
  // let email = {
  //   html: html,
  //   subject: subject,
  //   textbody: textbody,
  //   from: {
  //     name: sender_name,
  //     email: sender_email,
  //   },
  //   to: to,
  // };

  to &&
    to.forEach((receiver, index) => {
      console.log(receiver);
      let email = {
        html: html,
        subject: subject,
        textbody: textbody,
        from: {
          name: sender_name,
          email: sender_email,
        },
        to: [receiver],
      };
      sendpulse.smtpSendMail(answerGetter, email);
    });

  res.send({ message: "complete" });
});

app.post("/bulk-emails", (req, res) => {
  const { subject, sender_name, sender_email, to, bcc, html, textbody } =
    req.body;

  var answerGetter = function (data) {
    // res.send(data);
  };

  to &&
    to.forEach((receiver, index) => {
      console.log(receiver);
      let email = {
        html: html,
        subject: subject,
        textbody: textbody,
        from: {
          name: sender_name,
          email: sender_email,
        },
        to: [receiver],
      };
      sendpulse.smtpSendMail(answerGetter, email);
    });

  res.send({ message: "complete" });
});
