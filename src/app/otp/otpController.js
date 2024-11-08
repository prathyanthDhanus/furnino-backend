const otpModel = require("./model/otpSchema");
const { sendEmail } = require("../../utils/nodeMailer");
const { sendSms } = require("../../utils/twilio");
const bcrypt = require("bcrypt");

module.exports = {
  sendOtpAndSave: async (email, phoneNumber) => {
    //Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 9000).toString();
    let otpSent = false;
    let otpMessage;
    let userId = email || phoneNumber;

    if (email) {
      otpSent = await sendEmail(email, otpCode);

      otpMessage = "A verification code has been sent to your email address";
    } else if (phoneNumber) {
      otpSent = await sendSms(phoneNumber, otpCode);
      otpMessage = "A verification code has been sent to your phoneNumber";
    }

    if (otpSent) {
      const hashOtp = await bcrypt.hash(otpCode, 10);
      const otp = new otpModel({
        userId,
        otp: hashOtp,
        expireAt: new Date(),
      });

      //save otp
      await otp.save();
      return { otpMessage, userId, otpCode };
    } else {
      throw new error("failed to send verification code ");
    }
  },
};
