const jwt = require("jsonwebtoken");
const userRefreshTokenModel = require("../../refreshToken/model/userRefreshToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

  //====================== user payment details ========================
  userPaymentService: async (totalAmount, findUser,addressId) => {
    // Validate totalAmount
    if (isNaN(totalAmount) || totalAmount <= 0) {
      throw new Error("Invalid total amount");
    }
  
    let metadata = "Thank you for purchasing from Furnino, see you soon";
  
    const selectedAddress = findUser?.address?.find(addr => addr?._id.toString() === addressId);
  
    if (!selectedAddress) {
      throw new Error("Selected address not found");
    }
  
    // Format the address as a string to pass in metadata
    const addressString = `
      ${selectedAddress.name},
      ${selectedAddress.houseName},
      ${selectedAddress.street},
      ${selectedAddress.landMark},
      ${selectedAddress.city}, ${selectedAddress.district},
      ${selectedAddress.state}, ${selectedAddress.pincode}`;
  
    const customerEmail = findUser.email || "johndoe@gmail.com"; // Use the user's email from the database
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Sample Product',
              description: `Furnino - Shipping to: ${addressString}`, // Include address in description for context
              images: ['https://res.cloudinary.com/due7btgno/image/upload/v1730277573/s7yskoy8pgwi59qcp64l.jpg'],
            },
            unit_amount: totalAmount * 100, // Convert to smallest currency unit (paise for INR)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png',
      cancel_url: 'https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q',
      metadata: {
        message: metadata,
        customerAddress: addressString,
      },
      customer_email: customerEmail, 
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
    });
  
    return session.url;
  }
  
}  