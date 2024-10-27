const {
  userRegisterDb,
  userDefaultLoginDb,
  loginWithGoogleDb,
  loginWithOtpDb,
  loginWithVerifyOtpDb,
  userProfileDb,
  updateProfileDb,
  addressDeleteDb,
  fetchUserProfileDb,
  forgotPasswordVerifyUserDb,
  createNewUserPasswordDb,
} = require("../user/services/db");

const { userTokenService, userPaymentService } = require("./services/common");

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
    console.log(req?.body);
    console.log(email);
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

    if (!email && !phoneNumber) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a valid email or phone number.",
      });
    }
    const generateOtp = await loginWithOtpDb(email, phoneNumber);
    return res.status(200).json({
      status: "success",
      message: generateOtp?.otpMessage,
      data: generateOtp,
    });
  },

  //====================== login with otp (verify otp) ========================

  loginWithVerifyOtp: async (req, res) => {
    const { email, phoneNumber, otp } = req.body;
    const verifyOtp = await loginWithVerifyOtpDb(email, phoneNumber, otp);
    const generateToken = await userTokenService(verifyOtp);
    return res.status(200).json({
      status: "success",
      message: "OTP verified successfully",
      data: generateToken,
    });
  },

  //====================== user profile address creation ========================

  userProfile: async (req, res) => {
    const userId = req.user.userId;
    const {
      name,
      houseName,
      street,
      landMark,
      city,
      district,
      state,
      pincode,
      addressType,
    } = req.body;

    const saveProfile = await userProfileDb(
      name,
      houseName,
      street,
      landMark,
      city,
      district,
      state,
      pincode,
      addressType,
      userId
    );
    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: saveProfile,
    });
  },

  //====================== user profile address updation ========================

  updateProfile: async (req, res) => {
    const addressId = req.params.addressId;
    const userId = req.user.userId;
    const {
      name,
      houseName,
      street,
      landMark,
      city,
      district,
      state,
      pincode,
      addressType,
    } = req.body;

    const updateAddress = await updateProfileDb(
      name,
      houseName,
      street,
      landMark,
      city,
      district,
      state,
      pincode,
      addressType,
      addressId,
      userId
    );
    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updateAddress,
    });
  },

  //====================== user profile address delete ========================

  addressDelete: async (req, res) => {
    const addressId = req.params.addressId;
    const userId = req.user.userId;

    const deleteAddressProfile = await addressDeleteDb(addressId, userId);
    return res.status(200).json({
      status: "success",
      message: "Address deleted successfully",
      data: deleteAddressProfile,
    });
  },

  //====================== fetch user profile  details ========================

  fetchUserProfile: async (req, res) => {
    const userId = req?.user?.userId;
    const findUserProfile = await fetchUserProfileDb(userId);

    return res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      data: findUserProfile,
    });
  },

  //====================== user payment details ========================

  userPayment: async (req, res) => {
    const { totalAmount } = req.body;
    const payment = await userPaymentService(totalAmount);
    return res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      data: payment,
    });
  },

  //====================== forgot password (mobile verify) ========================

  forgotPasswordVerifyUser: async (req, res) => {
    const { phoneNumber } = req.body;
    console.log(phoneNumber)
    if (!phoneNumber) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a valid phone number.",
      });
    }
    const findUser = await forgotPasswordVerifyUserDb(phoneNumber);
    const generateOtp = await loginWithOtpDb(null, findUser?.phoneNumber);
    return res.status(200).json({
      status: "success",
      message: generateOtp?.otpMessage,
      data: generateOtp,
    });
  },

  //====================== forgot password (otp verify) ========================

  forgotPasswordOTPVerify: async (req, res) => {
    const { phoneNumber, otp } = req.body;
    const verifyOTp = await loginWithVerifyOtpDb(null, phoneNumber, otp);
    return res.status(200).json({
      status: "success",
      message: "OTP authenticated successfully",
      data: verifyOTp,
    });
  },

  //====================== create new password ========================

  createNewUserPassword: async (req, res) => {
    const { newPassword, phoneNumber } = req.body;
    const findUser = await forgotPasswordVerifyUserDb(phoneNumber);
    const updatePassword = await createNewUserPasswordDb(
      findUser?._id,
      newPassword
    );

    return res.status(200).json({
      status: "success",
      message: "New password created successfully.Please login",
      data: updatePassword,
    });
  },
};
