const axios = require("axios");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const cheerio = require("cheerio");

router.post("/github-contributions", async (req, res) => {
  const { username } = req.body;

  axios
    .get(`https://github.com/users/${username}/contributions`)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      const lastYearContributions = $(".js-yearly-contributions h2")
        .first()
        .text()
        .trim()
        .split(" ")[0]
        .replace(",", "")
        .replace("\n", "");
      return lastYearContributions;
    })
    .then((data) => {
      res.status(200).json({ contributions: data });
    })
    .catch((error) => res.status(403).json({ message: error.message }));
});

module.exports = router;
