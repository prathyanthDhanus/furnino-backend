const userModel = require("../../user/model/userSchema");
const AppError = require("../../../utils/appError");
const bcrypt = require("bcrypt");
const { userTokenService } = require("./common");
const { sendOtpAndSave } = require("../../otp/otpController");
const otpModel = require("../../otp/model/otpSchema");
const cartModel = require("../../cart/model/cartSchema");
const orderModel = require("../../order/model/orderSchema");

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
          "Wrong Password",
          "Field validation error:Wrong password",
          401
        );
      }
    } else {
      throw new AppError(
        "Wrong phone number.User not found",
        "Field validation error: User not found",
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
    const generateOtp = await sendOtpAndSave(email, phoneNumber);
    if (!generateOtp) {
      throw new AppError(
        "Something went wrong",
        "Field validation error: Something went wrong",
        400
      );
    }
    return generateOtp;
  },

  //====================== login with otp (verify otp) ========================

  loginWithVerifyOtpDb: async (email, phoneNumber, otp) => {
    const userId = email || phoneNumber;
    const findOtp = await otpModel
      .findOne({ userId })
      .sort({ createdAt: -1 })
      .limit(1);

    if (findOtp) {
      const verifyOTp = await bcrypt.compare(otp, findOtp?.otp);
      if (verifyOTp) {
        return findOtp._id;
      } else {
        throw new AppError(
          "Wrong OTP",
          "Field validation error: OTP not found",
          400
        );
      }
    } else {
      throw new AppError(
        "OTP not found",
        "Field validation error: Wrong OTP",
        404
      );
    }
  },

  //====================== user profile address creation ========================

  userProfileDb: async (
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
  ) => {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          address: {
            name,
            houseName,
            street,
            landMark,
            city,
            district,
            state,
            pincode,
            addressType,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      throw new AppError(
        "User not found",
        "Field validation error: User not found",
        404
      );
    }

    return updatedUser;
  },

  //====================== user profile address updation ========================

  updateProfileDb: async (
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
  ) => {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId, "address._id": addressId },
      {
        $set: {
          "address.$": {
            _id: addressId,
            name,
            houseName,
            street,
            landMark,
            city,
            district,
            state,
            pincode,
            addressType,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      throw new AppError(
        "Address not found",
        "Field validation error: Address not found",
        404
      );
    }

    return updatedUser;
  },

  //====================== user profile address delete ========================

  addressDeleteDb: async (addressId, userId) => {
    const findUser = await userModel.findOne({
      _id: userId,
      "address._id": addressId,
    });

    if (!findUser) {
      throw new AppError(
        "Address not found",
        "Field validation error: Address not found",
        404
      );
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          address: { _id: addressId },
        },
      },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      throw new AppError(
        "Address not found",
        "Field validation error: Address not found",
        404
      );
    }

    return updatedUser;
  },

  //====================== user profile address delete ========================

  fetchUserProfileDb: async (userId) => {
    const findUser = userModel.find({ _id: userId });
    if (!findUser) {
      throw new AppError(
        "user profile not found",
        "Field validation error: user profile not found",
        404
      );
    }
    return findUser;
  },

  //====================== forgot password (mobile/email verify) ========================

  forgotPasswordVerifyUserDb: async (phoneNumber) => {
    const findUser = await userModel.findOne({ phoneNumber: phoneNumber });
    // console.log(findUser);
    if (!findUser) {
      throw new AppError(
        "user profile not found",
        "Field validation error: user profile not found",
        404
      );
    }

    return findUser;
  },

  //====================== create new password ========================

  createNewUserPasswordDb: async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updtatePawword = await userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updtatePawword) {
      throw new AppError(
        "Password not updated",
        "Field validation error: Password not updated",
        400
      );
    }
    return updtatePawword;
  },

  //====================== create new order ========================

  createOrderDb: async (
    userId,
    totalAmount,
    findUser,
    addressId,
    productId,
    selectedCapacity,
    quantity
  ) => {
    const cartItems = await cartModel.find({ userId });
    const selectedAddress = findUser.address.find(
      (addr) => addr._id.toString() === addressId
    );
  console.log(quantity)
    let orderProducts;

    if (cartItems?.length > 0) {
      // Prepare order data from cart items
      orderProducts = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        selectedCapacity: item.selectedCapacity,
      }));

      // Remove cart items after successful order creation
      await cartModel.deleteMany({ userId });
    } else {
      // If no cart items, use the provided single product details
      orderProducts = [
        {
          productId,
          quantity: quantity,
          selectedCapacity,
        },
      ];
    }

    // Create the order with either cart items or a single product
    const newOrder = new orderModel({
      userId,
      products: orderProducts,
      totalAmount,
      paymentStatus: "Completed", // Assuming successful payment
      orderStatus: "Ordered",
      shippingDetails: selectedAddress,
    });

    await newOrder.save(); // Save the order to the database

    return newOrder;
  },
};
