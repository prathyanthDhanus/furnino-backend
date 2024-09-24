const jwt = require("jsonwebtoken");

module.exports = {
  //=============== token verification for user ===============

  tokenVerifyUser: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthrized 🚫" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.USERSECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token ❌" });
      }
      req.user = decoded;
      next();
    });
  },

  //=============== token verification for admin ===============

  tokenVerifyAdmin: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthrized 🚫" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ADMINSECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token ❌" });
      }
      req.admin = decoded;
     
      next();
    });
  },

  //=============== token verification for delivery agent ===============
  tokenVerifyDeliveryAgent: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthrized 🚫" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.DELIVERY_AGENTSECRET_KEY , async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token ❌" });
      }
      req.delivery_agent = decoded;
     
      next();
    });
  },
  
};
