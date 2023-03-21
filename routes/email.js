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

module.exports = router;
