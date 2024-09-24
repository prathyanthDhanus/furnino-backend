const {
  userRegisterDb,
  userDefaultLoginDb,
  loginWithGoogleDb,
  loginWithOtpDb,
  loginWithVerifyOtpDb
} = require("../user/services/db");

const {userTokenService} = require("./services/common");

module.exports = {
  //===================== user register =======================

  userRegister: async (req, res) => {
    const { userName, phoneNumber, password } = req.body;
    const findUser = await userRegisterDb(userName, phoneNumber, password);
    return res.status(200).json({
      status: "success",
      message: "User registered successfully",
      data: findUser,
    });
  },

  //====================== user default login ========================

  userDefaultLogin: async (req, res) => {
    const { phoneNumber, password } = req.body;
    const findUser = await userDefaultLoginDb(phoneNumber, password);
    return res.status(200).json({
      status: "success",
      message: "User Logged In successfully",
      data: findUser,
    });
  },

  //====================== login with google ========================

  loginWithGoogle: async (req, res) => {
    const { email } = req?.body;
    const findUser = await loginWithGoogleDb(email);
    return res.status(200).json({
      status: "success",
      message: "User Logged In successfully",
      data: findUser,
    });
  },

  //====================== login with otp (sent otp) ========================

  loginWithSendOtp: async (req, res) => {
    const { email, phoneNumber } = req.body;
    const findUser = await loginWithOtpDb(email, phoneNumber);
    return res.status(200).json({
      status: "success",
      message: "User verified successfully",
      data: findUser,
    });
  },

  //====================== login with otp (verify otp) ========================

  loginWithVerifyOtp: async (req, res) => {
    const {userId, otp } = req.body;
    const verifyOtp = await loginWithVerifyOtpDb(userId,otp);
    const generateToken = await userTokenService(verifyOtp);
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: generateToken,
    });
  },
};
