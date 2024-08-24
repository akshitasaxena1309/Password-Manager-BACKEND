const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user registration area

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exist",
      });
    }
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );

    res.status(200).json({
      msg: user,
      token,
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User can not be registered",
    });
  }
};
// user login area

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const user = await bcrypt.compare(password, existingUser.password);
    console.log(existingUser.email);
    const token = jwt.sign(
      {
        userId: existingUser._id.toString(),
        email: existingUser.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );
    if (user) {
      res.status(200).json({
        msg: "login sucessful",
        token,
        userId: existingUser._id.toString(),
      });
    } else {
      return res.status(401).json({
        message: "invalid email & password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// website add function

exports.addSite = async (req, res) => {
  const { site, username, password } = req.body;

  if (!site || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = req.user;
    user.site.push({ site, username, password });
    await user.save();

    res.status(200).json({ message: "Site password added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    const { siteId } = req.params;
    if (!siteId) {
      return res.status(400).json({ message: "Site ID is required." });
    }
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const initialLength = user.site.length;
    user.site = user.site.filter((site) => site._id.toString() !== siteId);
    if (user.site.length === initialLength) {
      return res.status(404).json({ message: "Site password not found." });
    }
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Site password deleted successfully." });
  } catch (error) {
    console.error("Error deleting site password:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.updateSite = async (req, res) => {
  const { siteId } = req.params;
  const userId = req.user._id;
  const { site, username, password } = req.body;
  // console.log(siteId);
  try {
    if (!siteId) {
      console.log("site Id not");
      return res.status(400).json({ message: "Site ID is required." });
    }

    const updatedSite = await User.findOneAndUpdate(
      { _id: userId, "site._id": siteId },
      {
        $set: {
          "site.$.site": site,
          "site.$.username": username,
          "site.$.password": password,
        },
      },
      { new: true }
    );

    if (!updatedSite) {
      console.log("site nit");
      return res.status(404).json({ message: "Site entry not found." });
    }

    res
      .status(200)
      .json({ message: "Site entry updated successfully", user: updatedSite });
  } catch (error) {
    console.error("Error updating site password:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// password Info

exports.passwordDetails = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(error);
  }
};
