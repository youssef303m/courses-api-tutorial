const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const httpStatus = require("../utils/httpStatus");

const getAllUsers = asyncWrapper(async (req, res) => {
  // Pagination using query parameters
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  // Get all users from DB using User model
  const users = await User.find({}, { password: false, __v: false })
    .limit(limit)
    .skip(skip);
  return res.json({ status: httpStatus.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ status: httpStatus.FAIL, message: "User already exists" });
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: httpStatus.FAIL,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: httpStatus.FAIL,
      message: "This email address is not registered",
    });
  }

  const isPasswordMatching = await bcrypt.compare(password, user.password);

  if (user && isPasswordMatching) {
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      data: { user },
    });
  }
  return res
    .status(400)
    .json({ status: httpStatus.ERROR, message: "Something went wrong" });
});

module.exports = {
  getAllUsers,
  register,
  login,
};
