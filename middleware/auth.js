const jwt = require("jsonwebtoken");

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = decoded;

    if (role !== "admin") {
      return res
        .status(403)
        .json({ error: "Permission denied. Admin access required" });
    } else {
      req.user = decoded;
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { isAdmin };
