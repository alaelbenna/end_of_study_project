const User = require("../models/UserModel"); // Import the User model

exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // Username not found
      return res.status(401).json({ message: "Invalid user" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      // Incorrect password
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create a token with additional user details
    const accessToken = user.generateAuthToken({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionType: user.subscriptionType,
      subscriptionDate: user.subscriptionDate,
      role: user.role,
      // Add other user details as needed
    });

    // Increments the login count for the user
    await user.incrementLoginCount();

    // Respond with tokens and user details
    res.json({
      accessToken: accessToken,
      refreshToken: "your-refresh-token", // Generate or obtain a refresh token as needed
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscriptionType: user.subscriptionType,
        subscriptionDate: user.subscriptionDate,
        role: user.role,

        // Add other user details as needed
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.Register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = new User({
      username,
      email,
      password,
      role,
    });
    // Increment the registration count
    newUser.registrationCount += 1;
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.showAllUserInfo = async (req, res) => {
  try {
    const users = await User.find();
    const sanitizedUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionDate: user.subscriptionDate,
      subscriptionType: user.subscriptionType,
      loginCount: user.loginCount,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    res.json(sanitizedUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  let user;

  try {
    // Check if the new username is unique
    if ("username" in updates) {
      const existingUser = await User.findOne({
        username: updates.username,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }

    // Check if the new email is unique
    if ("email" in updates) {
      const existingEmailUser = await User.findOne({
        email: updates.email,
        _id: { $ne: userId },
      });
      if (existingEmailUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    // Update additional fields
    const allowedUpdates = [
      "username",
      "email",
      "firstName",
      "lastName",
      "subscriptionType",
    ];
    const updateFields = {};
    allowedUpdates.forEach((field) => {
      if (field in updates) {
        // Skip uniqueness check if the current value is the same as the new value
        if (user && user[field] === updates[field]) {
          return;
        }
        updateFields[field] = updates[field];
      }
    });

    // Update only if there are fields to update
    if (Object.keys(updateFields).length > 0) {
      user = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getTotalRegistrations = async (req, res) => {
  try {
    const totalRegistrations = await User.aggregate([
      { $group: { _id: null, count: { $sum: "$registrationCount" } } },
    ]);

    res.json({ totalRegistrations: totalRegistrations[0].count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateUserByIdProfile = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
