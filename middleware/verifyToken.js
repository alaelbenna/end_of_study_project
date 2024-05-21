const User = require("../models/UserModel"); // Import the User model

const VerifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorizeddd" });
    }
    const user = await User.findByToken(token);
    if (!user) {
      return res.status(401).json({ message: "Unauthorizedddd" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = VerifyToken;
