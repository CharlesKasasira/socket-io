const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const userRouters = require("./routes/user");

const sendpulse = require("sendpulse-api");

const API_USER_ID = process.env.SEND_PULSE_ID;
const API_SECRET = process.env.SEND_PULSE_SECRET;
const TOKEN_STORAGE = "/tmp/";

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouters);

sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function () {
  console.log("SendPulse API initialized");
});

app.post("/bulk-emails", (req, res) => {
  const { subject, sender_name, sender_email, to, bcc, html, textbody } =
    req.body;

  var answerGetter = function (data) {
    res.send(data);
  };
  let email = {
    html: html,
    subject: subject,
    textbody: textbody,
    from: {
      name: sender_name,
      email: sender_email,
    },
    to: to,
  };

  sendpulse.smtpSendMail(answerGetter, email);
});

app.post("/send-email", (req, res) => {
  const { address, name } = req.body;

  var answerGetter = function (data) {
    res.send(data);
  };

  sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function () {
    let email = {
      html: `<!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Simple Responsive HTML Email With Button</title>
          <style>
            /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */

      /*All the styling goes here*/

      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%;
      }

      body {
        background-color: #eaebed;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        min-width: 100%;
        width: 100%; }
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top;
      }

      /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

      .body {
        background-color: #eaebed;
        width: 100%;
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        Margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: 580px;
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        Margin: 0 auto;
        max-width: 580px;
        padding: 10px;
      }

      /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
      .main {
        background: #ffffff;
        border-radius: 3px;
        width: 100%;
      }

      .header {
        padding: 20px 0;
      }

      .wrapper {
        box-sizing: border-box;
        padding: 20px;
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }

      .footer {
        clear: both;
        Margin-top: 10px;
        text-align: center;
        width: 100%;
      }
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #9a9ea6;
          font-size: 12px;
          text-align: center;
      }

      /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
      h1,
      h2,
      h3,
      h4 {
        color: #06090f;
        font-family: sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        margin-bottom: 30px;
      }

      h1 {
        font-size: 1.5rem;
        font-weight: 400;
        text-align: center;
        text-transform: capitalize;
      }

      p,
      ul,
      ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 15px;
      }
        p li,
        ul li,
        ol li {
          list-style-position: inside;
          margin-left: 5px;
      }

      a {
        color: #ec0867;
        text-decoration: underline;
      }

      /* -------------------------------------
          BUTTONS
      ------------------------------------- */
      .btn {
        box-sizing: border-box;
        width: 100%; }
        .btn > tbody > tr > td {
          padding-bottom: 15px; }
        .btn table {
          min-width: auto;
          width: auto;
      }
        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center;
      }
        .btn a {
          background-color: #ffffff;
          border: solid 1px #ec0867;
          border-radius: 5px;
          box-sizing: border-box;
          color: #ec0867;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 25px;
          text-decoration: none;
          text-transform: capitalize;
      }

      .btn-primary table td {
        background-color: #ec0867;
      }

      .btn-primary a {
        /* background-color: #ec0867; */
        background-color: #f46c32;
        border-color: #f46c32;
        color: #ffffff;
      }

      /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
      .last {
        margin-bottom: 0;
      }

      .first {
        margin-top: 0;
      }

      .align-center {
        text-align: center;
      }

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .clear {
        clear: both;
      }

      .mt0 {
        margin-top: 0;
      }

      .mb0 {
        margin-bottom: 0;
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0;
      }

      .powered-by a {
        text-decoration: none;
      }

      hr {
        border: 0;
        border-bottom: 1px solid #f6f6f6;
        Margin: 20px 0;
      }

      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }
        table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
          font-size: 16px !important;
        }
        table[class=body] .wrapper,
        table[class=body] .article {
          padding: 10px !important;
        }
        table[class=body] .content {
          padding: 0 !important;
        }
        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important;
        }
        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
        table[class=body] .btn table {
          width: 100% !important;
        }
        table[class=body] .btn a {
          width: 100% !important;
        }
        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }

      /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
        .btn-primary table td:hover {
          background-color: #EE6227 !important;
        }
        .btn-primary a:hover {
          background-color: #EE6227 !important;
          border-color: #EE6227 !important;
        }
      }
          </style>
        </head>
        <body class="">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
              <td>&nbsp;</td>
              <td class="container">
                <div class="header">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="align-center" width="100%">
                        <a href="https://ablestate.co"><img src="https://ablestate.co/wp-content/uploads/2022/12/Logo-with-2023-Slogan.png" height="40" alt="Ablestate"></a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="content">

                  <!-- START CENTERED WHITE CONTAINER -->
                  <span class="preheader">Welcome to Ablestate Talent.</span>
                  <table role="presentation" class="main">

                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <h1 style="">Welcome to Ablestate Talent</h1>
                             <p>Hey ${name},</p>
       <br />
       <p>We are happy to see you. You are welcome to the Ablestate talent. Please fill in your information to get your relevant job opportunities.</p>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                <tbody>
                                  <tr>
                                    <td align="center">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td> <a href="https://app.ablestate.co" target="_blank">Update Profile</a> </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                  <!-- END MAIN CONTENT AREA -->
                  </table>

                  <!-- START FOOTER -->
                  <div class="footer">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="content-block">
                          <span class="apple-link">This email was intended for ${name} from Ablestate Talent</span>
                          <br><a href="https://ablestate.co">unsubscribe</a>.
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block powered-by">
                          Powered by <a href="https://ablestate.co">Ablestate Talent</a>.
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- END FOOTER -->

                <!-- END CENTERED WHITE CONTAINER -->
                </div>
              </td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>`,
      subject: "Welcome to Ablestate Talent",
      textbody: `Hey ${name}, we are happy to see you. You are welcome to the Ablestate talent. Please fill in your information to get your relevant job opportunities.`,
      from: {
        name: "Ablestate Talent",
        email: "noreply@theablestate.com",
      },
      to: [
        {
          name: name,
          email: address,
        },
      ],
      bcc: [
        {
          name: "Ablestate",
          email: "noreply@theablestate.com",
        },
      ],
    };
    sendpulse.smtpSendMail(answerGetter, email);
  });
});

/* 
 Socket io works using events in a way that you can either create or emit an event and listen to an event.
*/

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const user_id = socket.handshake.auth.user_id;
  socket.join(user_id);

  if (!user_id) {
    return next(new Error("Invalid user"));
  }
  socket.user_id = user_id;
  next();
});

io.on("connection", (socket) => {
  const users = [];

  for (let [id, user_id] of io.of("/").sockets) {
    users.push(user_id.user_id);
  }

  io.of("/").emit("online_users", users);

  socket.on("check_online", (data) => {
    socket.to(data).emit("online_users", users);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    const {
      receiver_id,
      receiver_email,
      receiver_name,
      sender_id,
      sender_name,
    } = data;

    var answerGetter = function (data) {
      // res.send(data);
      console.log(data);
    };

    sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function () {
      let email = {
        html: `<!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Responsive HTML Email With Button</title>
            <style>
              /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
  
        /*All the styling goes here*/
  
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%;
        }
  
        body {
          background-color: #eaebed;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          min-width: 100%;
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top;
        }
  
        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
  
        .body {
          background-color: #eaebed;
          width: 100%;
        }
  
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          Margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px;
        }
  
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          Margin: 0 auto;
          max-width: 580px;
          padding: 10px;
        }
  
        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #ffffff;
          border-radius: 3px;
          width: 100%;
        }
  
        .header {
          padding: 20px 0;
        }
  
        .wrapper {
          box-sizing: border-box;
          padding: 20px;
        }
  
        .content-block {
          padding-bottom: 10px;
          padding-top: 10px;
        }
  
        .footer {
          clear: both;
          Margin-top: 10px;
          text-align: center;
          width: 100%;
        }
          .footer td,
          .footer p,
          .footer span,
          .footer a {
            color: #9a9ea6;
            font-size: 12px;
            text-align: center;
        }
  
        /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
        h1,
        h2,
        h3,
        h4 {
          color: #06090f;
          font-family: sans-serif;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          margin-bottom: 30px;
        }
  
        h1 {
          font-size: 1.5rem;
          font-weight: 400;
          text-align: center;
          text-transform: capitalize;
        }
  
        p,
        ul,
        ol {
          font-family: sans-serif;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
          margin-bottom: 15px;
        }
          p li,
          ul li,
          ol li {
            list-style-position: inside;
            margin-left: 5px;
        }
  
        a {
          color: #ec0867;
          text-decoration: underline;
        }
  
        /* -------------------------------------
            BUTTONS
        ------------------------------------- */
        .btn {
          box-sizing: border-box;
          width: 100%; }
          .btn > tbody > tr > td {
            padding-bottom: 15px; }
          .btn table {
            min-width: auto;
            width: auto;
        }
          .btn table td {
            background-color: #ffffff;
            border-radius: 5px;
            text-align: center;
        }
          .btn a {
            background-color: #ffffff;
            border: solid 1px #ec0867;
            border-radius: 5px;
            box-sizing: border-box;
            color: #ec0867;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            padding: 12px 25px;
            text-decoration: none;
            text-transform: capitalize;
        }
  
        .btn-primary table td {
          background-color: #ec0867;
        }
  
        .btn-primary a {
          /* background-color: #ec0867; */
          background-color: #f46c32;
          border-color: #f46c32;
          color: #ffffff;
        }
  
        /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
        .last {
          margin-bottom: 0;
        }
  
        .first {
          margin-top: 0;
        }
  
        .align-center {
          text-align: center;
        }
  
        .align-right {
          text-align: right;
        }
  
        .align-left {
          text-align: left;
        }
  
        .clear {
          clear: both;
        }
  
        .mt0 {
          margin-top: 0;
        }
  
        .mb0 {
          margin-bottom: 0;
        }
  
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0;
        }
  
        .powered-by a {
          text-decoration: none;
        }
  
        hr {
          border: 0;
          border-bottom: 1px solid #f6f6f6;
          Margin: 20px 0;
        }
  
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important;
          }
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important;
          }
          table[class=body] .content {
            padding: 0 !important;
          }
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
          }
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
          table[class=body] .btn table {
            width: 100% !important;
          }
          table[class=body] .btn a {
            width: 100% !important;
          }
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }
  
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
          .btn-primary table td:hover {
            background-color: #EE6227 !important;
          }
          .btn-primary a:hover {
            background-color: #EE6227 !important;
            border-color: #EE6227 !important;
          }
        }
            </style>
          </head>
          <body class="">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="header">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td class="align-center" width="100%">
                          <a href="https://ablestate.co"><img src="https://ablestate.co/wp-content/uploads/2022/12/Logo-with-2023-Slogan.png" height="40" alt="Ablestate"></a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="content">
  
                    <!-- START CENTERED WHITE CONTAINER -->
                    <span class="preheader">You have a new message from Ablestate talent.</span>
                    <table role="presentation" class="main">
  
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <h1 style="">You have a new message from Ablestate talent</h1>
                               <p>Hey ${receiver_name},<br>Your just recieved a new message from your account at Ablestate talent. you can login to respond to it.</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                  <tbody>
                                    <tr>
                                      <td align="center">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                          <tbody>
                                            <tr>
                                              <td> <a href="https://app.ablestate.co" target="_blank">View Message</a> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
  
                    <!-- END MAIN CONTENT AREA -->
                    </table>
  
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">This email was intended for ${receiver_name} from Ablestate Talent</span>
                            <br><a href="https://ablestate.co">unsubscribe</a>.
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by">
                            Powered by <a href="https://ablestate.co">Ablestate Talent</a>.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
  
                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>`,
        subject: `${sender_name} just messaged you.`,
        textbody: `You received a new message.`,
        from: {
          name: "Ablestate Talent",
          email: "noreply@theablestate.com",
        },
        to: [
          {
            name: receiver_name,
            email: receiver_email,
          },
        ],
        bcc: [
          {
            name: "Ablestate",
            email: "noreply@theablestate.com",
          },
        ],
      };
      sendpulse.smtpSendMail(answerGetter, email);
    });

    // sendEmail with Zoho
    // client.sendMail({
    //   bounce_address: "info@bounce.theablestate.com",
    //   from: {
    //     address: "noreply@theablestate.com",
    //     name: "Ablestate Talent",
    //   },
    //   to: [
    //     {
    //       email_address: {
    //         address: receiver_email,
    //       },
    //     },
    //   ],
    //   subject: `${sender_name} just messaged you.`,
    //   textbody: `You received a new message.`,
    //   htmlbody: `<!doctype html>
    //   <html>
    //     <head>
    //       <meta name="viewport" content="width=device-width" />
    //       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    //       <title>Simple Responsive HTML Email With Button</title>
    //       <style>
    //         /* -------------------------------------
    //       GLOBAL RESETS
    //   ------------------------------------- */

    //   /*All the styling goes here*/

    //   img {
    //     border: none;
    //     -ms-interpolation-mode: bicubic;
    //     max-width: 100%;
    //   }

    //   body {
    //     background-color: #eaebed;
    //     font-family: sans-serif;
    //     -webkit-font-smoothing: antialiased;
    //     font-size: 14px;
    //     line-height: 1.4;
    //     margin: 0;
    //     padding: 0;
    //     -ms-text-size-adjust: 100%;
    //     -webkit-text-size-adjust: 100%;
    //   }

    //   table {
    //     border-collapse: separate;
    //     mso-table-lspace: 0pt;
    //     mso-table-rspace: 0pt;
    //     min-width: 100%;
    //     width: 100%; }
    //     table td {
    //       font-family: sans-serif;
    //       font-size: 14px;
    //       vertical-align: top;
    //   }

    //   /* -------------------------------------
    //       BODY & CONTAINER
    //   ------------------------------------- */

    //   .body {
    //     background-color: #eaebed;
    //     width: 100%;
    //   }

    //   /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
    //   .container {
    //     display: block;
    //     Margin: 0 auto !important;
    //     /* makes it centered */
    //     max-width: 580px;
    //     padding: 10px;
    //     width: 580px;
    //   }

    //   /* This should also be a block element, so that it will fill 100% of the .container */
    //   .content {
    //     box-sizing: border-box;
    //     display: block;
    //     Margin: 0 auto;
    //     max-width: 580px;
    //     padding: 10px;
    //   }

    //   /* -------------------------------------
    //       HEADER, FOOTER, MAIN
    //   ------------------------------------- */
    //   .main {
    //     background: #ffffff;
    //     border-radius: 3px;
    //     width: 100%;
    //   }

    //   .header {
    //     padding: 20px 0;
    //   }

    //   .wrapper {
    //     box-sizing: border-box;
    //     padding: 20px;
    //   }

    //   .content-block {
    //     padding-bottom: 10px;
    //     padding-top: 10px;
    //   }

    //   .footer {
    //     clear: both;
    //     Margin-top: 10px;
    //     text-align: center;
    //     width: 100%;
    //   }
    //     .footer td,
    //     .footer p,
    //     .footer span,
    //     .footer a {
    //       color: #9a9ea6;
    //       font-size: 12px;
    //       text-align: center;
    //   }

    //   /* -------------------------------------
    //       TYPOGRAPHY
    //   ------------------------------------- */
    //   h1,
    //   h2,
    //   h3,
    //   h4 {
    //     color: #06090f;
    //     font-family: sans-serif;
    //     font-weight: 400;
    //     line-height: 1.4;
    //     margin: 0;
    //     margin-bottom: 30px;
    //   }

    //   h1 {
    //     font-size: 1.5rem;
    //     font-weight: 400;
    //     text-align: center;
    //     text-transform: capitalize;
    //   }

    //   p,
    //   ul,
    //   ol {
    //     font-family: sans-serif;
    //     font-size: 14px;
    //     font-weight: normal;
    //     margin: 0;
    //     margin-bottom: 15px;
    //   }
    //     p li,
    //     ul li,
    //     ol li {
    //       list-style-position: inside;
    //       margin-left: 5px;
    //   }

    //   a {
    //     color: #ec0867;
    //     text-decoration: underline;
    //   }

    //   /* -------------------------------------
    //       BUTTONS
    //   ------------------------------------- */
    //   .btn {
    //     box-sizing: border-box;
    //     width: 100%; }
    //     .btn > tbody > tr > td {
    //       padding-bottom: 15px; }
    //     .btn table {
    //       min-width: auto;
    //       width: auto;
    //   }
    //     .btn table td {
    //       background-color: #ffffff;
    //       border-radius: 5px;
    //       text-align: center;
    //   }
    //     .btn a {
    //       background-color: #ffffff;
    //       border: solid 1px #ec0867;
    //       border-radius: 5px;
    //       box-sizing: border-box;
    //       color: #ec0867;
    //       cursor: pointer;
    //       display: inline-block;
    //       font-size: 14px;
    //       font-weight: bold;
    //       margin: 0;
    //       padding: 12px 25px;
    //       text-decoration: none;
    //       text-transform: capitalize;
    //   }

    //   .btn-primary table td {
    //     background-color: #ec0867;
    //   }

    //   .btn-primary a {
    //     /* background-color: #ec0867; */
    //     background-color: #f46c32;
    //     border-color: #f46c32;
    //     color: #ffffff;
    //   }

    //   /* -------------------------------------
    //       OTHER STYLES THAT MIGHT BE USEFUL
    //   ------------------------------------- */
    //   .last {
    //     margin-bottom: 0;
    //   }

    //   .first {
    //     margin-top: 0;
    //   }

    //   .align-center {
    //     text-align: center;
    //   }

    //   .align-right {
    //     text-align: right;
    //   }

    //   .align-left {
    //     text-align: left;
    //   }

    //   .clear {
    //     clear: both;
    //   }

    //   .mt0 {
    //     margin-top: 0;
    //   }

    //   .mb0 {
    //     margin-bottom: 0;
    //   }

    //   .preheader {
    //     color: transparent;
    //     display: none;
    //     height: 0;
    //     max-height: 0;
    //     max-width: 0;
    //     opacity: 0;
    //     overflow: hidden;
    //     mso-hide: all;
    //     visibility: hidden;
    //     width: 0;
    //   }

    //   .powered-by a {
    //     text-decoration: none;
    //   }

    //   hr {
    //     border: 0;
    //     border-bottom: 1px solid #f6f6f6;
    //     Margin: 20px 0;
    //   }

    //   /* -------------------------------------
    //       RESPONSIVE AND MOBILE FRIENDLY STYLES
    //   ------------------------------------- */
    //   @media only screen and (max-width: 620px) {
    //     table[class=body] h1 {
    //       font-size: 28px !important;
    //       margin-bottom: 10px !important;
    //     }
    //     table[class=body] p,
    //     table[class=body] ul,
    //     table[class=body] ol,
    //     table[class=body] td,
    //     table[class=body] span,
    //     table[class=body] a {
    //       font-size: 16px !important;
    //     }
    //     table[class=body] .wrapper,
    //     table[class=body] .article {
    //       padding: 10px !important;
    //     }
    //     table[class=body] .content {
    //       padding: 0 !important;
    //     }
    //     table[class=body] .container {
    //       padding: 0 !important;
    //       width: 100% !important;
    //     }
    //     table[class=body] .main {
    //       border-left-width: 0 !important;
    //       border-radius: 0 !important;
    //       border-right-width: 0 !important;
    //     }
    //     table[class=body] .btn table {
    //       width: 100% !important;
    //     }
    //     table[class=body] .btn a {
    //       width: 100% !important;
    //     }
    //     table[class=body] .img-responsive {
    //       height: auto !important;
    //       max-width: 100% !important;
    //       width: auto !important;
    //     }
    //   }

    //   /* -------------------------------------
    //       PRESERVE THESE STYLES IN THE HEAD
    //   ------------------------------------- */
    //   @media all {
    //     .ExternalClass {
    //       width: 100%;
    //     }
    //     .ExternalClass,
    //     .ExternalClass p,
    //     .ExternalClass span,
    //     .ExternalClass font,
    //     .ExternalClass td,
    //     .ExternalClass div {
    //       line-height: 100%;
    //     }
    //     .apple-link a {
    //       color: inherit !important;
    //       font-family: inherit !important;
    //       font-size: inherit !important;
    //       font-weight: inherit !important;
    //       line-height: inherit !important;
    //       text-decoration: none !important;
    //     }
    //     .btn-primary table td:hover {
    //       background-color: #EE6227 !important;
    //     }
    //     .btn-primary a:hover {
    //       background-color: #EE6227 !important;
    //       border-color: #EE6227 !important;
    //     }
    //   }
    //       </style>
    //     </head>
    //     <body class="">
    //       <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
    //         <tr>
    //           <td>&nbsp;</td>
    //           <td class="container">
    //             <div class="header">
    //               <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    //                 <tr>
    //                   <td class="align-center" width="100%">
    //                     <a href="https://ablestate.co"><img src="https://ablestate.co/wp-content/uploads/2022/12/Logo-with-2023-Slogan.png" height="40" alt="Ablestate"></a>
    //                   </td>
    //                 </tr>
    //               </table>
    //             </div>
    //             <div class="content">

    //               <!-- START CENTERED WHITE CONTAINER -->
    //               <span class="preheader">You have a new message from Ablestate talent.</span>
    //               <table role="presentation" class="main">

    //                 <!-- START MAIN CONTENT AREA -->
    //                 <tr>
    //                   <td class="wrapper">
    //                     <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    //                       <tr>
    //                         <td>
    //                           <h1 style="">You have a new message from Ablestate talent</h1>
    //                          <p>Hey ${receiver_name},<br>Your just recieved a new message from your account at Ablestate talent. you can login to respond to it.</p>
    //                           <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
    //                             <tbody>
    //                               <tr>
    //                                 <td align="center">
    //                                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    //                                     <tbody>
    //                                       <tr>
    //                                         <td> <a href="https://app.ablestate.co" target="_blank">View Message</a> </td>
    //                                       </tr>
    //                                     </tbody>
    //                                   </table>
    //                                 </td>
    //                               </tr>
    //                             </tbody>
    //                           </table>
    //                         </td>
    //                       </tr>
    //                     </table>
    //                   </td>
    //                 </tr>

    //               <!-- END MAIN CONTENT AREA -->
    //               </table>

    //               <!-- START FOOTER -->
    //               <div class="footer">
    //                 <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    //                   <tr>
    //                     <td class="content-block">
    //                       <span class="apple-link">This email was intended for ${receiver_name} from Ablestate Talent</span>
    //                       <br><a href="https://ablestate.co">unsubscribe</a>.
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td class="content-block powered-by">
    //                       Powered by <a href="https://ablestate.co">Ablestate Talent</a>.
    //                     </td>
    //                   </tr>
    //                 </table>
    //               </div>
    //               <!-- END FOOTER -->

    //             <!-- END CENTERED WHITE CONTAINER -->
    //             </div>
    //           </td>
    //           <td>&nbsp;</td>
    //         </tr>
    //       </table>
    //     </body>
    //   </html>`,
    //   track_clicks: true,
    //   track_opens: true,
    // });

    socket.to(data.receiver_id).emit("receive_message", data);
  });

  socket.on("send_typing_status", (data) => {
    socket.to(data.receiver_id).emit("receive_typing_status", data);
  });

  socket.on("logout", (data) => {
    const index = users.indexOf(data);
    if (index > -1) users.splice(index, 1);
    io.of("/").in(data).local.disconnectSockets();
    socket.broadcast.emit("user_disconnected", users);
    console.log(`${data} is now offline`);
    console.log("current online users: ", users);
  });
});

server.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
