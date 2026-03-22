const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  REDIRECT_URI,
  EMAIL
} = process.env;
console.log("CLIENT_ID:", CLIENT_ID);
console.log("REFRESH_TOKEN:", REFRESH_TOKEN);
console.log("REDIRECT_URI:", REDIRECT_URI);

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// 🔥 Set refresh token
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});



// ================= HASH PASSWORD =================
const hashPassword = async (plaintextPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Hash Error:", error);
    throw error;
  }
};


// ================= GENERATE OTP =================
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};


// ================= SEND OTP =================
const sendOTP = async ({ email, otp }) => {
  try {

    console.log("Access Token:");
   
    const accessTokenResponse = await oAuth2Client.getAccessToken();
const accessToken = accessTokenResponse?.token;


    console.log("Access Token:", accessToken);

    // 🔥 Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    // 🔥 Mail content
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Verification Code",
      html: `<h3>Your OTP is: <span style="color:#db2777;font-weight:bold;">${otp}</span></h3>`
    };

    // 🔥 Send mail
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    return true;

  } catch (err) {
    console.log(err);
    console.error("OTP Error:", err.message);
    return false;
  }
};

module.exports = { hashPassword, generateOTP, sendOTP };