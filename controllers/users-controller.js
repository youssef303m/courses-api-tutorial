const express = require("express");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user-model");
const httpStatus = require("../utils/httpStatus");

const getAllUsers = asyncWrapper(async (req, res) => {
  // Pagination using query parameters
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  // Get all users from DB using User model
  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);
  return res.json({ status: httpStatus.SUCCESS, data: { users } });
});

const register = () => {};

const login = () => {};

module.exports = {
  getAllUsers,
  register,
  login,
};
