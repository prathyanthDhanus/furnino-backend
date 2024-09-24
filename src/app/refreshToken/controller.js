const jwt = require("jsonwebtoken");
const userRefreshTokenModel = require("../refreshToken/model/userRefreshToken");

module.exports = {

  //=========================== user refresh token ==============================

  userRefreshToken: async (req, res) => {
    const authHeader = req?.headers?.authorization;
    if (!authHeader) {
      return res.status(422).json({ error: "Access Token Not Found ❌" });
    }

    const token = authHeader?.split(" ")[1];
    const user = jwt.decode(token); //decoding the userid from the token
    const existingRefreshToken = await userRefreshTokenModel.findOne({
      userId: user?.userId,
    });
    // console.log("refersh",existingRefreshToken)

    if (existingRefreshToken) {
      jwt.verify(
        existingRefreshToken?.token,
        process.env.USERSECRET_KEY,
        async (err, decoded) => {
          if (err) {
            return res.status(422).json({ error: "Invalid refresh token ❌" });
          } else {
            const secret = process.env.USERSECRET_KEY;

            const refreshToken = jwt.sign(
              {
                userId: user?.userId,
                role: "user",
                date: Date.now(),
              },
              secret,
              {
                expiresIn: "7d",
              }
            );

            await userRefreshTokenModel.findByIdAndUpdate(
              existingRefreshToken?._id,
              { token: refreshToken }
            );

            const token = jwt.sign(
              {
                userId: user?.userId,
                role: "user",
              },
              secret,
              {
                expiresIn: "1h",
              }
            );

            return res.status(200).json({
              status: "success",
              message: "Successfully logged in",
              data: token,
            });
          }
        }
      );
    } else {
      return res.status(422).json({ error: "Refresh Token Not Available ❌" });
    }
  },
};
