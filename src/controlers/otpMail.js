"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendNewMail(receiver, otp) {
  const info = await transporter.sendMail({
    from: 'arifpirxada',
    to: receiver,
    subject: "Otp Verification ✔ Verbula Chat",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">https://verbula-chat.onrender.com/</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Verbula Chat. Use the following OTP to complete your Sign Up.</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Verbula Chat</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Arif Pirxada</p>
      </div>
    </div>
  </div>`,
  });

  // console.log("Message sent: %s", info.messageId);
}

module.exports = sendNewMail;