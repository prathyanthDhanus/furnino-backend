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
  userPaymentService: async (totalAmount) => {
    // Validate totalAmount
    if (isNaN(totalAmount) || totalAmount <= 0) {
      throw new Error("Invalid total amount");
    }
  
    let metadata = "Thank you for purchasing from Furnino, see you soon";
  
    // Customer email (required for identifying the customer)
    const customerEmail = "johndoe@example.com"; // Replace with the actual customer's email
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Sample Product',
              description: 'Furnino',
              images: ['https://static.vecteezy.com/system/resources/previews/026/721/193/original/washing-machine-and-laundry-laundry-sticker-png.png'],
            },
            unit_amount: totalAmount * 100, // Convert amount to the smallest currency unit (paise for INR)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png',
      cancel_url: 'https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q',
      metadata: {
        script: metadata,
      },
      customer_email: customerEmail, // Add customer email for Stripe to identify the customer
  
      // Collect shipping address at checkout
      shipping_address_collection: {
        allowed_countries: ['IN'], // Specify allowed countries for shipping
      },
    });
  
    return session.url;
  }
  
  
}  