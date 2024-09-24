const userModel = require("../../user/model/userSchema");
const AppError = require("../../../utils/appError");
const bcrypt = require("bcrypt");
const { userTokenService } = require("./common");
const { sendOtpAndSave } = require("../../otp/otpController");
const otpModel = require("../../otp/model/otpSchema");

module.exports = {
  //===================== user register ===================

  userRegisterDb: async (userName, phoneNumber, password) => {
    const findUser = await userModel.findOne({ phoneNumber: phoneNumber });
    if (findUser) {
      throw new AppError(
        "Field validation error:User already exist",
        "User already exist",
        409
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new userModel({
      userName: userName,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });
    await createUser.save();
    return createUser;
  },

  //======================= user default login =========================

  userDefaultLoginDb: async (phoneNumber, password) => {
    const findUser = await userModel.findOne({ phoneNumber: phoneNumber });
    const userId = findUser?._id;
    if (findUser) {
      const comparePassword = await bcrypt.compare(
        password,
        findUser?.password
      );
      if (comparePassword) {
        const token = await userTokenService(userId);
        return token;
      } else {
        throw new AppError(
          "Field validation error:Wrong password",
          "Wrong Password",
          401
        );
      }
    } else {
      throw new AppError(
        "Field validation error: User not found",
        "Wrong phone number",
        404
      );
    }
  },

  //===================== user login with google =========================

  loginWithGoogleDb: async (email) => {
    let token;
    let userId;
    const findUser = await userModel.findOne({ email: email });
    if (findUser) {
      userId = findUser._id;
      token = await userTokenService(userId);
      return token;
    } else {
      const createUser = new userModel({
        email: email,
      });
      await createUser.save();
      userId = createUser?._id;
      token = await userTokenService(userId);
      return token;
    }
  },

  //===================== user login with otp =========================

  loginWithOtpDb: async (email, phoneNumber) => {
    let findUser;
    if (email) {
      findUser = await userModel.findOne({ email: email });
    } else {
      findUser = await userModel.findOne({ phoneNumber: phoneNumber });
    }
    if (findUser) {
      const sendOtp = await sendOtpAndSave(
        findUser?.email,
        findUser?.phoneNumber,
        findUser?._id,
        findUser?.userName
      );
      return sendOtp;
    } else {
      throw new AppError(
        "Field validation error: User not found",
        "Wrong credentials",
        404
      );
    }
  },

  //====================== login with otp (verify otp) ========================

  loginWithVerifyOtpDb: async (userId, otp) => {
    const findOtp = await otpModel
      .findOne({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(1);

    if (findOtp) {
      const verifyOTp = await bcrypt.compare(otp, findOtp?.otp);
      if (verifyOTp) {
        return findOtp._id;
      } else {
        throw new AppError(
          "Field validation error: OTP not found",
          "Wrong OTP",
          404
        );
      }
    } else {
      throw new AppError(
        "Field validation error: Wrong OTP",
        "OTP not found",
        404
      );
    }
  },
};
