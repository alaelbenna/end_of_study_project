const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"], // Define possible roles
      default: "user",
    },
    registrationCount: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username must be less than 30 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [128, "Password must be less than 128 characters long"],
      validate: {
        validator: function (value) {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
          return regex.test(value);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number",
      },
    },
    loginCount: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [50, "First name must be less than 50 characters long"],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "Last name must be less than 50 characters long"],
    },
    subscriptionDate: {
      type: Date,
      default: Date.now,
    },
    subscriptionType: {
      type: String,
      enum: ["Free", "Basic", "Premium"], // Adjust as needed
      default: "Free",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.incrementLoginCount = function () {
  this.loginCount += 1;
  return this.save();
};

UserSchema.methods.generateAuthToken = function (additionalData) {
  const token = jwt.sign(
    { _id: this._id, ...additionalData },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

UserSchema.statics.findByToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return this.findOne({ _id: decoded._id });
  } catch (err) {
    throw new Error(`Error verifying token: ${err.message}`);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
