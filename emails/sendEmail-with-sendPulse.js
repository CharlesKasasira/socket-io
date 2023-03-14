const sendpulse = require("sendpulse-api");

const API_USER_ID = process.env.SEND_PULSE_ID;
const API_SECRET = process.env.SEND_PULSE_SECRET;
const TOKEN_STORAGE = "/tmp/";