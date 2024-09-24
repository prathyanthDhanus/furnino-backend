const jwt = require("jsonwebtoken");
const userRefreshTokenModel = require("../../refreshToken/model/userRefreshToken");

module.exports = {
  userTokenService: async (userId) => {
    const secret = process.env.USERSECRET_KEY;
    const token = jwt.sign(
      {
        userId: userId,
        role: "user",
      },
      secret,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        userId: userId,
        role: "user",
        date: Date.now(),
      },
      secret,
      { expiresIn: "7d" }
    );

    if (token && refreshToken) {
      const existingRefreshToken = await userRefreshTokenModel.findOne({
        userId: userId,
      });

      if (existingRefreshToken) {
        await userRefreshTokenModel.findByIdAndUpdate(
          existingRefreshToken?._id,
          {
            token: refreshToken,
          }
        );
        return token;
      } else {
        const createRefreshToken = new userRefreshTokenModel({
          token: refreshToken,
          userId: userId,
        });
        createRefreshToken.save();
        return token;
      }
    } else {
      throw new Error("Login failed");
    }
  },
};
