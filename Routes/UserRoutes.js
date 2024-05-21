const express = require("express");
const router = express.Router();
const {
  Login,
  Register,
  deleteUserById,
  getAllUsers,
  getUserById,
  showAllUserInfo,
  updateUserById,
  getTotalRegistrations,
  updateUserByIdProfile,
} = require("../controllers/user");
const ApiRateLimiter = require("../middleware/attempts");
const VerifyToken = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/auth");
const User = require("../models/UserModel");

// Register a new user
router.post("/register", ApiRateLimiter, Register);

// Log in a user
router.post("/login", ApiRateLimiter, Login);

// Get user profile (assuming Profile is defined in UserCtrl)
//router.get("/profile", VerifyToken, UserCtrl.Profile);
router.get("/admin/dashboard", isAdmin, (req, res) => {
  // This route is accessible only to users with the 'admin' role
  res.json({ message: "Welcome to the admin dashboard!" });
});

// Log out a user
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/users/info", showAllUserInfo);
router.put("/users/:id", isAdmin, updateUserById);
router.delete("/users/:id", isAdmin, deleteUserById);
router.get("/registrations/count", isAdmin, getTotalRegistrations);
router.put("/userss/:id", updateUserByIdProfile);
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.q; // Get the search term from the query parameter
    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    // Use a regular expression to perform a case-insensitive search on username and email
    const users = await User.find({
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { role: { $regex: searchTerm, $options: "i" } },
        { subscriptionType: { $regex: searchTerm, $options: "i" } },
      ],
    });

    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// API endpoint to get user role
router.get("/getUserRole", isAdmin, (req, res) => {
  const { role } = req.user;
  res.json({ role });
});
router.get("/isAdmin", isAdmin, (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Permission denied. Admin access required" });
  } else {
    res.json({ message: "You are an admin!" });
  }
});

module.exports = router;
