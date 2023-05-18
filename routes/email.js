const express = require("express");
const router = express.Router();
require("dotenv").config();
const sendpulse = require("sendpulse-api");
const API_USER_ID = process.env.SEND_PULSE_ID;
const API_SECRET = process.env.SEND_PULSE_SECRET;
const TOKEN_STORAGE = "/tmp/";

sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function () {
  console.log("SendPulse API initialized");
});

// send bulk emails by the management
router.post("/bulk-emails", (req, res) => {
  const { subject, sender_name, sender_email, to, bcc, html, textbody } =
    req.body;

  const report = [];

  var answerGetter = function (data) {
    // res.send(data);
    report.push(data);
  };

  try {
    to &&
      to.forEach((receiver, index) => {
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

    res.status(200).send({ message: "complete", response: report });
  } catch (error) {
    res.status(500).send({ message: error, response: report });
    return;
  }
});

// send emails to hired devs at 4:30pm
router.post("/feedback-remainder", (req, res) => {
  const { hired_devs } = req.body;
  const report = [];

  var answerGetter = function (data) {
    report.push(data);
  };

  try {
    hired_devs &&
      hired_devs.forEach((receiver) => {
        let email = {
          html: `<!doctype html>
          <html>
          <head>
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <style>
            a{
              text-decoration: none;
              color: #f36c32;
            }
          </style>
          </head>
          <body>
          <p>Hello ${receiver.name},</p>
          <p>Please log into your Ablestate Talent account and send Feedback about your day at work today.</p>
          <a href="https://app.ablestate.co/login">Ablestate Talent</a>
          </body>
          </html>`,
          subject: "Feedback about your day.",
          textbody: "This is a remainder to send feedback.",
          from: {
            name: "Ablestate Talent",
            email: "noreply@theablestate.com",
          },
          to: [receiver],
        };
        sendpulse.smtpSendMail(answerGetter, email);
      });

    res.status(200).send({ message: "complete", response: report });
  } catch (error) {
    res.status(500).send({ message: error, response: report });
    return;
  }
});

module.exports = router;
