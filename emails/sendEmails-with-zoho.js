var { SendMailClient } = require("zeptomail");

const url = "api.zeptomail.com/";
const token = process.env["ZOHO_TOKEN"];

let client = new SendMailClient({ url, token });

client
  .sendMail({
    bounce_address: "bounce@example.com",
    from: {
      address: "charleskasasira01@gmail.com",
      name: "test",
    },
    to: [
      {
        email_address: {
          address: "byteofhope@gmail.com",
          name: "test1",
        },
      },
    ],
    subject: "Sending with ZeptoMail to have good experience",
    textbody: "Easy to do anywhere, even with Node.js",
    htmlbody: "<strong>Easy to do anywhere, even with Node.js</strong>",
    track_clicks: true,
    track_opens: true,
    // client_reference: "<client reference>",
  })
  .then((resp) => console.log("success"))
  .catch((error) => console.log("error"));
